import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import zod from 'zod';
//import {User} from '../db/db';
import * as jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

//signup
router.post("/signup", async (req: Request, res: Response ):Promise<any>=> {
    return;
});
//signin
router.post("/signin", async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    return;
});
//update info route

export default router;