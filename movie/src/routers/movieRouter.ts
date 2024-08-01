import { Router, Request, Response } from "express";
import MovieService from "../services/movieService";
import { MMovie } from "../models/movieModel";
import { authenticateToken } from "../jwtAuth/authMiddeware";

const movieRouter = Router();
movieRouter.use(authenticateToken);

movieRouter.get("/all", async (req: Request, res: Response) => {
  res.json((await MovieService.getAllMovies()) || "Movies not found");
});

movieRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const movie = await MovieService.getMovieById(id);

    if (!movie) {
      res.status(404).json({ error: `Movie with externalId ${id} not found` });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

movieRouter.post("/add", async (req: Request, res: Response) => {
  const movieToAdd: MMovie = req.body;
  try {
    const newMovie = await MovieService.addMovie(movieToAdd);
    if (newMovie) {
      res.status(201).json("Movie created: " + newMovie);
    } else {
      res
        .status(500)
        .json({
          error: "Failed to add movie - email is uniqe field, check it",
        });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the movie" });
  }
});

movieRouter.put("/update/:id", async (req: Request, res: Response) => {
  const movieId = req.params.id;
  const movieToUpdate: MMovie = req.body;

  try {
    const updatedMovie = await MovieService.updateMovie(movieId, movieToUpdate);
    if (updatedMovie) {
      res.json("Movie updated: " + updatedMovie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the movie" });
  }
});

movieRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await MovieService.deleteMovie(movieId);
    if (deletedMovie) {
      res.json({ message: "Movie successfully deleted: ", deletedMovie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the movie" });
  }
});

export default movieRouter;
