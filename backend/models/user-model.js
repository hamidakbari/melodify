import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favouriteSongs: [
      { type: mongoose.Types.ObjectId, required: true, ref: 'Music' },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
export default User;
