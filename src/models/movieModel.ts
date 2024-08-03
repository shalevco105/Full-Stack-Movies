import { Document, Types } from "mongoose";

export interface MovieModel extends Document {
  _id: Types.ObjectId;
  movie_name: string;
  movie_length: string;
  movie_picUrl: string;
  externalId?: number;
}

export default MovieModel;