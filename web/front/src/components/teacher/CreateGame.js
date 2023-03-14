import React, { useEffect, useState } from 'react';
import '../../style/style.css';

const CreateGame = ({ socket }) => {
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState(5);
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    codeGenerator();
  }, []);

  const userGenerator = () => {
    const randomUsers = Math.floor(Math.random() * (5 - 4 + 4) + 4);
    setUsers(randomUsers);
  };

  const codeGenerator = () => {
    const randomCode = Math.floor(
      Math.random() * (100000 - 999999 + 1) + 999999
    );
    setRoom(randomCode);
  };

  const createNewLobby = () => {
    codeGenerator();
    socket.emit('new lobby', {
      lobby_code: room,
      maxUsers: users,
      category: 'Info',
    });
    getLobby();
    showLobby();
  };

  const getLobby = () => {
    socket.emit('get lobbies', {});
    socket.on('lobbies list', function (data) {
      setLobbies(data);
    });
  };

  const showLobby = () => {
    console.log(lobbies);
  };

  return (
    <>
      <div>
        <label>Here's the code to your lobby! Have FUN!</label>
        <hr></hr>
        <button onClick={createNewLobby}>Create a new lobby</button>
      </div>
      <div className='lobby-list'>
        {lobbies.map((lobby, index) => (
          <div className='lobby' key={index}>
            <h2>{lobby.lobby_code}</h2>
            <p>{lobby.category}</p>
            {lobby.users.map((user, index) => (
              <span className='users' key={index}>
                {user.name}
              </span>
            ))}
            <p>{lobby.maxUsers}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CreateGame;
