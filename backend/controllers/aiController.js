import productModel from "../models/productModel.js"; // Import model sản phẩm
import { GoogleGenerativeAI } from "@google/generative-ai";

const chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body;

     
        const products = await productModel.find({});
        const productInfo = products.map(p => 
            `- ${p.name}: Giá ${p.price}$, Loại ${p.category}, Mô tả: ${p.description}`
        ).join('\n');

        
        const shopPolicy = `
        Chính sách của Forever Shop:
        - Đổi trả: Chính sách đổi trả dễ dàng, không rắc rối.
        - Trả hàng: Cho phép trả hàng miễn phí trong vòng 7 ngày.
        - Hỗ trợ: Dịch vụ khách hàng 24/7.
        `;

        // 3. Khởi tạo Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        
        const prompt = `
        Bạn là trợ lý ảo chuyên nghiệp của "Forever Shop". 
        Dưới đây là dữ liệu sản phẩm hiện có trong kho:
        ${productInfo}

        Dưới đây là chính sách của cửa hàng:
        ${shopPolicy}

        Dựa trên thông tin trên, hãy trả lời câu hỏi của khách hàng một cách tự nhiên và chính xác nhất. 
        Nếu khách hỏi về sản phẩm không có trong danh sách, hãy khéo léo giới thiệu các sản phẩm tương tự.
        Hãy trả lời một cách ngắn gọn nhất không sử dụng markdown và hữu ích.
        Hãy ghi nhớ rằng tôi là chủ shop , tôi tên là Phùng Chí Công học tại trường Đại học kinh doanh và Công nghệ Hà Nội (HUBT). Nếu có người hỏi tôi là ai thì trả lời vậy
        Câu hỏi của khách: ${message}
        `;

        const result = await model.generateContent(prompt);
        res.json({ success: true, reply: result.response.text() });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "AI đang gặp sự cố!" });
    }
};

export { chatWithGemini };