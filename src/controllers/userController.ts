import { Request, Response } from "express";
import * as userService from '../services/userService';
import { UserModel } from "../models/userModel";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies: UserModel[] = await userService.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while getting the movies" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ error: `User with externalId ${id} not found` });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const userToAdd: UserModel = req.body;
  try {
    const newUser = await userService.createUser(userToAdd);
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
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const userToUpdate: UserModel = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, userToUpdate);
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
}

export const deletedUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  try {
    const deletedUser = await userService.deleteUser(userId);
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
}