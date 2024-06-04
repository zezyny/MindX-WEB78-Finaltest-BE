import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
    id: Number,
    name: String,
    time: Number,
    year: Number,
    image: String,
    introduce: String
});

const FilmModel = mongoose.model('films', filmSchema);

export default FilmModel;