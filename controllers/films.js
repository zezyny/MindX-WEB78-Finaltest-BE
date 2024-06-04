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
    },
    updateFilm: async (req, res) => {
        try {
            const { id } = req.params
            const data = req.body
            const existed = await FilmModel.findById(id)
            if (existed) {
                await FilmModel.findByIdAndUpdate(id, {
                    ...data
                })
                res.status(201).send({
                    data: data,
                    message: "Cập nhật thành công"
                })
            } else {
                const createFilm = await FilmModel.create({
                    ...data
                })
                res.status(201).send({
                    data: createFilm,
                    message: "Tạo thành công"
                })
            }


        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const dataFilm = await FilmModel.findById(id)
            // console.log(dataFilm);
            res.status(200).send({
                data: dataFilm,
                message: 'Thành công'
            })
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await FilmModel.findByIdAndDelete(id)
            // console.log(dataFilm);
            res.status(200).send({
                message: 'Xóa thành công'
            })
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
        }
    },
}

export default filmController