import { Router } from "express";
import filmController from "../controllers/films.js";

const FilmRouter = Router();

FilmRouter.get('/films', filmController.getAll)

export default FilmRouter