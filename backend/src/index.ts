import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();//.env should load before the children routes
import rootRouter from './routes/index';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter);

app.listen(3000, () => console.log(`Server running on port 3000`));