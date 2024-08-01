import fetchDbHandler from "../handlers/fetchDbHandler";
import Movie, { MMovie } from "../models/movieModel";

class MongoMovieService {
  static async getAllMovies(): Promise<MMovie[] | null> {
    return fetchDbHandler(async () => {
      return await Movie.find();
    });
  }

  static async getMovieById(id: string): Promise<MMovie | null> {
    return fetchDbHandler(async () => {
      return await Movie.findById(id);
    });
  }

  static async addMovie(MovieData: MMovie): Promise<MMovie | null> {
    try {
      const newMovie = new Movie(MovieData);
      return await newMovie.save();
    } catch (error) {
      console.error("Error adding Movie:", error);
      return null;
    }
  }

  static async updateMovie(
    id: string,
    MovieData: MMovie
  ): Promise<MMovie | null> {
    try {
      console.log(id);
      console.log(MovieData);
      const updatedMovie = await Movie.findByIdAndUpdate(id, MovieData, {
        new: true,
      });
      return updatedMovie;
    } catch (error) {
      console.error("Error updating Movie:", error);
      return null;
    }
  }

  static async deleteMovie(id: string): Promise<MMovie | null> {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(id);
      return deletedMovie;
    } catch (error) {
      console.error("Error deleting Movie:", error);
      return null;
    }
  }
}

export default MongoMovieService;
