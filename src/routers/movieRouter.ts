import { Router } from "express";
import { authenticateToken } from "../jwtAuth/authMiddeware";
import * as movieController from '../controllers/movieController';

const movieRouter = Router();

// movieRouter.use(authenticateToken);

movieRouter.get('/data', movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.get("/create", movieController.createMovie);
movieRouter.get("/update/:id", movieController.updateMovie);
movieRouter.get("/delete/:id", movieController.deleteMovie);

export default movieRouter;
