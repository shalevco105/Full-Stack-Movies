import mongoose, { Document, Schema } from 'mongoose';

export interface MongoUser extends Document {
  externalId: number;
  city: string;
  country: string
}

const UserSchema: Schema<MongoUser> = new Schema({
  externalId: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const User = mongoose.model<MongoUser>('User', UserSchema, 'user');

export default User;