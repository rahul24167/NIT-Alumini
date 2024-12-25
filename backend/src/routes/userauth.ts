import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import zod from 'zod';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    process.exit(1);
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//signup
export const signupBody = zod.object({
    name: zod.string().min(1).max(100),
    email: zod.string().email(),
    password: zod.string().min(6).max(100),
    confirmPassword: zod.string().min(6).max(100)
})
router.post("/signup", async (req: Request, res: Response ):Promise<any>=> {
    const {success}= signupBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({error: "Invalid request body"});
    };
    const existingUser = await prisma.user.findFirst({
        where: {
            email: req.body.email,
        }
    })
    if(existingUser){
        return res.status(400).json({error: "User already exists"});
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(password !== confirmPassword){
        return res.status(400).json({error: "Passwords do not match"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })
    if(!user){
        return res.status(500).json({error: "Failed to create user"});
    }
    const token = jwt.sign({userId: user.id}, JWT_SECRET);
    res.json({
        message:"Signup succssful",
        token: token
    });
    return;
});
//otpverify for signup
router.post("/otpverify", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return;
})
//signin
const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(100),
})
router.post("/signin", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({error: "Invalid request body"});
    }
    const existingUser = await prisma.user.findFirst({
        where: {
            email: req.body.email,
        }
    })
    if(!existingUser){
        return res.status(400).json({error: "Invalid email or password"});
    }
    const hashedPassword = existingUser.password;
    const password = req.body.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordMatch){
        return res.status(400).json({error: "Wrong password"});
    }
    const token = jwt.sign({userId: existingUser.id}, JWT_SECRET);
    res.json({
        message: "Signin successful",
        token: token
    });
    return;
});
//update info route

export default router;