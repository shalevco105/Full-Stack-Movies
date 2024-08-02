import { Router, Request, Response } from "express";
import User from "../schemas/userSchema";
import { generateToken } from "../jwtAuth/jwtUtil";
import { HTTP_STATUS } from "../constants/httpContants";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import * as userController from '../controllers/userController';

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.USER_NOT_FOUND + " - Invalid email" });
    }

    if (!user.comparePassword(password)) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: ERROR_MESSAGES.INVALID_PASSWORD + " - Invalid password" });
    }

    const token = generateToken(user._id.toString());
    console.log("Generated Token:", token);
    res.json({ token });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

authRouter.get("/register", userController.createUser);

export default authRouter;
