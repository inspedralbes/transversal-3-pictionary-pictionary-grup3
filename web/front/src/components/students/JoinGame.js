import React, {useState} from 'react';
import {v4 as uuidv4 } from 'uuid';

const JoinGame = ({socket}) => {
  const [nameUser, setNameUser] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');

  const handleChangeLobbyCode = (e) => {
    setLobbyCode(e.target.value);
  }

  const handleChangeUserName  = (e) =>{
    setNameUser(e.target.value);    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ lobby_code: lobbyCode, name: nameUser })
    socket.emit('join room', { name: nameUser, userId: uuidv4(), lobby_code: lobbyCode})
   }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>Enter lobby code
      <input type="text" value={lobbyCode} onChange={handleChangeLobbyCode}></input>
      </label>
      <label>Enter your name
      <input type="text" value={nameUser} onChange={handleChangeUserName}></input>
      </label>
      <button type='submit'>Send</button>
      <a href="/playGame"></a>
    </form>
    </div>
      
  );
};

export default JoinGame;
