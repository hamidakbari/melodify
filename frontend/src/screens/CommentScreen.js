import axios from 'axios';
import React, { useReducer, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../store';
import ListGroup from 'react-bootstrap/ListGroup';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, comments: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function CommentScreen() {
  const { slug } = useParams();
  const { state } = useContext(Store);
  const navigate = useNavigate();
  const { userInfo } = state;
  const [{ loading, error, comments }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    comments: [],
  });

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
    const sendRequest = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/musics/music/${slug}/comments`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    sendRequest();
  }, [slug, userInfo, navigate]);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : comments.length === 0 ? (
    <div>This song has not comments to shared with you</div>
  ) : (
    <div>
      <ListGroup variant="flush">
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <Card>
              <Card.Header>
                <strong>User : {comment.split('   ')[0]}</strong>
              </Card.Header>
              <Card.Body>
                <Card.Text>Comment : {comment.split('   ')[1]}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
