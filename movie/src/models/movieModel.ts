import mongoose, { Document, Schema, Types } from "mongoose";

export interface MMovie extends Document {
  _id: Types.ObjectId;
  movie_name: string;
  movie_length: string;
  movie_picUrl: string;
  externalId: number;
}

const MovieSchema: Schema<MMovie> = new Schema({
  movie_name: { type: String, required: true },
  movie_length: { type: String, required: true },
  movie_picUrl: { type: String, required: true },
  externalId: { type: Number, required: true, unique: true },
});

const Movie = mongoose.model<MMovie>("Movie", MovieSchema, "movie");

export default Movie;
