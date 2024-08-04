import fetchDbHandler from "../handlers/fetchDbHandler";
import { UserModel } from "../models/userModel";
import User from "../schemas/userSchema";

export const getAllMovies = async (): Promise<UserModel[]> => {
  return await fetchDbHandler<UserModel[]>(async () => {
    return await User.find();
  }) || [];
};

export const getUserById = async (id: string): Promise<UserModel | null> => {
  return await fetchDbHandler<UserModel | null>(async () => {
    return await User.findById(id);
  });
};

export const createUser = async (userData: UserModel): Promise<UserModel | null> => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
}

export const updateUser = async (
  id: string,
  userData: UserModel
): Promise<UserModel | null> => {
  try {
    return await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

export const deleteUser = async (id: string): Promise<UserModel | null> => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
}

