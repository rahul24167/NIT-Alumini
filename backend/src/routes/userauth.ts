import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import zod from "zod";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.BASE_URL;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}
if (!FRONTEND_URL) {
  console.error("BASE_URL is not defined");
  process.exit(1);
}
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { sendMail } from "../middleware/sendMail";

//functions
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
//signup
export const signupBody = zod.object({
  name: zod.string().min(1).max(100),
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
  confirmPassword: zod.string().min(6).max(100),
});
//end email
router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    if (!user) {
      return res.status(500).json({ error: "Failed to create user" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    req.body.subject = "NIT Srinagar-Verify your email";
    req.body.email = email;
    req.body.html = `<h1>${name}! welcome to the alumini network of NIT Srinagar</h1>
  <h4>Click on the link below to verify your email</h4>
  <a href="${FRONTEND_URL}/verify-email-and-complete-profile?token=${token}&email=${email}">Verify Email and complete your profile </a>`;
    req.body.message = "email sent. check your spam folder ";
    next();
    return;
  },
  sendMail
);
//signin
const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
});
router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);
    const emailVerified = existingUser.emailVerified;

    if (!emailVerified) {
        req.body.subject="NIT Srinagar-Verify your email",
        req.body.email = existingUser.email,
        req.body.html= `<h1>${existingUser.name}! welcome to the alumini network of NIT Srinagar</h1>
            <h4>Click on the link below to verify your email</h4>
            <a href="${FRONTEND_URL}/verify-email-and-complete-profile?token=${token}&email=${existingUser.email}">Verify Email and complete your profile </a>`
        req.body.message= "Email not verified"
        next();
        return;
    }
    const hashedPassword = existingUser.password;
    const password = req.body.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }
    res.cookie("token", token);
    res.send("Logged in!");
    return;
  }, sendMail
);

router.get('/logout', async (req:Request, res:Response)=>{
    res.clearCookie("token");
    res.json({
        message:"Logged out"
    });
    return;
})

//verify the email to prevent email spoofing
// verifyemail-and-profile-complete?token=asdffccfg123&email=abc@gmail.com
const profileBody = zod.object({
  photo: zod.string().optional(),
  course: zod.string(),
  department: zod.string(),
  batch: zod.string(),
  enroll: zod.string().optional(),
  phone: zod.string().optional(),
  linkdn: zod.string().optional(),
  twitter: zod.string().optional(),
  facebook: zod.string().optional(),
  instagram: zod.string().optional(),
});
router.post(
  "/verify-email-and-complete-profile",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.query.token;
    const email = req.query.email;
    if (!token || !email) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const parsedBody = profileBody.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    //must have data arecourse, department, batch
    const dataToupdate: any = {
      emailVerified: true,
      course: parsedBody.data.course,
      department: parsedBody.data.department,
      batch: parsedBody.data.batch,
    };
    // optional data
    if (parsedBody.data.photo) {
      dataToupdate.photo = parsedBody.data.photo;
    }
    if (parsedBody.data.enroll) {
      dataToupdate.enroll = parsedBody.data.enroll;
    }
    if (parsedBody.data.phone) {
      dataToupdate.phone = parsedBody.data.phone;
    }

    if (parsedBody.data.linkdn) {
      dataToupdate.linkdn = parsedBody.data.linkdn;
    }
    if (parsedBody.data.twitter) {
      dataToupdate.twitter = parsedBody.data.twitter;
    }
    if (parsedBody.data.instagram) {
      dataToupdate.instagram = parsedBody.data.instagram;
    }
    try {
      const decoded = jwt.verify(token as string, JWT_SECRET);
      if (!decoded) {
        return res.status(400).json({ error: "Invalid token" });
      }

      const user = await prisma.user.findFirst({
        where: {
          email: email as string,
        },
      });
      if (!user) {
        return res.status(500).json({ error: "Email not found" });
      }
      if ((decoded as jwt.JwtPayload).userId !== user.id) {
        return res.status(400).json({ error: "Incorrect token" });
      }
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: dataToupdate,
      });
      res.json({
        message: "Email verified successfully",
      });
      return;
    } catch (err) {
      return res.status(400).json({ error: "Invalid token" });
    }
    return;
  }
);
//send mail
router.get(
  "/forget-password",
  async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email: email as string,
        emailVerified: true,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    req.body.subject = "NIT Srinagar Alumini-Change your Password",
    req.body.email = user.email,
    req.body.html = `<h1>${user.name}! welcome to the alumini network of NIT Srinagar</h1>
            <h4>Click on the link below to Change your password</h4>
            <a href="${FRONTEND_URL}/forgetpassword?token=${token}&email=${user.email}">Change Password </a>`,
    req.body.message = "Mail sent for Password Rest"
    next();
    return;
  }, sendMail
);
router.post("/reset-password", async (req: Request, res: Response):Promise<any> => {
    const { token, email } = req.query;
    const { newPassword, confirmNewPassword } = req.body;

    if (!token || !email) {
        return res.status(400).json({
            message: "Invalid query parameters. 'token' and 'email' are required.",
        });
    }

    if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({
            message: "Invalid body parameters. 'newPassword' and 'confirmNewPassword' are required.",
        });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
            message: "New Password and Confirm New Password do not match.",
        });
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email as string,
            emailVerified: true,
        },
    });
    if (!user || !user.emailVerified) {
        return res.status(404).json({
            message: "User not found or email not verified.",
        });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

        
        const updatedUser = await prisma.user.update({
            where: { email: email as string },
            data: { password: newHashedPassword },
        });
        if(!updatedUser){
            return res.status(500).json({
                message: "An error occurred while resetting the password. Please try again later.",
            });
        }
        return res.status(200).json({
            message: `Password changed successfully for ${updatedUser.email}.`,
        });
});
//update info route

export default router;
