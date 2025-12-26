import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify'

const ResetPassword = () => {

    const { token } = useParams(); 
    const navigate = useNavigate();
    const { backendUrl } = useContext(ShopContext);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        
        if (newPassword !== confirmPassword) {
            return toast.error("Mật khẩu xác nhận không khớp!");
        }

        try {
            const response = await axios.post(backendUrl + '/api/user/reset-password', { token, newPassword });
            
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login'); 
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Liên kết đã hết hạn hoặc không hợp lệ.");
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>Reset Password</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            <p className='text-gray-600 text-sm text-center mb-4'>
                Please enter a new password for your account.
            </p>

            {/* Ô nhập mật khẩu mới */}
            <input 
                onChange={(e) => setNewPassword(e.target.value)} 
                value={newPassword} 
                type="password" 
                className='w-full px-3 py-2 border border-gray-800 outline-none focus:ring-1 focus:ring-black' 
                placeholder='New password' 
                required 
            />

            {/* Ô xác nhận mật khẩu */}
            <input 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                value={confirmPassword} 
                type="password" 
                className='w-full px-3 py-2 border border-gray-800 outline-none focus:ring-1 focus:ring-black' 
                placeholder='Confirm new password' 
                required 
            />

            <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 active:bg-gray-700 transition-colors'>
                Confirm password
            </button>

        </form>
    )
}

export default ResetPassword