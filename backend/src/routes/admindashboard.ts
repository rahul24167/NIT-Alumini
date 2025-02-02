import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
import { sendMail } from "../middleware/sendMail";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/authMiddleware";
import { parse } from "path";
const prisma = new PrismaClient();

//all,verified, not verified, rejected, not rejected
router.post("/users",authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const {
    searchByBatchs = [],
    searchByDepartments = [],
    searchByCourses = [],
  } = req.body;
  const name = req.query.name;
  const page = parseInt(req.query.page as string);
  const allUser = req.query.allUser==="true";
  const accountVerified = req.query.accountVerified==="true";
  const isRejected = req.query.isRejected==="true";
  console.log(typeof allUser,typeof accountVerified,typeof isRejected);
  //searchByDepartments, searchByCourses are arrays
  //perpage 100 users
  const filter: any = {};
  if (!allUser && accountVerified) {
    filter.accountVerified = true;
  } else if (!allUser && !accountVerified) {
    filter.accountVerified = false;
  }
  if (isRejected) {
    filter.isRejected = true;
  } else if (!isRejected) {
    filter.isRejected = false;
  }
  if (req.query.name) {
    filter.name = {
      contains: name as string,
      mode: "insensitive",
    };
  }
  if (searchByBatchs.length > 0) {
    filter.batch = {
      in: searchByBatchs,
    };
  }
  if (searchByDepartments.length > 0) {
    filter.department = {
      in: searchByDepartments,
    };
  }
  if (searchByCourses.length > 0) {
    filter.course = {
      in: searchByCourses,
    };
  }
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc", // Sort by createdAt descending
    },
    where: filter,
    skip: 100 * (page - 1),
    take: 100,
    select: {
      id: true,          
      name: true,  
      email: true,      
      photo: true,
      course: true,
      department: true,
      batch: true,
      enroll: true, 
      phone: true,
      linkdn: true,
      twitter: true,
      facebook: true,
      instagram: true,
      emailVerified: true,
      accountVerified: true,
      isRejected: true,
      phoneVarified: true,     
      createdAt: true, 
    },
  });
  res.status(200).json({ users });
  console.log(users);
  return;
});

//verify a user or unverify a user
router.get(
  "/verify-user",
  authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { userId, verify } = req.query;
    let verificaton = true;

    if (!userId) {
      res.status(400).json({ error: " Inputs are required" });
      return;
    }
    if(verify === "false"){
      verificaton = false;
    }
    const user = await prisma.user.update({
      where: {
        id: parseInt(userId as string),
      },
      data: {
        accountVerified: verificaton,
      },
    });
    if(verify === "false"){
      req.body.subject = "NIT Srinagar-Your Profile is Unverified by the admin";
      (req.body.html = `<h1>${user.name}! You will not be able to login to your account </h1>`);
      req.body.message = "Account has been verified";
    }
    req.body.subject = "NIT Srinagar-Your Profile is Verifed now";
    (req.body.email = user.email),
      (req.body.html = `<h1>${user.name}! You can login now</h1>
            <h4>Click on the link below to Login</h4>
            <a href="${FRONTEND_URL}/signin">LogIn now</a>`);
    req.body.message = "Account has been verified";
    req.body.status = 200;
    next();
    return;
  },
  sendMail
);

//rejected and un verify a user
router.get("/reject",authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.query;
  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }
  await prisma.user.update({
    where: {
      id: parseInt(userId as string),
    },
    data: {
      accountVerified: false,
      isRejected: true,
    },
  });
  const user = await prisma.user.update({
    where: {
      id: parseInt(userId as string),
    },
    data: {
      accountVerified: false,
    },
  });
  res.status(200).json({ user, message: "User rejected" });
  return;
});

export default router;
