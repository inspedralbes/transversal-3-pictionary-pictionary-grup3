import React, { useEffect, useState } from 'react';

const CreateGame = ({socket}) => {
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState(5);

  const codeGenerator = () => {
    const randomCode = Math.floor(Math.random() * (100000 - 999999 + 1) + 999999);
    setRoom(randomCode);
  }

  const createNewLobby = () => {
    codeGenerator()
    socket.emit('new lobby', { lobby_code: room, maxUsers: users, category: 'Info'});
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
