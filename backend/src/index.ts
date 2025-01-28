import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();//.env should load before the children routes
import rootRouter from './routes/index';
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";

const app = express();
app.use(cookieParser());
app.use(express.json());
//cors is used to allow the frontend to access the backend if they are on different domains
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use("/api/v1", rootRouter);

app.listen(3000, () => console.log(`Server running on port 3000`));