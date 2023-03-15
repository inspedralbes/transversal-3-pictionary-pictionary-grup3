import React, { useEffect, useState, useRef } from 'react';

const CreateGame = ({ socket }) => {
  const canvasRef = useRef(null);
  let colorCanva = 'black';
  let brushSize = 3;
  let lastX = 0;
  let lastY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let isDrawing = false;

    canvas.addEventListener('mousedown', function (event) {
      var mousePos = getMousePos(canvas, event);
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
      socket.emit('draw', { x: mousePos.x, y: mousePos.y, b: brushSize, c: colorCanva, action: 'i' });
      // data = {
      //   x:0,
      //   y:0,
      //   t: null,//como la accion es pintar, no necessito este.
      //   c: null,//como la accion es pintar, no necessito este.
      //   action:'p'// 'p' = pintar , 'b' = borrar, 'i' = inició de trazo, 't' = tamanyo de pinzel, 'c' = color
      // }
    });

    canvas.addEventListener('mousemove', function (event) {
      var mousePos = getMousePos(canvas, event);
      if (isDrawing) {
        socket.emit('draw', { x: mousePos.x, y: mousePos.y, b: brushSize, c: colorCanva, action: 'p' });
      }

   
    });

    canvas.addEventListener('mouseup', function (event) {
      isDrawing = false;
    });

    canvas.addEventListener('mouseout', function (event) {
      isDrawing = false;
    });

    function draw(x, y, b, c) {
      context.beginPath();
      context.moveTo(lastX, lastY);
      lastX = x;
      lastY = y;
      context.lineTo(x, y);
      context.strokeStyle = c;
      context.lineWidth = b;
      context.lineCap = 'round';
      context.fill();
      context.stroke();
      context.beginPath();
    }

    socket.on('draw', function (data) {
      if (data.data.action == 'b') {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        draw(data.data.x, data.data.y, data.data.b, data.data.c);
      }
    });
  }, []);

  function wipe() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('draw', { x: null, y: null, action: 'b' });
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  function changeColor() {
    colorCanva = document.getElementById('colorPicker').value;
  }

  function changeBrush() {
    brushSize = document.getElementById('brushSize').value;
    document.getElementById('brushText').innerHTML = 'Brush Size: ' + brushSize;
  }

  return (
    <div>
      <input onChange={changeColor} type='color' id='colorPicker' />

      <input
        onClick={changeBrush}
        type='range'
        min='1'
        max='20'
        id='brushSize'
      />
      <label id='brushText'>Brush Size: {brushSize} </label>
      <button onClick={wipe}>Wipe</button>
      <canvas ref={canvasRef} width='900px' height='900px'></canvas>
    </div>
  );
};

export default CreateGame;
