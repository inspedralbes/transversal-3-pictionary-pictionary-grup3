import React, {useState} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:7500');

const JoinGame = () => {

  const [nameUser, setNameUser] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');

  const handleChangeLobbyCode = (e) => {
    setLobbyCode(e.target.value);
  }

  const handleChangeUserName  = (e) =>{
    setNameUser(e.target.value);    
  }

  const joinLobby = () => {
    socket.emit('join room', { lobby_code: lobbyCode, user: nameUser })
   }

  return (
    <div>
    <form>
      <label>Enter lobby code
      <input type="text" value={lobbyCode} onChange={handleChangeLobbyCode}></input>
      </label>
      <label>Enter your name
      <input type="text" value={nameUser} onChange={handleChangeUserName}></input>
      </label>
      <button type='submit' onClick={joinLobby}>Send</button>
    </form>
    </div>
      
  );
};

export default JoinGame;
