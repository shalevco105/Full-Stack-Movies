import { Router, Request, Response } from "express";
import UserService from "../services/userService";

const userRouter = Router();

userRouter.get("/all", async (req: Request, res: Response) => {
  res.json((await UserService.getAllUsers()) || "Users not found");
});

export default userRouter;
