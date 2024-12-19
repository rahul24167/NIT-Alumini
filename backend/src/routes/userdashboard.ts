import express,{Request, Response} from 'express';
const router = express.Router();

// header will have all the data for the various filter. and it return all those user which are vierifed by the 
// admin and passs the applied filter.
router.post("/users", async (req: Request, res: Response ):Promise<any>=> {
    return;
});


export default router;