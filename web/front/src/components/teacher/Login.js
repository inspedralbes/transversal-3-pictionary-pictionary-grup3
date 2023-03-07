import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    //Aqui anire el endpoint per a pujar les dades a la BD
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Usuario:</label>
        <input type='text' id='username' name='username' value={username} />

        <label htmlFor='password'>Contraseña:</label>
        <input type='password' id='password' name='password' value={password} />

        <button type='submit'>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
