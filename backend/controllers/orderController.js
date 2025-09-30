
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import { VNPay } from "vnpay";
// global varibles
const currency = 'usd'
const deliveryCharge = 10
// GATE WAY - Initialize Stripe safely
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
    console.warn('STRIPE_SECRET_KEY not found in environment variables');
}
const vnpay = new VNPay({
    tmnCode: process.env.VNP_TMNCODE,
    secureSecret: process.env.VNP_HASH_SECRET,
    vnpayHost: "https://sandbox.vnpayment.vn",
    testMode: true,
    hashAlgorithm: "SHA512",
});
// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: "Order Placed" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}
// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        // Check if Stripe is initialized
        if (!stripe) {
            return res.json({ success: false, message: "Stripe not configured. Please check STRIPE_SECRET_KEY environment variable." });
        }
        
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        const line_items = items.map((item) => (
            {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }
        )
        )
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Razorpay Method
const placeOrderRazor = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "VNPay",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        const usdToVndRate = 24500; // hoặc gọi API để lấy tỉ giá thực
        const amountVND = Math.round(amount * usdToVndRate);
        const paymentUrl = vnpay.buildPaymentUrl({
            vnp_Amount: amountVND , // VNPay yêu cầu nhân 100
            vnp_IpAddr: req.ip,
            vnp_TxnRef: newOrder._id.toString(),
            vnp_OrderInfo: `Thanh toan don hang ${newOrder._id}`,
            vnp_OrderType: "other",
            vnp_ReturnUrl: `${origin}/api/order/vnpay_return`,
        });

        res.json({ success: true, paymentUrl });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// ALL Orders data for Admin panel 
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// user Orders data for frontEnd
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Verify stripe payment
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// Verify Vnpay 
const verifyVnpay = async (req, res) => {
    try {
        const verified = vnpay.verifyReturnUrl(req.query);

        if (verified.isVerified && req.query.vnp_ResponseCode === "00") {
            const orderId = req.query.vnp_TxnRef;
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(req.body?.userId, { cartData: {} });

            // Sau khi thanh toán xong có thể redirect về FE
            return res.redirect(`/verify?success=true&orderId=${orderId}`);
        } else {
            return res.redirect(`/verify?success=false&orderId=${req.query.vnp_TxnRef}`);
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// Update order status from Admin
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { verifyStripe, placeOrder, verifyVnpay, placeOrderStripe, placeOrderRazor, allOrders, userOrders, updateStatus }