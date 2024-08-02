import { Request, Response } from "express";
import * as movieService from '../services/movieService';
import { MovieModel } from "../models/movieModel";

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies:MovieModel[] = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while getting the movies" });
    }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const movie = await movieService.getMovieById(id);

        if (!movie) {
            res.status(404).json({ error: `Movie with externalId ${id} not found` });
        } else {
            res.json(movie);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    const movieToAdd: MovieModel = req.body;
    try {
        const newMovie = await movieService.createMovie(movieToAdd);
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
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const movieId = req.params.id;
    const movieToUpdate: MovieModel = req.body;

    try {
        const updatedMovie = await movieService.updateMovie(movieId, movieToUpdate);
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
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const movieId = req.params.id;
    try {
        const deletedMovie = await movieService.deleteMovie(movieId);
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
};
