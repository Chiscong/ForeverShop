import axios from 'axios'
import { useEffect ,useState} from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'


const List = ({ token }) => {
   const [list, setList] = useState([])    
   const fetchList = async () => {
  try {
    const response = await axios.get(backendUrl + '/api/product/list')
    const products = response.data?.products || []
    if (products.length) setList(products)
    else toast.error(response.data?.message || 'No products found')
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
    const response = await axios.post(backendUrl + '/api/product/remove/', { id }, { headers: { Authorization: `Bearer ${token}` } })
        if (response.data.success) {
            toast.success(response.data.message)
            await fetchList()
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
     <p className='mb-2'>All Products List</p>
     <div className='flex flex-col gap-2'>
    {/* {List Table Titlte} */}
       <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
       </div>
       {/* {Product List} */}
       {
        list.length === 0 ? (
          <p className='text-sm text-gray-500'>No products yet.</p>
        ) : (
          list.map((item, index) => (
            <div key={item._id || index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
              <div className='w-12 h-12'>
                <img className='w-full h-full object-cover' src={item.image && item.image[0]} alt={item.name} />
              </div>
              <div>{item.name}</div>
              <div>{item.category}</div>
              <div>{currency}{item.price}</div>
              <div onClick={() => removeProduct(item._id)} className='md:text-center text-right cursor-pointer text-lg '>X</div>
            </div>
          ))
        )
       }
     </div>
    </>
  )
}

export default List
