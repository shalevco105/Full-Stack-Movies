import { Router, Request, Response } from "express";
import UserService from "../services/userService";
import { MUser } from "../models/userModel";
import { authenticateToken } from "../jwtAuth/authMiddeware";

const userRouter = Router();
userRouter.use(authenticateToken);

userRouter.get("/all", async (req: Request, res: Response) => {
  res.json((await UserService.getAllUsers()) || "Users not found");
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await UserService.getUserById(id);

    if (!user) {
      res.status(404).json({ error: `User with externalId ${id} not found` });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/add", async (req: Request, res: Response) => {
  const userToAdd: MUser = req.body;
  try {
    const newUser = await UserService.addUser(userToAdd);
    if (newUser) {
      res.status(201).json("User created: " + newUser);
    } else {
      res
        .status(500)
        .json({ error: "Failed to add user - email is uniqe field, check it" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the user" });
  }
});

userRouter.put("/update/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userToUpdate: MUser = req.body;

  try {
    const updatedUser = await UserService.updateUser(userId, userToUpdate);
    if (updatedUser) {
      res.json("User updated: " + updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
});

userRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const deletedUser = await UserService.deleteUser(userId);
    if (deletedUser) {
      res.json({ message: "User successfully deleted: ", deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

export default userRouter;
