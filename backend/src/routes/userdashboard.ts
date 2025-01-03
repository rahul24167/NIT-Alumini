import express,{Request, Response} from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//there is some error in the code fix it
// users?name=rahul&page1
router.post("/users",authMiddleware, async (req: Request, res: Response ):Promise<any>=> {
    const {userId, searchByBatchs=[], searchByDepartments=[], searchByCourses=[]} = req.body;
    const {name,page} = req.query;
    //searchByDepartments, searchByCourses are arrays
    //perpage 100 users
    if(!userId){
        res.status(403).json({error:"User not found"});
        return;
    }
    const filter: any = {
        NOT: {
            id: userId
        },
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
        take: 100
    });


    return;
});


export default router;