import mongoose, { Document, Schema, Types } from "mongoose";

export interface MongoUser extends Document {
  _id: Types.ObjectId;
  externalId: number;
  city: string;
  country: string;
  email: string;
  password: string;
}

const UserSchema: Schema<MongoUser> = new Schema({
  externalId: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<MongoUser>("User", UserSchema, "user");

export default User;
