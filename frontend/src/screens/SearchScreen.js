import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Music from '../components/Music';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
export default function SearchScreen(props) {
  const [musics, setMusics] = useState([]);
  const { query } = props;
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/musics/search/?q=${query}`);
      setMusics(data);
    };
    fetchData();
  }, [query]);
  return (
    <Container>
      <h1 className="mt-3">Search Results</h1>
      <Row>
        {musics.map((music) => (
          <Col key={music._id} sm={6} md={4} lg={3}>
            <Music music={music} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
