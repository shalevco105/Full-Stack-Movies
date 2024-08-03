import mongoose, { Schema } from "mongoose";
import MovieModel from "../models/movieModel";

const MovieSchema: Schema<MovieModel> = new Schema({
  movie_name: { type: String, required: true },
  movie_length: { type: String, required: true },
  movie_picUrl: { type: String, required: true },
  externalId: { type: Number, required: false, unique: true },
});

MovieSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastMovie = await Movie.findOne({}, {}, { sort: { externalId: -1 } });
    this.externalId = (lastMovie && lastMovie.externalId) ? lastMovie.externalId + 1 : 1;
  }
  next();
});

const Movie = mongoose.model<MovieModel>("Movie", MovieSchema, "movie");

export default Movie;