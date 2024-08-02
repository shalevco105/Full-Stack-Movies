import { Router } from "express";
import { authenticateToken } from "../jwtAuth/authMiddeware";
import * as movieController from '../controllers/movieController';

const movieRouter = Router();

movieRouter.use(authenticateToken);

movieRouter.get('/data', movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.post("/create", movieController.createMovie);
movieRouter.put("/update/:id", movieController.updateMovie);
movieRouter.delete("/delete/:id", movieController.deleteMovie);

export default movieRouter;
