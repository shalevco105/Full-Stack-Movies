import mongoose, { Document, Schema, Types } from "mongoose";
import { encrypt, decrypt } from "../jwtAuth/cryptoUtil"; // Adjust the path if necessary
const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY";

export interface MUser extends Document {
  _id: Types.ObjectId;
  username: string;
  fullname: string;
  age: number;
  email: string;
  password: string;
  comparePassword(password: string): boolean;
}

const UserSchema: Schema<MUser> = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre<MUser>("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = encrypt(this.password);
  }
  next();
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string
): boolean {
  return decrypt(this.password) === candidatePassword;
};

const User = mongoose.model<MUser>("User", UserSchema, "user");

export default User;
