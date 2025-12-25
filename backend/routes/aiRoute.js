import express from 'express';
import { chatWithGemini } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/chat', chatWithGemini);

export default aiRouter;