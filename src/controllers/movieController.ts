import { Request, Response } from "express";
import * as movieService from '../services/movieService';
import { MovieModel } from "../models/movieModel";
import { HTTP_STATUS } from "../constants/httpContants";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies: MovieModel[] = await movieService.getAllMovies();
        console.log("All movies have been sent")
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
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: `Movie with id ${id} not found` });
        } else {
            console.log("Movie " + movie.name + " has been sent by id")
            res.status(HTTP_STATUS.OK).json(movie);
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

export const getMovieByExternalId = async (req: Request, res: Response): Promise<void> => {
    const externalId = req.params.externalId;

    try {
        const movie = await movieService.getMovieByExternalId(externalId);

        if (!movie) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ error: `Movie with extrnal id ${externalId} not found` });
        } else {
            console.log("Movie " + movie.name + " has been sent by external id")
            res.status(HTTP_STATUS.OK).json(movie);
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    const movieToAdd: MovieModel = await req.body;
    console.log({movieToAdd});
    
    if (movieToAdd && JSON.stringify(movieToAdd) !== '{}') {
        try {
            const newMovie = await movieService.createMovie(movieToAdd);
            if (newMovie) {
                console.log("Movie " + newMovie.name + " has been created")
                res.status(HTTP_STATUS.CREATED).json(newMovie);
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
    } else {
        console.log("No movie data on create")
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({
                error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " Movie to update is missing"
            })
    }
}

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const movieExternalId = req.params.externalId;
    const movieToUpdate: MovieModel = await req.body;

    if (movieToUpdate && JSON.stringify(movieToUpdate) !== '{}') {
        try {
            const updatedMovie = await movieService.updateMovie(movieExternalId, movieToUpdate);

            if (updatedMovie) {
                console.log("Movie " + updatedMovie.name + " has been updated")
                res.status(HTTP_STATUS.OK).json(updatedMovie);
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
            }
        } catch (error) {
            res
                .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while updating the movie" });
        }
    } else {
        console.log("No movie data on update")
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({
                error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " Movie to update is missing"
            })
    }
}

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const movieExternalId = req.params.externalId;
    try {
        const deletedMovie = await movieService.deleteMovie(movieExternalId);
        if (deletedMovie) {
            console.log("Movie " + deletedMovie.name + " has been deleted")
            res.status(HTTP_STATUS.OK).json(deletedMovie);
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
        }
    } catch (error) {
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR + " An error occurred while deleting the movie" });
    }
};
