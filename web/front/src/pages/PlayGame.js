import React, { useEffect, useState, useRef } from 'react';

const CreateGame = ({socket}) => {
  const canvasRef = useRef(null);
  const colorCanva = "black";
  const nameUser = "";

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
        var mousePos = getMousePos(canvas, event);
        isDrawing = true;
        socket.emit('draw', { x: mousePos.x, y: mousePos.y,  action:'i'});
        // data = {
        //   x:0,
        //   y:0,
        //   t: null,//como la accion es pintar, no necessito este.
        //   c: null,//como la accion es pintar, no necessito este.
        //   action:'p'// 'p' = pintar , 'b' = borrar, 'i' = inició de trazo, 't' = tamanyo de pinzel, 'c' = color
        // }
    });

    canvas.addEventListener('mousemove', function(event) {
        var mousePos = getMousePos(canvas, event);
        console.log(mousePos.x + ',' + mousePos.y);
        if (isDrawing) {
            socket.emit('draw', { x: mousePos.x, y: mousePos.y,  action:'p'});
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
      context.fillStyle = colorCanva;
      context.fill();
    }
  }, []);

  function wipe() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('draw', { x: null, y: null,  action:'b'});
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function userName(){
    nameUser = document.getElementById("nameUser");
  }

  return (
    <div>
      <label>Here's the code to your lobby! Have FUN!</label>
      <p id='code'>{room}</p>
      <button onClick={createNewLobby}>Create a new lobby</button>
      <label>Put your name on the cursor!</label>
      <input id = "nameUser"></input>
      <button onClick={userName}>Save It</button>
      <br></br>
      <button onClick={wipe}>Wipe</button>
      <canvas ref={canvasRef} width="900px" height="900px"></canvas>
    </div>
  );
};

export default CreateGame;
