import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//there is some error in the code fix it
// users?name=rahul&page1
router.post(
  "/users",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const {
      userId,
      searchByBatchs = [],
      searchByDepartments = [],
      searchByCourses = [],
    } = req.body;
    const { name, page } = req.query;
    //searchByDepartments, searchByCourses are arrays
    //perpage 100 users
    if (!userId) {
      res.status(403).json({ error: "User not found" });
      return;
    }
    const filter: any = {
      NOT: {
        id: userId,
      },
      accountVerified: true,
    };
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
        createdAt: "desc",
      },
      where: filter,
      skip: 100 * (parseInt(page as string) - 1),
      take: 100,
      select: {
        id: true,          
        name: true,        
        photo: true,
        course: true,
        department: true,
        batch: true,
        enroll: true,      
        createdAt: true, 
      }
    });
    res.status(200).json({ users });
    return;
  }
);
// when you update isRejected turns to false untill admin verify the changes you made.
router.post(
  "/update",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    const {
      userId,
      name,
      email,
      department,
      course,
      batch,
      accountVerified,
      rejected,
    } = req.body;
  }
);

export default router;
