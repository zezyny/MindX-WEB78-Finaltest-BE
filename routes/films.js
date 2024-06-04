import { Router } from "express";
import FilmController from "../controllers/films.js";
import { authMiddleware } from "../middlewares/auth.js";

const FilmRouter = Router();

FilmRouter.get('/films', FilmController.getAll)
FilmRouter.put('/film/:id', authMiddleware.verifyJwt, FilmController.updateFilm)
FilmRouter.get('/film/:id', authMiddleware.verifyJwt, FilmController.getById)
FilmRouter.delete('/film/:id', authMiddleware.verifyJwt, FilmController.delete)
export default FilmRouter