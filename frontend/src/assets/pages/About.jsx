import React from 'react'
import Title from '../../components/Title'
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from '../../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
             <Title text1={"ABOUT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
             <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Forever Shop" />
             <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                <p>Forever Shop được ra đời từ niềm đam mê thời trang và mong muốn mang lại những bộ trang phục phong cách, chất lượng nhất cho khách hàng. Chúng tôi không ngừng tìm kiếm những xu hướng mới nhất để làm phong phú thêm bộ sưu tập của mình.</p>
                <p>Kể từ khi thành lập, chúng tôi luôn nỗ lực để cung cấp một nền tảng mua sắm trực tuyến tin cậy, nơi bạn có thể tìm thấy mọi thứ từ trang phục hàng ngày đến những bộ đồ dự tiệc sang trọng.</p>
                <b className='text-gray-800'>Our Mission</b>
                <p>Nhiệm vụ của chúng tôi là mang đến sự tự tin cho khách hàng thông qua những trang phục tinh tế, đồng thời xây dựng một cộng đồng thời trang bền vững và thân thiện.</p>
             </div>
      </div>

      <div className='text-4xl py-4'>
             <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurance:</b>
                <p className='text-gray-600'>Chúng tôi tỉ mỉ lựa chọn và kiểm tra từng sản phẩm để đảm bảo rằng chúng đáp ứng các tiêu chuẩn chất lượng khắt khe nhất trước khi đến tay bạn.</p>
            </div> 
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience:</b>
                <p className='text-gray-600'>Với giao diện thân thiện và quy trình đặt hàng nhanh chóng, chúng tôi mang đến trải nghiệm mua sắm trực tuyến dễ dàng và thuận tiện hơn bao giờ hết.</p>
            </div> 
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Service:</b>
                <p className='text-gray-600'>Đội ngũ hỗ trợ tận tâm của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn, đảm bảo sự hài lòng tuyệt đối trong suốt hành trình mua sắm.</p>
            </div> 
      </div> 

      <NewsletterBox/>
    </div>
  )
}

export default About