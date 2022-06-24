import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    downloadLink: { type: String, required: true },
    rating: { type: Number, required: true },
    category: { type: String, required: true },
    numReviews: { type: Number, required: true },
    image: { type: String, required: true },
    likes: { type: String, required: true },
    comments: [{ type: String, required: true }],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Music = mongoose.model('Music', musicSchema);
export default Music;
