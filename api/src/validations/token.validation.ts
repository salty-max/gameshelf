import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded:any = jwt.verify(token, process.env.TOKEN_SECRET || "");
    if (decoded) {
      req.user = decoded.user;
      next();
    }
  } catch(err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
}