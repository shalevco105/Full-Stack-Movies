import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwtUtil";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const user = verifyToken(token);
    if (!user || typeof user !== "object" || !user.id) {
      return res.status(403).json({ error: "Invalid token" });
    }

    (req as any).user = user; 

    next();
  } catch (error) {
    res.status(403).json({ error: "Token verification failed" });
  }
};
