import express from 'express';
import Music from '../models/music-model.js';
import { isAuth } from '../utils.js';
import User from '../models/user-model.js';
const musicRouter = express.Router();

musicRouter.get('/', async (req, res) => {
  try {
    const musics = await Music.find({});
    res.send(musics);
  } catch (err) {
    res.send({ message: err.message });
  }
});

musicRouter.get('/search', async (req, res) => {
  try {
    const musics = await Music.find({});
    const { q } = req.query;
    const keys = ['name', 'artist', 'category'];
    const search = (musics) => {
      return musics.filter((music) =>
        keys.some((key) => music[key].toLowerCase().includes(q))
      );
    };
    res.send(search(musics));
  } catch (err) {
    res.send({ message: err.message });
  }
});

musicRouter.get('/music/:slug/relatedMusics', async (req, res) => {
  try {
    const music = await Music.findOne({ slug: req.params.slug });
    if (music) {
      console.log(music);
      // const relatedMusics = await Music.find(
      //   (m) => m.category === music.category || m.artist === music.artist
      // );

      const relatedMusics = await Music.find({
        $or: [{ category: music.category }, { artist: music.artist }],
      });
      console.log({ music: music });
      const updatedRelatedMusics = relatedMusics.filter(
        (m) => m.name !== music.name
      );
      console.log({ related: relatedMusics });
      console.log(updatedRelatedMusics);
      res.send(updatedRelatedMusics);
    } else {
      res.status(404).send({ message: 'Music Not Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

musicRouter.put('/music/:slug/comments', isAuth, async (req, res) => {
  const { comment } = req.body;
  const myComment = req.user.name + '   ' + comment;
  try {
    const music = await Music.findOne({ slug: req.params.slug });
    if (music) {
      music.comments.push(myComment);
      await music.save();
      res.send(myComment);
    } else {
      res.status(404).send({ message: 'Music Not Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

musicRouter.put('/music/:slug/rating', isAuth, async (req, res) => {
  console.log(req.params.slug);
  const { rating } = req.body;
  try {
    const music = await Music.findOne({ slug: req.params.slug });
    if (music) {
      music.rating =
        (music.rating * music.numReviews + rating) / (music.numReviews + 1);
      music.numReviews = music.numReviews + 1;
      res
        .status(200)
        .send({ rating: music.rating, numReviews: music.numReviews });
      await music.save();
    } else {
      res.status(404).send({ message: 'No Music Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

musicRouter.get('/music/:slug/comments', isAuth, async (req, res) => {
  try {
    const music = await Music.findOne({ slug: req.params.slug });
    if (music) {
      res.send(music.comments);
    } else {
      res.status(404).send({ message: 'Music Not Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

musicRouter.put('/:id/likes', isAuth, async (req, res) => {
  const music = await Music.findById(req.params.id);

  const user = await User.findById(req.user.id);
  console.log(req.user.id);
  if (user) {
    if (music) {
      if (!user.favouriteSongs.includes(music._id)) {
        user.favouriteSongs.push(music._id);
        music.likes = Number(music.likes) + 1;
      }
      await music.save();
      await user.save();
      console.log({ music: music, user: user });
      res.send(music);
    } else {
      res.status(404).send('Music Not Found!');
    }
  } else {
    res.status(404).send('User Not Found !');
  }
});

musicRouter.get('/slug/:slug', async (req, res) => {
  try {
    const music = await Music.findOne({ slug: req.params.slug });

    if (music) {
      res.send(music);
    } else {
      res.status(404).send('Music Not Found!');
    }
  } catch (err) {
    next(err);
  }
});

export default musicRouter;
