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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/Unforgiven 1.mp3'
        ).size + ' bits',
      downloadLink: '/music/Unforgiven 1.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/carnival-of-rust.mp3'
        ).size + ' bits',
      downloadLink: '/music/carnival-of-rust.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/space-bound.mp3'
        ).size + ' bits',
      downloadLink: '/music/space-bound.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/Pink - Just Give Me a Reason (1).mp3'
        ).size + ' bits',
      downloadLink: '/music/Pink - Just Give Me a Reason (1).mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/alter-bridge-blackbird.mp3'
        ).size + ' bits',
      downloadLink: '/music/alter-bridge-blackbird.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/comfortably-numb.mp3'
        ).size + ' bits',
      downloadLink: '/music/comfortably-numb.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/zombie.mp3'
        ).size + ' bits',
      downloadLink: '/music/zombie.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/metallica-nothing-else-matters.mp3'
        ).size + ' bits',
      downloadLink: '/music/metallica-nothing-else-matters.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/snuff.mp3'
        ).size + ' bits',
      downloadLink: '/music/snuff.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/show-must-go-on.mp3'
        ).size + ' bits',
      downloadLink: '/music/show-must-go-on.mp3',
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
      size:
        fs.statSync(
          '/home/hamid/codes/javascriptCodes/js/jsRepository/redux-music/frontend/public/music/ode-to-my-family.mp3'
        ).size + ' bits',
      downloadLink: '/music/ode-to-my-family.mp3',
      category: 'Rock',
      rating: 4.1,
      numReviews: 16,
      image: '/images/ode-to-my-family.jpg',
      likes: 0,
      comments: [],
      description: "It's really a good song",
    },
  ],
};
export default data;
