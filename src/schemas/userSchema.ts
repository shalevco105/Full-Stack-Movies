import mongoose, { Schema } from "mongoose";
import { encrypt, decrypt } from "../jwtAuth/cryptoUtil"; // Adjust the path if necessary
import UserModel from "../models/userModel";

const UserSchema: Schema<UserModel> = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre<UserModel>("save", function (next) {
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

const User = mongoose.model<UserModel>("User", UserSchema, "user");

export default User;
