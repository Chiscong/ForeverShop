import { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets/frontend_assets/assets'; // Import assets

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{ text: "Chào bạn! Tôi là trợ lý Forever Shop. Tôi có thể giúp gì cho bạn?", isBot: true }]);
    const { backendUrl } = useContext(ShopContext);
    const scrollRef = useRef(null);

    // Tự động cuộn xuống khi có tin nhắn mới
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            const response = await axios.post(`${backendUrl}/api/ai/chat`, { message: input });
            if (response.data.success) {
                setMessages(prev => [...prev, { text: response.data.reply, isBot: true }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { text: "Rất tiếc, tôi đang gặp lỗi kết nối.", isBot: true }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Nút bấm hình ảnh - Sử dụng support_img */}
            {!isOpen && (
                <div 
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer hover:scale-110 transition-all duration-300"
                >
                    <img src={assets.AvartarAI} alt="AI Assistant" className="w-16 h-16 drop-shadow-lg" />
                    <div className="absolute -top-2 -right-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                        AI
                    </div>
                </div>
            )}

            {/* Box Chat */}
            {isOpen && (
                <div className="w-80 h-[450px] bg-white border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    {/* Header với nút X ở góc phải */}
                    <div className="bg-black text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <img src={assets.AvartarAI}  className="w-6 h-6 invert" alt="" />
                            <span className="font-medium text-sm">Trợ lý Forever Shop</span>
                        </div>
                        <img 
                            onClick={() => setIsOpen(false)}
                            src={assets.cross_icon} 
                            className="w-3 cursor-pointer hover:rotate-90 transition-all invert" 
                            alt="Close" 
                        />
                    </div>
                    
                    {/* Nội dung tin nhắn */}
                    <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                                    msg.isBot 
                                    ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
                                    : 'bg-black text-white rounded-tr-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ô nhập liệu */}
                    <div className="p-4 bg-white border-t flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Hỏi tôi bất cứ điều gì..."
                            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-black transition-all"
                        />
                        <button 
                            onClick={handleSend} 
                            className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 rotate-45">
                                <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.93.93 0 00-1.39.91L3 12l-1 7.5a.93.93 0 001.4.9z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;