import fetchDbHandler from "../handlers/fetchDbHandler";
import User, { MUser } from "../models/userModel";

class UserService {
  static async getAllUsers(): Promise<MUser[] | null> {
    return fetchDbHandler(async () => {
      return await User.find();
    });
  }

  static async getUserById(id: string): Promise<MUser | null> {
    return fetchDbHandler(async () => {
      return await User.findById(id);
    });
  }

  static async addUser(userData: MUser): Promise<MUser | null> {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      console.error("Error adding user:", error);
      return null;
    }
  }

  static async updateUser(
    id: string,
    userData: MUser
  ): Promise<MUser | null> {
    try {
      console.log(id);
      console.log(userData);
      const updatedUser = await User.findByIdAndUpdate(id, userData, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }

  static async deleteUser(id: string): Promise<MUser | null> {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      return null;
    }
  }
}

export default UserService;
