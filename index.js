import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './routes/users.js';
import FilmRouter from './routes/films.js';
import cors from 'cors';

mongoose.connect('mongodb+srv://viettrung2709:trung0807@cluster1.deymyma.mongodb.net/finaltest?retryWrites=true&w=majority&appName=Cluster1', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connect DB Success!');
});
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/v1', UserRouter);
app.use('/api/v1', FilmRouter);

app.listen('8080', async () => {
    console.log('Server is running!');
});