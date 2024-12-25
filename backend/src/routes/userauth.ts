import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import zod from 'zod';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;
if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    process.exit(1);
}
if (!BASE_URL) {
    console.error("BASE_URL is not defined");
    process.exit(1);
}
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//functions
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
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
    const {name,email,password,confirmPassword} = req.body;
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
    const mailOptions ={
        from:'"Verify your email" abc@gmail.com',
        to:email,
        subject: "NIT Srinagar-Verify your email",
        html: `<h1>${name}! welcome to the alumini network of NIT Srinagar</h1>
        <h4>Click on the link below to verify your email</h4>
        <a href="${BASE_URL}/user/verifyemail?token=${token}&email=${email}">Verify Email</a>`
    }
    transport.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: "+info.response);
        }
    })
    return;
});
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
    const token = jwt.sign({userId: existingUser.id}, JWT_SECRET);

    if(!existingUser.emailVerified){
        const mailOptions ={
            from:'"Verify your email" abc@gmail.com',
            to:existingUser.email,
            subject: "NIT Srinagar-Verify your email",
            html: `<h1>${existingUser.name}! welcome to the alumini network of NIT Srinagar</h1>
            <h4>Click on the link below to verify your email</h4>
            <a href="${BASE_URL}/user/verifyemail?token=${token}&email=${existingUser.email}">Verify Email</a>`
        }
        transport.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Email sent: "+info.response);
            }
        })
        return res.status(400).json({error:"Email not verified"});
    }
    const hashedPassword = existingUser.password;
    const password = req.body.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordMatch){
        return res.status(400).json({error: "Wrong password"});
    }
    res.json({
        message: "Signin successful",
        token: token
    });
    return;
});

//otpverify for signup
router.post("/verifyemail", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.query.token;
    const email = req.query.email;
    if(!token || !email){
        return res.status(400).json({error: "Invalid request"});
    }
    try{
        const decoded = jwt.verify(token as string, JWT_SECRET);
        if(decoded){
            const user = await prisma.user.findFirst({
                where: {
                    email: email as string,
                },    
            })
            if(!user){
                return res.status(500).json({error: "Email not found"});
            }
            if((decoded as jwt.JwtPayload).userId !== user.id){
                return res.status(400).json({error: "Invalid token"});
            }
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: true,
                }
            });
            res.json({
                message: "Email verified successfully"
            })
            return;
        }
    }catch(err){
        return res.status(400).json({error: "Invalid token"});
    }
    return;
});
//update info route

export default router;