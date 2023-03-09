import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const CreateGame = ({socket}) => {
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState(5);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let isDrawing = false;

    socket.on('drawings', function(data) {
        data.forEach(function(drawing) {
            draw(drawing.x, drawing.y);
        });
    });

    canvas.addEventListener('mousedown', function(event) {
        isDrawing = true;
        socket.emit('draw', { x: event.clientX, y: event.clientY });
    });

    canvas.addEventListener('mousemove', function(event) {
        if (isDrawing) {
            socket.emit('draw', { x: event.clientX, y: event.clientY });
        }
    });

    canvas.addEventListener('mouseup', function(event) {
        isDrawing = false;
    });

    socket.on('draw', function(data) {
        draw(data.x, data.y);
    });

    codeGenerator(4);
    
    function draw(x, y) {
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fillStyle = 'black';
      context.fill();
    }
  }, []);
  const codeGenerator = () => {
    const randomCode = Math.floor(Math.random() * (100000 - 999999 + 1) + 999999);
    setRoom(randomCode);
  }

  const createNewLobby = () => {
    codeGenerator()
    console.log(room)
    socket.emit('new lobby', { lobby_code: room, maxUsers: users, category: 'Info'});
  };

  return (
    <div>
      <label>Here's the code to your lobby! Have FUN!</label>
      <p id='code'>{room}</p>
      <button onClick={createNewLobby}>Create a new lobby</button>
      <canvas ref={canvasRef} width="900px" height="900px"></canvas>
    </div>
  );
};

export default CreateGame;
