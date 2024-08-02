import mongoose, { Schema } from "mongoose";
import MovieModel from "../models/movieModel";

const MovieSchema: Schema<MovieModel> = new Schema({
  movie_name: { type: String, required: true },
  movie_length: { type: String, required: true },
  movie_picUrl: { type: String, required: true },
  externalId: { type: Number, required: true, unique: true },
});

const Movie = mongoose.model<MovieModel>("Movie", MovieSchema, "movie");

export default Movie;