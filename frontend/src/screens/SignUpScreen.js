import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Store } from '../store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignUpScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/users/signup', {
      name,
      email,
      password,
    });
    ctxDispatch({ type: 'USER_SIGNIN', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('/');
  };
  return (
    <div className="mt-3 mx-3">
      <h1 className="mb-3">SignIn Screen</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Passsword"
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
      <p className="mt-3">
        <Link to={'/signIn'}>have account please signIn</Link>
      </p>
    </div>
  );
}
