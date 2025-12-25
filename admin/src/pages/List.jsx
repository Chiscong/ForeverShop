import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom' // Đảm bảo import useNavigate từ react-router-dom

const List = ({ token }) => {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list') // Lấy danh sách từ API
      const products = response.data?.products || []
      if (response.data.success) {
        setList(products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      if (!token) {
        toast.error('No auth token provided');
        return;
      }
      // Gọi API xóa sản phẩm
      const response = await axios.post(backendUrl + '/api/product/remove/', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList() // Load lại danh sách sau khi xóa thành công
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 font-bold text-lg'>All Products List</p>
      <div className='flex flex-col gap-2'>
        
        {/* --- PHẦN 1: TIÊU ĐỀ BẢNG (6 CỘT) --- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-bold'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Edit</b>
          <b className='text-center'>Remove</b>
        </div>

        {/* --- PHẦN 2: DANH SÁCH SẢN PHẨM --- */}
        {
          list.length === 0 ? (
            <p className='text-sm text-gray-500'>No products yet.</p>
          ) : (
            list.map((item) => (
    
              <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm hover:bg-gray-50 transition-all'>
                
                {/* 1. Ảnh */}
                <div className='w-12 h-12'>
                  <img className='w-full h-full object-cover rounded' src={item.image && item.image[0]} alt={item.name} />
                </div>

                {/* 2. Tên */}
                <div className='font-medium'>{item.name}</div>

                {/* 3. Danh mục */}
                <div>{item.category}</div>

                {/* 4. Giá */}
                <div>{currency}{item.price}</div>

                {/* 5. Nút Sửa (Điều hướng sang trang Edit với ID sản phẩm) */}
                <div className='text-center'>
                  <p 
                    onClick={() => navigate(`/edit/${item._id}`)} 
                    className='text-blue-600 hover:text-blue-800 cursor-pointer font-semibold underline'
                  >
                    Edit
                  </p>
                </div>

                {/* 6. Nút Xóa */}
                <div className='text-center'>
                  <p 
                    onClick={() => removeProduct(item._id)} 
                    className='text-red-500 hover:text-red-700 cursor-pointer text-xl font-bold'
                  >
                    ✕
                  </p>
                </div>

              </div>
            ))
          )
        }
      </div>
    </>
  )
}

export default List