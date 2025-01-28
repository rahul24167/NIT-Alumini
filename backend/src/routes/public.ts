import express,{Request, Response} from 'express'
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.post("/users", async (req: Request, res: Response ):Promise<any>=> {
    const {searchByBatchs=[], searchByDepartments=[], searchByCourses=[]} = req.body;
    const {name,page} = req.query;
    //searchByDepartments, searchByCourses are arrays
    //perpage 100 users
    
    const filter: any = {
        accountVerified: true,
    };
    if(req.query.name){
        filter.name = {
            contains: name as string,
            mode: 'insensitive'
        }
    }
    if(searchByBatchs.length > 0) {
        filter.batch = {
            in: searchByBatchs,
        };
    }
    if(searchByDepartments.length > 0) {
        filter.department = {
            in: searchByDepartments,
        };
    }
    if(searchByCourses.length > 0) {
        filter.course = {
            in: searchByCourses,
        };
    }
    const users = await prisma.user.findMany({
        where: filter,
        skip: 100*(parseInt(page as string)-1),
        take: 100,
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            name: true,
            course: true,
            department: true,
            batch: true,
        } 
    });
    res.status(200).json({ users });
    return;
});




export default router;