import { useState, useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const { backendUrl } = useContext(ShopContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // Hiển thị trạng thái đang xử lý để tăng trải nghiệm người dùng
            const response = await axios.post(backendUrl + '/api/user/forgot-password', { email });
            
            if (response.data.success) {
                toast.success(response.data.message);
                setEmail(''); // Xóa nội dung input sau khi gửi thành công
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        /* Container căn giữa tương tự trang Login */
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>Forgot Password</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            <p className='text-gray-600 text-sm text-center mb-4'>
                Enter your email address. We will send a link to reset a new password.
            </p>

            {/* Ô Input đồng nhất với style của website */}
            <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                className='w-full px-3 py-2 border border-gray-800 outline-none focus:ring-1 focus:ring-black transition-all' 
                placeholder='Enter your email !' 
                required 
            />

            {/* Nút bấm đồng bộ với phong cách Forever Shop */}
            <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 active:bg-gray-700 transition-colors'>
                Send Request
            </button>

            <div className='w-full flex justify-between text-sm mt-2'>
                <p onClick={() => window.history.back()} className='cursor-pointer hover:underline text-gray-600'>
                    Cancel
                </p>
            </div>
        </form>
    )
}

export default ForgotPassword