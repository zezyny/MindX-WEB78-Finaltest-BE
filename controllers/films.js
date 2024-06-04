import FilmModel from "../models/films.js";

const filmController = {
    getAll: async (req, res) => {
        try {
            const listPost = await FilmModel.find();
            res.status(200).send({
                data: listPost,
            });
        } catch (error) {
            res.status(error.status ?? 500).send({
                data: null,
                message: error.message,
                success: false
            });
        }
    }
}

export default filmController