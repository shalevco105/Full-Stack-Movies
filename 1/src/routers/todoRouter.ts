import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import TodoService from '../services/todoService';

const todoRouter = Router();

todoRouter.get('/:name', async (req: Request, res: Response) => {
    const userName = req.params.name;
    const userToFind = await UserService.getUserByName(userName);

    if (userToFind) {
        const userTodos = await TodoService.getTasksByUserId(userToFind.id) 
        const dataToSend = { "name": userToFind.name, "email": userToFind.email, "tasks": userTodos }
        res.json(dataToSend);
    } else {
        res.json("User not found");
    }
});


export default todoRouter;
