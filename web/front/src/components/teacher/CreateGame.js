import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:7500');

const CreateGame = () => {
  const [room, setRoom] = useState('');
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

    function codeGenerator(long) {
      let items =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < long; i++) {
        code += items.charAt(Math.floor(Math.random() * items.length));
      }
      setRoom(code);
    }
  }, []);

  const createNewLobby = () => {
    socket.emit('new lobby', { lobby_code: room, maxUsers: users });
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
