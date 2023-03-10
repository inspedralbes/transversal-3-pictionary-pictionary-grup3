import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // fetch(`http://127.0.0.1:8000/api/login`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'post',
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
    console.log(username, password);
  };

  const handlerChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlerChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Link to='/'>Main</Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>User:</label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={handlerChangeUsername}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handlerChangePassword}
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
