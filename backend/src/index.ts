import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import rootRouter from './routes/index';
//import { connectToDatabase } from './db/db';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/api/v1", rootRouter);

//connectToDatabase().then(() => {
  app.listen(10000, () => console.log(`Server running on port 3000`));
//});