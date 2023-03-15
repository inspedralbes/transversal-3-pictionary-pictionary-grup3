import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WaitingRoom = ({ socket }) => {
  const [userReady, setUserReady] = useState(0);
  const [maxUsers, setMaxUsers] = useState(1);
  const [clickReady, setClickReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    redirectToCanvas();
  }, [userReady]);

  const handleClickNotReady = () => {
    setUserReady((prevCount) => prevCount + 1);
    setClickReady(true);
  };

  const handleClickReady = () => {
    setUserReady((prevCount) => prevCount - 1);
    setClickReady(false);
  };

  const getUsers = () => {
    socket.emit('get user list', {});
    socket.on('lobby user list', function (data) {
      console.log(data);
    });
  };

  const redirectToCanvas = () => {
    if (userReady === maxUsers) {
      navigate('/playGame');
    }
  };
  return (
    <div>
      {clickReady ? (
        <>
          <button onClick={handleClickReady}>Not Ready</button>
          Waiting Others
        </>
      ) : (
        <button onClick={handleClickNotReady}>Ready</button>
      )}
      {userReady} / {maxUsers}
    </div>
  );
};

export default WaitingRoom;
