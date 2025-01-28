import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
import { sendMail } from "../middleware/sendMail";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/authMiddleware";
const prisma = new PrismaClient();

//all,verified, not verified, rejected, not rejected
router.post("/users",authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const {
    searchByBatchs = [],
    searchByDepartments = [],
    searchByCourses = [],
  } = req.body;
  const { name, page, allUser, accountVerified, isRejected } = req.query;
  //searchByDepartments, searchByCourses are arrays
  //perpage 100 users
  const filter: any = {};
  if (!allUser && accountVerified === "true") {
    filter.accountVerified = true;
  } else if (!allUser && accountVerified === "false") {
    filter.accountVerified = false;
  }
  if (isRejected === "true") {
    filter.rejected = true;
  } else if (isRejected === "false") {
    filter.rejected = false;
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
    skip: 100 * (parseInt(page as string) - 1),
    take: 100,
  });
  res.status(200).json({ users });
  return;
});

//verify a user
router.post(
  "/verify-user",
  authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: " Inputs are required" });
      return;
    }
    const user = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        accountVerified: true,
      },
    });
    req.body.subject = "NIT Srinagar-Your Profile is Verifed now";
    (req.body.email = user.email),
      (req.body.html = `<h1>${user.name}! You can login now</h1>
            <h4>Click on the link below to Login</h4>
            <a href="${FRONTEND_URL}/signin">LogIn now</a>`);
    req.body.message = "Email has been verified";
    req.body.status = 200;
    next();
    return;
  },
  sendMail
);

//rejected and un verify a user
router.post("/reject",authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }
  await prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      accountVerified: false,
      isRejected: true,
    },
  });
  const user = await prisma.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      accountVerified: false,
    },
  });
  res.status(200).json({ user, message: "User rejected" });
  return;
});

export default router;
