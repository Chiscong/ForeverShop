import React from 'react'
import Title from '../../components/Title'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800">
      {/* Tiêu đề */}
      <div className="text-center text-2xl pt-10 border-t border-gray-200">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Card liên hệ */}
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl transform transition duration-500 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        <h2 className="text-xl font-semibold mb-6 text-center">📬 Thông tin liên hệ</h2>

        <div className="space-y-5 text-sm">
          {/* Email */}
          <div className="flex items-center gap-3">
            <span className="font-medium w-28">📧 Email:</span>
            <a
              href="mailto:pchicong.work@gmail.com"
              className="text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              pchicong.work@gmail.com
            </a>
          </div>

          {/* Số điện thoại */}
          <div className="flex items-center gap-3">
            <span className="font-medium w-28">📞 SĐT:</span>
            <a
              href="tel:+84337296592"
              className="text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              +84 337 296 592
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-3">
            <span className="font-medium w-28">LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/congpc2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              Chí Công 
            </a>
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-3">
            <span className="font-medium w-28"> GitHub:</span>
            <a
              href="https://github.com/Chiscong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline hover:text-blue-800 transition"
            >
              Chiscong
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact