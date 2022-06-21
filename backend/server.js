import express from 'express';
import seedRouter from './Routes/seedRouter.js';
import musicRouter from './Routes/musicRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/userRouter.js';
import bodyParser from 'body-parser';
const config = dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log({ message: err.message });
  });

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/seed', seedRouter);
app.use('/api/musics', musicRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.send({ error: err.message });
  next();
});

app.listen(5000);
