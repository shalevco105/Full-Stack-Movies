import { Document, Types } from "mongoose";

export interface MovieModel extends Document {
  _id: Types.ObjectId;
  name: string;
  length: string;
  imageUrl: string;
  price: number;
  externalId?: number;
}

export default MovieModel;