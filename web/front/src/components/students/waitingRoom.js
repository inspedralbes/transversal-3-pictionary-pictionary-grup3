import React, { useState, useEffect } from 'react';

const WaitingRoom = ({ socket }) => {
  const [userReady, setUserReady] = useState(0);
  const [maxUsers, setMaxUsers] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    socket.emit('get user list', {});
    socket.on('lobby user list', function (data) {
      console.log(data);
    });
  };
  return <div>hola</div>;
};

export default WaitingRoom;
