//function for add product 
import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];
    
    const images = [image1, image2, image3, image4].filter(item => item !== undefined && item !== null);
        let imagesUrl = [];
        if (images.length) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    // Convert buffer to base64 for Cloudinary upload
                    const b64 = Buffer.from(item.buffer).toString("base64");
                    const dataURI = "data:" + item.mimetype + ";base64," + b64;
                    let result = await cloudinary.uploader.upload(dataURI, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: 'Add product successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//function for list product 
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//function for remove product 
const removeProduct = async (req, res) => {
 try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Delete product successfully' })
 } catch (error) {
     console.log(error)
     res.json({ success: false, message: error.message })
 }
}
//function for single product info 
const singleProduct = async (req, res) => {
 try {
    const {productId} = req.body
    const product = await productModel.findById(productId);
    res.json({ success: true, product })
 } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
 }
}
// Function cập nhật thông tin sản phẩm
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // 1. Chuẩn bị dữ liệu cập nhật cơ bản
        const updateData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true',
            sizes: JSON.parse(sizes)
        };

        // 2. Xử lý hình ảnh (Nếu có ảnh mới được upload)
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const newImages = [image1, image2, image3, image4].filter(item => item !== undefined);

        if (newImages.length > 0) {
            const imagesUrl = await Promise.all(
                newImages.map(async (item) => {
                    const b64 = Buffer.from(item.buffer).toString("base64");
                    const dataURI = "data:" + item.mimetype + ";base64," + b64;
                    let result = await cloudinary.uploader.upload(dataURI, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
            updateData.image = imagesUrl; // Ghi đè mảng ảnh cũ bằng mảng ảnh mới
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.json({ success: false, message: "Không tìm thấy sản phẩm" });
        }

        res.json({ success: true, message: "Cập nhật sản phẩm thành công" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Thêm vào danh sách export
export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
