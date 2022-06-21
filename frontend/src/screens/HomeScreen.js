import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Music from '../components/Music';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': {
      return { ...state, loading: true };
    }
    case 'FETCH_SUCESS': {
      return { ...state, loading: false, musics: action.payload };
    }
    case 'FETCH_FAIL': {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
const HomeScreen = () => {
  const [{ loading, error, musics }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    musics: [],
  });
  useEffect(() => {
    const sendRequest = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/musics');
        dispatch({ type: 'FETCH_SUCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    sendRequest();
  }, []);
  return (
    <Container className="my-3">
      <h1>Home Page</h1>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {musics.map((music) => (
            <Col key={music._id} sm={6} md={4} lg={3}>
              <Music music={music} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
export default HomeScreen;
