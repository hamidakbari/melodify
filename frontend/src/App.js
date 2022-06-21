import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MusicScreen from './screens/MusicScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { useContext, useState } from 'react';
import { Store } from './store';
import FavouriteSongsScreen from './screens/FavouriteSongsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CommentScreen from './screens/CommentScreen';
import { useNavigate } from 'react-router-dom';
import SearchScreen from './screens/SearchScreen';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  //const navigate = useNavigate();
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.setItem('userInfo', null);
  };
  const searchHandler = () => {
    navigate(`/search`);
  };
  return (
    <div>
      <header>
        <Navbar bg="dark">
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand className="text-white">Hamid Music</Navbar.Brand>
            </LinkContainer>
            <Nav className="float-end">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="nav-dropdown">
                  <NavDropdown.Item>
                    <Link
                      to={'/profile'}
                      style={{ textDecoration: 'none', color: '#202020' }}
                    >
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to={'/favouriteSongs'}
                      style={{ textDecoration: 'none', color: '#202020' }}
                    >
                      Favourite Songs
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler}>
                    Signout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Nav.Link href="/signin" className="text-white">
                    SignIn
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant="outline-success" onClick={searchHandler}>
                Search
              </Button>
            </Form>
          </Container>
        </Navbar>
      </header>
      <main>
        <Routes>
          <Route element={<HomeScreen />} path={'/'}></Route>
          <Route element={<MusicScreen />} path={'/musics/:slug'}></Route>
          <Route element={<SignInScreen />} path={'/signin'}></Route>
          <Route element={<SignUpScreen />} path={'/signup'}></Route>
          <Route element={<ProfileScreen />} path={'/profile'}></Route>
          <Route
            element={<SearchScreen query={query} />}
            path={'/search'}
          ></Route>
          <Route
            element={<CommentScreen />}
            path={'/musics/music/:slug/comments'}
          ></Route>

          <Route
            element={<FavouriteSongsScreen />}
            path={'/favouriteSongs'}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
