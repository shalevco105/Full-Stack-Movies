import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

const userRouter = Router();

userRouter.get('/all', async (req: Request, res: Response) => {
    res.json(await UserService.getAllUsers() || "Users not found")
});

userRouter.get('/:name', async (req: Request, res: Response) => {
    const userName = req.params.name;
    let userToFind = await UserService.getUserByName(userName);
    UserService.saveUserToJson(userToFind);
    res.json(userToFind || "User not found");
});

export default userRouter;