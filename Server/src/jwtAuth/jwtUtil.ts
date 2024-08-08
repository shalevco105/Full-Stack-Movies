import jwt from "jsonwebtoken";
import { appConfig } from "../utils/appConfig";

const JWT_SECRET_KEY = appConfig.JWT_SECRET_KEY || "JWT_SECRET_KEY";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
};
