import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItems({})
                localStorage.removeItem('tempCart') // Xóa tempCart khi thanh toán thành công
                navigate('/orders')
            } else {
                // Không cần làm gì, cart sẽ được khôi phục tự động từ tempCart
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [token, verifyPayment])
    return (
        <div>

        </div>
    )
}

export default Verify