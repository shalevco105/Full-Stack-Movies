import fetchDbHandler from "../handlers/fetchDbHandler";
import { MovieModel } from "../models/movieModel";
import Movie from "../schemas/movieSchema";

export const getAllMovies = async (): Promise<MovieModel[]> => {
  return await fetchDbHandler<MovieModel[]>(async () => {
    return await Movie.find();
  }) || [];
};

export const getMovieById = async (id: string): Promise<MovieModel | null> => {
  return await fetchDbHandler<MovieModel | null>(async () => {
    return await Movie.findById(id);
  });
};

export const getMovieByExternalId = async (externalId: string): Promise<MovieModel | null> => {
  return await fetchDbHandler<MovieModel | null>(async () => {
    return await Movie.findOne({ externalId });
  });
};

export const createMovie = async (MovieData: MovieModel): Promise<MovieModel | null> => {
  try {
    const newMovie = new Movie(MovieData);
    return await newMovie.save();
  } catch (error) {
    console.error("Error adding Movie:", error);
    return null;
  }
}

export const updateMovie = async (
  id: string,
  MovieData: MovieModel
): Promise<MovieModel | null> => {
  try {
    return await Movie.findByIdAndUpdate(id, MovieData, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating Movie:", error);
    return null;
  }
}

export const deleteMovie = async (id: string): Promise<MovieModel | null> => {
  try {
    return await Movie.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting Movie:", error);
    return null;
  }
}

