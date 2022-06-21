import { useEffect, useReducer, useState, useRef, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Rating from '../components/Rating';
import { Store } from '../store';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true };
    }
    case 'FETCH_SUCESS': {
      return { ...state, loading: false, music: action.payload };
    }
    case 'FETCH_FAIL': {
      return { ...state, loading: false, error: action.payload };
    }

    case 'FETCH_RELATED_REQUEST': {
      return { ...state, relatedLoading: true };
    }
    case 'FETCH_RELATED_SUCCESS': {
      return { ...state, relatedMusics: action.payload, relatedLoading: false };
    }
    case 'FETCH_RELATED_FAIL': {
      return { ...state, relatedError: action.payload, relatedLoading: false };
    }
    default:
      return state;
  }
};
const MusicScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [color, setColor] = useState('');
  const [likes, setLikes] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [rating1Color, setRating1Color] = useState('');
  const [rating2Color, setRating2Color] = useState('');
  const [rating3Color, setRating3Color] = useState('');
  const [rating4Color, setRating4Color] = useState('');
  const [rating5Color, setRating5Color] = useState('');
  const [usersRating, setUsersRating] = useState();
  const [numReviews, setNumReviews] = useState();
  const { slug } = useParams();
  const commentIcon = useRef();
  const [
    { loading, error, music, relatedLoading, relatedError, relatedMusics },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
    music: {},
    relatedLoading: true,
    relatedError: '',
    relatedMusics: [],
  });

  useEffect(() => {
    const sendRequest = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/musics/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    const sendRelatedRequest = async () => {
      try {
        dispatch({ type: 'FETCH_RELATED_REQUEST' });
        const { data } = await axios.get(
          `/api/musics/music/${slug}/relatedMusics`
        );
        dispatch({ type: 'FETCH_RELATED_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_RELATED_FAIL', payload: err.message });
      }
    };
    sendRequest();
    sendRelatedRequest();
  }, [slug]);

  const commentIconHandler = () => {
    commentIcon.current.focus();
  };
  const likeHandler = async () => {
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    try {
      setColor('red');
      const { data } = await axios.put(
        `/api/musics/${music._id}/likes`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log({ data: data });
      setLikes(data.likes);
    } catch (err) {
      console.log({ message: err.message });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    const { data } = await axios.put(
      `/api/musics/music/${slug}/comments`,
      { comment },
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );
    alert(`${data.split('   ')[0]}:${data.split('   ')[1]}`);
  };

  const rating1Handler = () => {
    setRating(rating + 1);
    setRating1Color('#ffcc00');
  };

  const rating2Handler = () => {
    setRating(rating + 1);
    setRating2Color('#ffcc00');
  };

  const rating3Handler = () => {
    setRating(rating + 1);
    setRating3Color('#ffcc00');
  };

  const rating4Handler = () => {
    setRating(rating + 1);
    setRating4Color('#ffcc00');
  };

  const rating5Handler = () => {
    setRating(rating + 1);
    setRating5Color('#ffcc00');
  };

  const ratingSubmitHandler = async () => {
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    try {
      console.log(music.slug);
      const { data } = await axios.put(
        `/api/musics/music/${music.slug}/rating`,
        { rating },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setUsersRating(data.rating);
      setNumReviews(data.numReviews);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <Row className="my-3 mx-2 justify-content-between">
            <Col md={4} className="align-items-center mx-auto">
              <img
                src={music.image}
                alt={music.name}
                style={{ maxhHeight: '80vh', maxWidth: '85%' }}
              />
            </Col>

            <Col md={4} className="mx-auto">
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <p>
                        <strong>name : {music.name}</strong>
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>
                        <strong>Artist : {music.artist}</strong>
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-flex justify-content-between">
                        Category :
                        <span>
                          <Badge
                            bg={
                              music.category === 'Rock'
                                ? 'danger'
                                : music.category === 'Rap'
                                ? 'warning'
                                : music.category === 'Pop'
                                ? 'success'
                                : music.category === 'Metal'
                                ? 'dark'
                                : 'info'
                            }
                          >
                            {music.category}
                          </Badge>
                        </span>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col md={3}>
                      <span style={{ color: color }} onClick={likeHandler}>
                        <i className="fa-regular fa-heart"></i>{' '}
                      </span>
                      <span> {likes ? likes : music.likes}</span>
                    </Col>
                    <Col md={7}>
                      <Rating
                        rating={usersRating ? usersRating : music.rating}
                        numReviews={numReviews ? numReviews : music.numReviews}
                      />
                    </Col>
                    <Col md={2}>
                      <span onClick={commentIconHandler}>
                        <i className="fa-regular fa-comment"></i>
                      </span>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={4} className="mx-auto">
              <Card>
                <Card.Body>
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col>
                      <strong>Name : {music.name}</strong>
                    </Col>
                    <Col>
                      <Button variant={'success'}>
                        <Link
                          to={`/musics/music/${music.slug}/comments`}
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          people's Comments
                        </Link>
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <p>
                    <strong>Artist: {music.artist}</strong>
                  </p>
                  <hr />
                  <div>
                    <span>Size :</span>
                    <span>
                      {(music.size.split(' ')[0] / (1024 * 1024)).toFixed(2) +
                        ' MB'}
                    </span>
                  </div>
                  <p>Description: {music.description}</p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span>rating of this song : </span>
                    <span
                      onClick={rating1Handler}
                      style={{ color: rating1Color }}
                    >
                      <i className="fa-regular fa-star"></i>
                    </span>
                    <span
                      onClick={rating2Handler}
                      style={{ color: rating2Color }}
                    >
                      <i className="fa-regular fa-star"></i>
                    </span>
                    <span
                      onClick={rating3Handler}
                      style={{ color: rating3Color }}
                    >
                      <i className="fa-regular fa-star"></i>
                    </span>
                    <span
                      onClick={rating4Handler}
                      style={{ color: rating4Color }}
                    >
                      <i className="fa-regular fa-star"></i>
                    </span>
                    <span
                      onClick={rating5Handler}
                      style={{ color: rating5Color }}
                    >
                      <i className="fa-regular fa-star"></i>
                    </span>
                    <span>
                      {'  '}
                      {rating}/5
                    </span>
                    <Button onClick={ratingSubmitHandler} size={'sm'}>
                      Submit
                    </Button>
                  </div>
                  <hr />
                  <div className="d-grid">
                    <Button
                      onClick={() => {
                        saveAs(music.downloadLink, `${music.name}.mp3`);
                      }}
                    >
                      Download Mp3 Song
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3 mx-3">
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Please Insert your Comment:</Form.Label>
                <Form.Control
                  as={'textarea'}
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={'Please Insert your Comment'}
                  ref={commentIcon}
                ></Form.Control>
              </Form.Group>
              <Button className="my-3" type="submit">
                Submit your Comment
              </Button>
            </Form>
          </Row>
          <hr />
          <div>
            <h1>Related Songs:</h1>
            {relatedLoading ? (
              <div>relatedSongs are Loading</div>
            ) : relatedError ? (
              <div>{relatedError}</div>
            ) : relatedMusics.length === 0 ? (
              <div>There is no related Music of this music</div>
            ) : (
              <div className="d-flex justify-content-start align-items-center mt-3 mx-3">
                {relatedMusics.map((relatedMusic) => (
                  <Card className="mx-3 mt-0">
                    <Link
                      to={`/musics/${relatedMusic.slug}`}
                      className="d-flex justify-content-center mt-3"
                    >
                      <img
                        src={relatedMusic.image}
                        alt={relatedMusic.name}
                        className="img-card-top"
                        style={{ maxWidth: '20vw', maxHeight: '20vh' }}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Text>song: {relatedMusic.name}</Card.Text>
                      <hr />
                      <Card.Text>Artist: {relatedMusic.artist}</Card.Text>
                      <hr />
                      <div>
                        <Card.Text>
                          <span className="d-flex justify-content-between align-items-center p-2">
                            Category:{' '}
                            <Badge
                              bg={
                                music.category === 'Rock'
                                  ? 'danger'
                                  : music.category === 'Rap'
                                  ? 'warning'
                                  : music.category === 'Pop'
                                  ? 'success'
                                  : music.category === 'Metal'
                                  ? 'dark'
                                  : 'info'
                              }
                            >
                              {relatedMusic.category}
                            </Badge>
                          </span>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default MusicScreen;
