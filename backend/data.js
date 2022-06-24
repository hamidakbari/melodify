import fs from 'fs';

const data = {
  users: [
    {
      name: 'hamid',
      email: 'hamid@gmail.com',
      password: '123456',
      favouriteSongs: [],
    },
  ],
  musics: [
    {
      name: 'Unforgiven 1',
      artist: 'Metalica',
      slug: 'unforgiven1-metalica',

      downloadLink:
        'https://drive.internxt.com/s/file/499312aa7806d4c67fc9/d6293c6558ca9d697087bb514000114fbf9d3d1b8b1b95890a3bfd1063fc82ae',
      category: 'Metal',
      rating: 4.5,
      numReviews: 25,
      image: '/images/unforgiven-1.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'carnival of rust',
      artist: 'Poets of the fall',
      slug: 'carnival-of-rust-poets-of-the-fall',

      downloadLink:
        'https://drive.internxt.com/s/file/c961871cc3c7cf6596fa/4a3792beee582aaeb0f27dd4e1fafe8c998609fb29f15ea8540b6a22e24b8bdc',
      category: 'Rock',
      rating: 4,
      numReviews: 42,
      image: '/images/carnival-of-rust.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'space bound',
      artist: 'Eminem',
      slug: 'space-bound-eminem',

      downloadLink:
        'https://drive.internxt.com/s/file/73b3373b24f586e4527b/ed0b4394e1e65a2616e3097d3c5a9a535b7567d725cda8b2051994dae659df08',
      category: 'Rap',
      rating: 4,
      numReviews: 14,
      image: '/images/eminem-space-bound.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'just give me a reason',
      artist: 'Pink',
      slug: 'just-give-me-a-reason-pink',

      downloadLink:
        'https://drive.internxt.com/s/file/ba45e5519ef2dd8da021/8eb65c7aa7cf12ce2868d993ae28b7da63bdbf2c3ebdc5ebca57211685bca0a2',
      category: 'Pop',
      rating: 3.5,
      numReviews: 18,
      image: '/images/just-give-me-a-reason.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'black bird',
      artist: 'Alter bridge',
      slug: 'black-bird-alter-bridge',

      downloadLink:
        'https://drive.internxt.com/s/file/88ec74adde67d728b496/b0b52e1dfdb1c969e94153b3fdcde2aff473c019718e23e8e1e01128e2ad93d7',
      category: 'Rock',
      rating: 4.5,
      numReviews: 21,
      image: '/images/blackbird.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'comfortably numb',
      artist: 'Pink Floyd',
      slug: 'comfortably-numb-pink-floyd',

      downloadLink:
        'https://drive.internxt.com/s/file/be191013d554005b99ab/62936873dc55d771fc1f0dd994eb7887780c25e25904be6d61e54b7f6929b9fa',
      category: 'Rock',
      rating: 4,
      numReviews: 31,
      image: '/images/comfortably-numb.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'zombie',
      artist: 'Cranberries',
      slug: 'zombie-cranberries',

      downloadLink:
        'https://drive.internxt.com/s/file/4fe04a55feba52c9bc2f/d16fa81c7c3e4384f9a1be4f854cf32500ce68c95a613c9274a5bdef25cd393e',
      category: 'Alternative',
      rating: 4.6,
      numReviews: 42,
      image: '/images/cranberries.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'nothing else matters',
      artist: 'Metalica',
      slug: 'nothing-else-matters-metalica',

      downloadLink:
        'https://drive.internxt.com/s/file/3664c721c82d2cde65b2/f8ae6a73f1584521a90708736cd467e657182cabd7e6e3c7e082325c670033cf',
      category: 'Metal',
      rating: 4,
      numReviews: 23,
      image: '/images/nothing-else-matters.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'snuff',
      artist: 'Slipknot',
      slug: 'snuff-slipknot',

      downloadLink:
        'https://drive.internxt.com/s/file/0f6052fdb3e4ca3f931f/daa42658fb50dc190e13caffb24e7d428b1334b392aa622a0ffa27b7584b0332',
      category: 'Alternative',
      rating: 4.2,
      numReviews: 12,
      image: '/images/snuff.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'show must go on',
      artist: 'Queen',
      slug: 'show-must-go-on-queen',

      downloadLink:
        'https://drive.internxt.com/s/file/75bc1731091dc7d82aca/d5bc4c0459884c55fb749aeafd8b769e705c960b912ecedca904f8b95d95e728',
      category: 'Rock',
      rating: 4.3,
      numReviews: 16,
      image: '/images/show-must-go-on.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'ode to my family',
      artist: 'Cranberries',
      slug: 'ode-to-my-family-cranberries',

      downloadLink:
        'https://drive.internxt.com/s/file/ca38066908f18d034039/10bed22e354b9a45b7b6c4bf654a8550edb6b7091bd3490ee22e9c06e1d43953',
      category: 'Rock',
      rating: 4.1,
      numReviews: 16,
      image: '/images/ode-to-my-family.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
    {
      name: 'bidad',
      artist: 'Shajarian',
      slug: 'bidad-shajarian',

      downloadLink:
        'https://drive.internxt.com/s/file/7b603f0f597040538afd/8c8368b94a0513027fdea58810cb16f85a17c28e82d2636fae3df4879c548291',
      category: 'Classical',
      rating: 4.1,
      numReviews: 16,
      image: '/images/bidad.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
  ],
};
export default data;
