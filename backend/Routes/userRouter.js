import express from 'express';
import Music from '../models/music-model.js';
import User from '../models/user-model.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.send('User Exists try another email');
  }
  const newUser = new User({
    name: name,
    email: email,
    password: password,
    favouriteSongs: [],
  });
  const user = await newUser.save();
  res.send({
    id: user._id,
    name: user.name,
    email: user.email,
    favouriteSongs: user.favouriteSongs,
    token: generateToken(user),
  });
});

userRouter.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.send({
          id: user._id,
          name: user.name,
          email: user.email,
          favouriteSongs: user.favouriteSongs,
          token: generateToken(user),
        });
      } else {
        res.status(404).send({ message: "email or password doesn't match" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
userRouter.put('/profile', isAuth, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id || req.user._id);
    console.log({ user: user });
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      await user.save();
      console.log({ updatedUser: user });
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        favouriteSongs: user.favouriteSongs,
        token: generateToken(user),
      });
    } else {
      res.status(404).send({ message: 'User Not Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error in updating profile' });
  }
});
userRouter.get('/:id/favouriteSongs', isAuth, async (req, res) => {
  try {
    let myFavouriteSongs = [];
    const user = await User.findById(req.params.id);
    if (user) {
      const favouriteSongsIDs = user.favouriteSongs;
      for (let i = 0; i < favouriteSongsIDs.length; i++) {
        const m = await Music.findById(favouriteSongsIDs[i]);
        myFavouriteSongs = [...myFavouriteSongs, m];
      }

      console.log({ favouriteSongs: myFavouriteSongs });
      res.status(200).send(myFavouriteSongs);
    } else {
      res.status(404).send('There is no user Found!');
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

export default userRouter;
