import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      favouriteSongs: user.favouriteSongs,
    },
    process.env.SECRET,
    {
      expiresIn: '30d',
    }
  );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        console.log({ error: err.message });
        res.status(422).send('User Not authorized!');
        return next(err);
      }
      req.user = decode;
      next();
    });
  }
};
