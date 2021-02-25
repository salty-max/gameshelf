import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(400).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || "");
    req.user = verified;
  } catch(err) {
    return res.status(400).json({ message: "Token is not valid" });
  }
}