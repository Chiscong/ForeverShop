import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    // State lưu URL ảnh cũ từ database
    const [oldImages, setOldImages] = useState([])

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProductData = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/product/single', { productId: id });
            if (response.data.success) {
                const p = response.data.product;
                setName(p.name);
                setDescription(p.description);
                setPrice(p.price);
                setCategory(p.category);
                setSubCategory(p.subCategory);
                setBestseller(p.bestseller);
                setSizes(p.sizes);
                setOldImages(p.image); // Lưu lại mảng ảnh cũ
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + '/api/product/update', formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (loading) return <p className="text-center py-10">Đang tải dữ liệu sản phẩm...</p>;

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image (Chọn ảnh mới để thay thế)</p>
                <div className='flex gap-2'>
                    {/* Ô ảnh 1 */}
                    <label htmlFor="image1">
                        <img className='w-20 h-20 object-cover border rounded cursor-pointer' 
                             src={image1 ? URL.createObjectURL(image1) : (oldImages[0] || assets.upload_area)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    {/* Ô ảnh 2 */}
                    <label htmlFor="image2">
                        <img className='w-20 h-20 object-cover border rounded cursor-pointer' 
                             src={image2 ? URL.createObjectURL(image2) : (oldImages[1] || assets.upload_area)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    {/* Ô ảnh 3 */}
                    <label htmlFor="image3">
                        <img className='w-20 h-20 object-cover border rounded cursor-pointer' 
                             src={image3 ? URL.createObjectURL(image3) : (oldImages[2] || assets.upload_area)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    {/* Ô ảnh 4 */}
                    <label htmlFor="image4">
                        <img className='w-20 h-20 object-cover border rounded cursor-pointer' 
                             src={image4 ? URL.createObjectURL(image4) : (oldImages[3] || assets.upload_area)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub category</p>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' required />
                </div>
            </div>

            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                            <p className={`${sizes.includes(size) ? 'bg-pink-100 border-pink-500 border-2' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>

            <div className='flex gap-4 mt-4'>
                <button type='submit' className='w-32 py-3 bg-black text-white active:bg-gray-700'>Save</button>
                <button type='button' onClick={() => navigate('/list')} className='w-32 py-3 bg-gray-200 text-black active:bg-gray-300'>Cancel</button>
            </div>
        </form>
    )
}

export default Edit;