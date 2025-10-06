import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

const limiter = rateLimit({ windowMs: 60*1000, max: 200 });
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req,res) => res.send('Chat backend alive'));

export default app;
