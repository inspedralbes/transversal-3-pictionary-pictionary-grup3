import React, { useEffect, useState, useRef } from 'react';

const CreateGame = ({socket}) => {
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
        socket.emit('draw', { x: event.clientX, y: event.clientY,  action:'i'});
        // data = {
        //   x:0,
        //   y:0,
        //   t: null,//como la accion es pintar, no necessito este.
        //   c: null,//como la accion es pintar, no necessito este.
        //   action:'p'// 'p' = pintar , 'b' = borrar, 'i' = inició de trazo, 't' = tamanyo de pinzel, 'c' = color
        // }
    });

    canvas.addEventListener('mousemove', function(event) {
        if (isDrawing) {
            socket.emit('draw', { x: event.clientX, y: event.clientY,  action:'p'});
        }
    });

    canvas.addEventListener('mouseup', function(event) {
        isDrawing = false;
    });

    socket.on('draw', function(data) {
        draw(data.x, data.y);
    });

    
    function draw(x, y) {
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fillStyle = 'black';
      context.fill();
    }
  }, []);

  function wipe() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('draw', { x: null, y: null,  action:'b'});
  }

  return (
    <div>
      <button onClick={wipe}>Wipe</button>
      <canvas ref={canvasRef} width="900px" height="900px"></canvas>
    </div>
  );
};

export default CreateGame;
