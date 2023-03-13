import '../../style/style.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const JoinGame = ({ socket }) => {
  const [nameUser, setNameUser] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [correctName, setCorrectName] = useState(true);
  const [correctLobby, setCorrectLobby] = useState(true);
  const [fullLobby, setFullLobby] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setFullLobby(false);
    e.preventDefault();
    if (nameUser != '') {
      setCorrectName(true);
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
          console.log(lobbies[i].maxUsers);
          console.log(lobbies[i].users.length);
          console.log(lobbies[i].users.length > lobbies[i].maxUsers);

          if (lobbies[i].users.length >= lobbies[i].maxUsers) {
            setFullLobby(true);
          } else {
            socket.emit('join room', {
              name: nameUser,
              userId: uuidv4(),
              lobby_code: lobbyCode,
            });
            navigate('/playGame');
          }
        }
      }

      setCorrectLobby(false);
    });
  };

  return (
    <div className="h-screen flex bg-[url('../style/webBackground.png')] bg-cover items-center">
      <div className='m-[auto] border-2 rounded-lg w-80 p-16'>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
              placeholder="Lobby code"
              className='input-join'
            ></input>
          </label>
          <label>
            <input
              type='text'
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
              placeholder="Your name"
              className='input-join'
            ></input>
          </label>
          <button type='submit' className='default-button font-semibold outline outline-1 p-1 rounded-lg hover:bg-gray-800 hover:text-gray-50'>
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
        {fullLobby && (
          <div>
            <p>The lobby is full!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinGame;