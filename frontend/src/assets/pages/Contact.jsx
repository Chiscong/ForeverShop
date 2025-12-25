import React from "react";
import Title from "../../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      {/* Tiêu đề trang đồng bộ với trang About */}
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Layout Flexbox: Ảnh và Thông tin */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Hình ảnh minh họa contact - Sử dụng asset của shop */}
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-sm"
          src={assets.avatarContact}
          alt="Contact Forever Shop"
        />

        {/* Khối thông tin liên hệ */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Information</p>

          <div className="text-gray-500 flex flex-col gap-3">
            <p>
              <span className="font-medium text-gray-700">📧 Email:</span>{" "}
              <a
                href="mailto:pchicong.work@gmail.com"
                className="hover:text-black transition-colors"
              >
                pchicong.work@gmail.com
              </a>
            </p>

            <p>
              <span className="font-medium text-gray-700">📞 Phone:</span>{" "}
              <a
                href="tel:+84337296592"
                className="hover:text-black transition-colors"
              >
                +84 337 296 592
              </a>
            </p>
          </div>

          <p className="font-semibold text-xl text-gray-600">Social Network</p>

          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/in/congpc2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-all flex items-center gap-2"
            >
              LinkedIn:{" "}
              <span className="underline text-blue-600">Phùng Chí Công</span>
            </a>

            <a
              href="https://github.com/Chiscong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-all flex items-center gap-2"
            >
              GitHub: <span className="underline text-gray-800">Chiscong</span>
            </a>
          </div>

          {/* Nút bấm theo style của shop */}
          <a href="https://www.facebook.com/chi.cong.555555" target="_blank">
            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 mt-4">
              Send Message
            </button>
          </a>
        </div>
      </div>

      {/* NewsletterBox để đồng bộ với Footer của các trang khác */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
