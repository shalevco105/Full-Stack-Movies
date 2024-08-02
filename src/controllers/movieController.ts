import { Request, Response } from "express";
import * as movieService from '../services/movieService';
import { MovieModel } from "../models/movieModel";
import { HTTP_STATUS } from "../constants/httpContants";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies: MovieModel[] = await movieService.getAllMovies();
        res.status(HTTP_STATUS.OK).json(movies);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while getting the movies" });
    }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const movie = await movieService.getMovieById(id);

        if (!movie) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: `Movie with externalId ${id} not found` });
        } else {
            res.json(movie);
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    const movieToAdd: MovieModel = req.body;
    try {
        const newMovie = await movieService.createMovie(movieToAdd);
        if (newMovie) {
            res.status(HTTP_STATUS.CREATED).json("Movie created: " + newMovie);
        } else {
            res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({
                    error: "Failed to add movie - email is uniqe field, check it",
                });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while adding the movie" });
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
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
        }
    } catch (error) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while updating the movie" });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const movieId = req.params.id;
    try {
        const deletedMovie = await movieService.deleteMovie(movieId);
        if (deletedMovie) {
            res.json({ message: "Movie successfully deleted: ", deletedMovie });
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
        }
    } catch (error) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while deleting the movie" });
    }
};
