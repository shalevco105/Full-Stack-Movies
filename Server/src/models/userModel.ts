import { Document, Types } from "mongoose";

export interface UserModel extends Document {
  _id: Types.ObjectId;
  username: string;
  fullname: string;
  age: number;
  email: string;
  password: string;
  comparePassword(password: string): boolean;
}

export default UserModel;
