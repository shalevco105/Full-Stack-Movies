import { Router } from "express";
import { authenticateToken } from "../jwtAuth/authMiddeware";
import * as movieController from '../controllers/movieController';

const movieRouter = Router();

movieRouter.use(authenticateToken);

movieRouter.get('/data', movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovieById);
movieRouter.get("/externalId/:externalId", movieController.getMovieByExternalId);
movieRouter.post("/create", movieController.createMovie);
movieRouter.put("/:externalId", movieController.updateMovie);
movieRouter.delete("/:externalId", movieController.deleteMovie);
movieRouter.post("/reset", movieController.resetMovies);

export default movieRouter;
