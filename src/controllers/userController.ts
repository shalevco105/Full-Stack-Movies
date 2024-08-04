import { Request, Response } from "express";
import * as userService from '../services/userService';
import { UserModel } from "../models/userModel";
import { HTTP_STATUS } from "../constants/httpContants";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { generateToken } from "../jwtAuth/jwtUtil";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies: UserModel[] = await userService.getAllMovies();
    res.status(HTTP_STATUS.OK).json(movies);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR +
        " An error occurred while getting the movies"
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: `User with externalId ${id} not found` });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const userToAdd: UserModel = req.body;
  try {
    const newUser = await userService.createUser(userToAdd);
    if (newUser) {
      const token = generateToken(newUser._id.toString());
      res.json({ username: newUser.username, token });
    } else {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to add user - email is uniqe field, check it" });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR +
        " An error occurred while adding the user"
    });
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
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while updating the user" });
  }
}

export const deletedUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  try {
    const deletedUser = await userService.deleteUser(userId);
    if (deletedUser) {
      res.json({ message: "User successfully deleted: ", deletedUser });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while deleting the user" });
  }
}