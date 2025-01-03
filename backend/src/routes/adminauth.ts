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

//signin
const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(100),
})
router.post("/signin", async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Invalid request body" });
    }
    const existingAdmin = await prisma.admin.findFirst({
        where: {
            email: req.body.email,
        }
    })
    if (!existingAdmin) {
        return res.status(400).json({ error: "Invalid email or password" });
    }
    const hashedPassword = existingAdmin.password;
    const password = req.body.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
        return res.status(400).json({ error: "Wrong password" });
    }
    const token = jwt.sign({ adminId: existingAdmin.id }, JWT_SECRET);
    res.cookie("token", token);
    res.send("Logged in!");
    return;
});

//create a new admin route
//update info

export default router;