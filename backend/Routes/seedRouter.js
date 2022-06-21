import express from 'express';
import mongoose from 'mongoose';
import data from '../data.js';
import Music from '../models/music-model.js';
import User from '../models/user-model.js';
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    await Music.remove({});
    await User.remove({});
    const musics = await Music.insertMany(data.musics);
    const users = await User.insertMany(data.users);
    res.send({ musics, users });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});
export default seedRouter;
