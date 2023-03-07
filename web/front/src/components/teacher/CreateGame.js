import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:7500');

const CreateGame = () => {
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState(5);

  useEffect(() => {
    codeGenerator(4);
  }, []);

  function codeGenerator(long) {
    let items =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < long; i++) {
      code += items.charAt(Math.floor(Math.random() * items.length));
    }
    setRoom(code);
  }

  const createNewLobby = () => {
    socket.emit('new lobby', { lobby_code: room, maxUsers: users });
  };

  return (
    <div>
      <label>Here's the code to your lobby! Have FUN!</label>
      <p id='code'>{room}</p>
      <button onClick={createNewLobby}>Create a new lobby</button>
    </div>
  );
};

export default CreateGame;
