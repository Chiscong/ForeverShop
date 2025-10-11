import React, { useContext } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
  const { navigate } = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* left section */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className=' font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                  <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/collection')}>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                  </div>
                  <button 
                    onClick={() => navigate('/collection')} 
                    className='bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors'
                  >
                    SEARCH PRODUCTS
                  </button>
                </div>
            </div>
        </div>
        {/* right section */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero