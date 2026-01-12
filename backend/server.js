import express from "express";
import cors from "cors";
import 'dotenv/config'
import compression from "compression";
import helmet from "helmet";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinay.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import aiRouter from "./routes/aiRoute.js";
//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter)
app.use('/api/ai', aiRouter);
//api endpoint
app.get('/', (req, res) => {
    res.send('API Working');
});

// connect to DB first, then start server
(async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to start server due to DB connection error');
        process.exit(1);
    }
})();