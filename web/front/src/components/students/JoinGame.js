import '../../style/style.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const JoinGame = ({ socket }) => {
  const [nameUser, setNameUser] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [correctName, setCorrectName] = useState(true);
  const [correctLobby, setCorrectLobby] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameUser != '') {
      setCorrectName(true);
      socket.emit('join room', {
        name: nameUser,
        userId: uuidv4(),
        lobby_code: lobbyCode,
      });
      checkCodeRoom();
    } else {
      setCorrectName(false);
      console.log('nombreVacio');
    }
  };

  const checkCodeRoom = () => {
    let lobbies = {};
    socket.emit('get lobbies', {});
    socket.on('lobbies list', function (data) {
      lobbies = data;

      for (let i = 0; i < lobbies.length; i++) {
        if (lobbies[i].lobby_code === parseInt(lobbyCode)) {
          console.log(lobbyCode);
          if (lobbies[i].users.length < lobbies[i].maxUsers) {
            navigate('/playGame');
          } else {
            alert('lobby llena');
          }
        }
      }

      setCorrectLobby(false);
    });
  };

  return (
    <div className="h-screen flex bg-[url('../style/webBackground.png')] bg-cover items-center">
      <div className='m-[auto] border-2 w-112 '>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
            ></input>
          </label>
          <label>
            <input
              type='text'
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
            ></input>
          </label>
          <button type='submit' className='default-button'>
            Send
          </button>
        </form>
        {!correctName && (
          <div>
            <p>Fill in the name field please!</p>
          </div>
        )}
        {!correctLobby && (
          <div>
            <p>The lobby is non-existent!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinGame;
