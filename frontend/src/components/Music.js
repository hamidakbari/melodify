import React from 'react';
import Card from 'react-bootstrap/Card';
import Rating from './Rating';
import { Link } from 'react-router-dom';
export default function Music(props) {
  const { music } = props;
  return (
    <div className="my-3">
      <Card>
        <Link to={`/musics/${music.slug}`}>
          <img
            src={music.image}
            alt={music.name}
            className="card-img-top"
            style={{ width: '100%', height: '50vh' }}
          />
        </Link>
        <div className="ms-2 mt-2">
          <Link to={`/musics/${music.slug}`} style={{ textDecoration: 'none' }}>
            <Card.Title>Song: {music.name}</Card.Title>
          </Link>
          <Card.Title>Artist: {music.artist}</Card.Title>
        </div>
        <Card.Body>
          <Rating rating={music.rating} numReviews={music.numReviews} />
        </Card.Body>
      </Card>
    </div>
  );
}
