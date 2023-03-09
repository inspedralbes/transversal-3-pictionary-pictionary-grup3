import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const CreateGame = ({ socket }) => {
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState(5);
  const canvasRef = useRef(null);

  useEffect(() => {
    codeGenerator();
  }, []);

  const codeGenerator = () => {
    const randomCode = Math.floor(
      Math.random() * (100000 - 999999 + 1) + 999999
    );
    setRoom(randomCode);
  };

  const createNewLobby = () => {
    codeGenerator();
    console.log(room);
    socket.emit('new lobby', {
      lobby_code: room,
      maxUsers: users,
      category: 'Info',
    });
  };

  const getLobby = () => {
    socket.emit('get lobbies', () => {
      socket.on('lobbies list', (data) => {
        console.log(data);
      });
    });
  };

  function wipe() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div>
      <label>Here's the code to your lobby! Have FUN!</label>
      <p id='code'>{room}</p>
      <button onClick={createNewLobby}>Create a new lobby</button>
      <hr></hr>
      <button onClick={getLobby}>Get Lobby</button>
    </div>
  );
};

export default CreateGame;
