import { useReducer, useEffect, useContext } from 'react';
import { Store } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, favouriteSongs: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function FavouriteSongsScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, favouriteSongs }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    favouriteSongs: [],
  });
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
    const sendRequest = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `/api/users/${userInfo._id || userInfo.id}/favouriteSongs`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log({ favouriteSongs: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    sendRequest();
  }, [userInfo, navigate]);
  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : favouriteSongs.length === 0 ? (
    <div>you don't have favourite song please like a song to add it</div>
  ) : (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Song Name</th>
            <th>Artist Name</th>
            <th>Category</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {favouriteSongs.map((song) => (
            <tr key={song.slug}>
              <td>{song.name}</td>
              <td>{song.artist}</td>
              <td>{song.category}</td>
              <td>{song.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
