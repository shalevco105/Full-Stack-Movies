import { Router } from "express";
import * as userController from '../controllers/userController';
import { authenticateToken } from "../jwtAuth/authMiddeware";

const userRouter = Router();

userRouter.use(authenticateToken);

userRouter.get('/data', userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deletedUser);

export default userRouter;
