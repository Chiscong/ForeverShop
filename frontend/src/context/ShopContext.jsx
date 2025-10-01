import { toast } from 'react-toastify';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        // Check if user is logged in
        if (!token) {
            toast.error("Please login to add items to cart");
            navigate('/login');
            return;
        }

        if (!size) {
            toast.error("Please select size");
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartItems[itemId]) {
            if (cartItems[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        
        setCartItems(cartData);
        
        try {
            await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            toast.success("Added to cart successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            // Revert cart changes if API call fails
            setCartItems(cartItems);
        }
    }
    const getCartCount = () => {
        let count = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                try {
                    if (cartItems[items][size] > 0) {
                        count += cartItems[items][size];
                    }

                }
                catch (error) {
                    toast.error(error);
                }
            }
        }
        return count;
    }
    const updateQuantity = async (itemId, size, quantity) => {
        // Check if user is logged in
        if (!token) {
            toast.error("Please login to update cart");
            navigate('/login');
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        
        try {
            await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            // Revert cart changes if API call fails
            setCartItems(cartItems);
        }
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const size in cartItems[items]) {
                try {
                    if (cartItems[items][size] > 0) {
                        totalAmount += cartItems[items][size] * itemInfo.price;
                    }
                }
                catch (error) {
                    toast.error(error);
                }
            }
        }
        return totalAmount;
    }
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }
    const getUserCart = async (token) => {
        try {
            const response = await axios.get(backendUrl + '/api/cart/get', { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);
    
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
    }, [getUserCart, token]);

    // Khôi phục cart từ localStorage nếu user quay lại từ Stripe
    useEffect(() => {
        const tempCart = localStorage.getItem('tempCart');
        if (tempCart && Object.keys(cartItems).length === 0) {
            try {
                const parsedCart = JSON.parse(tempCart);
                setCartItems(parsedCart);
                localStorage.removeItem('tempCart'); // Xóa sau khi khôi phục
            } catch (error) {
                console.log('Error restoring cart:', error);
                localStorage.removeItem('tempCart');
            }
        }
    }, [cartItems]);
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount, updateQuantity,
        getCartAmount,
        navigate, backendUrl, setToken, token,
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;