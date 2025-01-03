import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1);
}
interface JwtPayloadWithUserId {
  userId: string;
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const { userId } = decoded as JwtPayloadWithUserId;
    if (userId) {
      req.body.userId = userId;
      next();
      return;
    } else {
      res.status(403).json({});
      return;
    }
  } catch (error) {
    res.status(403).json({});
    return;
  }
};
