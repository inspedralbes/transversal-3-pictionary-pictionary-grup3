import '../style/style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setUserData } from '../features/dataUserSlice';

export const JoinGame = ({ socket }) => {
  const [nameUser, setNameUser] = useState('');
  const [lobbyCode, setLobbyCode] = useState('');
  const [inLobby, setInLobby] = useState(false);
  const [error, setError] = useState('');
  const [usersReady, setUsersReady] = useState([]);
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameUser !== '' || lobbyCode !== '') {
      socket.emit('join room', {
        name: nameUser,
        userId: uuidv4(),
        lobby_code: parseInt(lobbyCode),
      });
      setInLobby(true);
      dispatch(setUserData(nameUser));
    }
    setError('Fill in the blanks');
  };

  const handleClickLeave = (e) => {
    e.preventDefault();
    socket.emit('leave lobby');
    setInLobby(false);
  };

  const handleClickReady = () => {
    socket.emit('ready user');
    setReady(true);
  };

  useEffect(() => {
    socket.on('lobby user list', (data) => {
      const readyUsers = data.list.filter((user) => user.ready);
      setUsersReady(readyUsers);
    });

    socket.on('start game', (data) => {
      navigate('/playGame');
    });
  });

  // const [nameUser, setNameUser] = useState('');
  // const [lobbyCode, setLobbyCode] = useState('');
  // const [inLobby, setInLobby] = useState(false)

  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (nameUser != '') {
  //     checkCodeRoom();
  //   }
  // };

  // const checkCodeRoom = () => {
  //   socket.emit('get lobbies');
  //   socket.emit('join room', {
  //     name: nameUser,
  //     userId: uuidv4(),
  //     lobby_code: lobbyCode,
  //   });
  //   navigate('/playGame');
  // };

  return (
    <div className="h-screen flex bg-[url('../style/spinning-bg-pinchitos.png')] bg-cover bg-center items-center lg:bg-[url('../style/webBackground.png')]">
      {!inLobby ? (
        <div className='m-[auto] border-2 rounded-lg w-80 p-16'>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type='text'
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
                placeholder='Lobby code'
                className='input-join'
              ></input>
            </label>
            <label>
              <input
                type='text'
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
                placeholder='Your name'
                className='input-join'
              ></input>
            </label>
            <button
              type='submit'
              className='default-button font-semibold outline outline-1 p-1 rounded-lg hover:bg-gray-800 hover:text-gray-50'
            >
              Send
            </button>
            {error}
          </form>
        </div>
      ) : (
        <div>
          {!ready ? (
            <>
              <button onClick={handleClickLeave}>Leave lobby</button>
              <button onClick={handleClickReady}>Ready</button>
            </>
          ) : (
            <div>
              <h2>Users ready:</h2>
              <ul>
                {usersReady.map((user) => (
                  <li key={user.userId}>{user.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
