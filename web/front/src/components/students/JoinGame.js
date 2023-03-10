<<<<<<< HEAD
import '../../style/style.css';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
=======
import "../../style/style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Link } from 'react-router-dom';
>>>>>>> 68cab35c71821339fd4be632a62662d0468b34ef

const JoinGame = ({ socket }) => {
  const [nameUser, setNameUser] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [lobbies, setLobbies] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('join room', {
      name: nameUser,
      userId: uuidv4(),
      lobby_code: lobbyCode,
    });
    checkCodeRoom();
  };

  const checkCodeRoom = () => {
    socket.emit('get lobbies', {});
    socket.on('lobbies list', function (data) {
      setLobbies(data);
    });

    for (let i = 0; i < lobbies.length; i++) {
      if (lobbies[i].lobby_code === parseInt(lobbyCode)) {
        if (lobbies[i].users.length < lobbies[i].maxUsers) {
          navigate('/playGame');
        } else {
          alert('lobby llena');
        }
      }
    }
  };

  return (
    <div className="h-screen flex bg-[url('../style/webBackground.png')] bg-cover items-center">
      <div className='m-[auto] border-2 w-112 '>
        <form onSubmit={handleSubmit}>
          <label>
            Enter lobby code
            <input
              type='text'
              value={lobbyCode}
              onChange={(e) => setLobbyCode(e.target.value)}
            ></input>
          </label>
          <label>
            Enter your name
            <input
              type='text'
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
            ></input>
          </label>
          <button to="/playGame" type="submit" className="default-button">
            Send
          </button>
          <Link to="/playGame">Play Game</Link>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
