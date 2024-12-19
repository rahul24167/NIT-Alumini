import express,{Request, Response} from 'express';
const router = express.Router();

//header will have all the data for the various filter
router.post("/users", async (req: Request, res: Response ):Promise<any>=> {
    return;
});

//to be verifed
router.post("/users/notverified", async (req: Request, res: Response):Promise<any> =>{
    return;
});
//verify a user
router.post("", async (req: Request, res: Response):Promise<any> =>{
    return;
});

//rejected
router.post("users/rejected", async (req: Request, res: Response):Promise<any> =>{
    return;
});
//change verification status
router.post("users/update", async (req: Request, res: Response):Promise<any> =>{
    return;
});

export default router;