import React, { useEffect, useState, useRef } from 'react';
import logo from '../style/logoPictoboom small.png'
import '../style/style.css';
import { Link } from 'react-router-dom';

const CreateGame = ({ socket }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [nameUser, setNameUser] = useState(localStorage.getItem('userName'));
  // const [painter, setPainter] = useState(false);
  let painter = false;

  const canvasRef = useRef(null);
  let colorCanva = 'black';
  let brushSize = 3;
  let lastX = 0;
  let lastY = 0;
  let canvas;
  let context;
  let isDrawing;

  useEffect(() => {
    socket.emit("get user list", {});
    socket.on("lobby user list", function (data) {
      if(data.list[0].userId == userId) {
        painter = true;
      } 
    });

    canvas = canvasRef.current;
    context = canvas.getContext('2d');
    isDrawing = false;

    console.log("Eeeeee")

    return () => {
      socket.off("lobby user list");
    };
  }, []);


  useEffect(() => {
    // TIMER
    var tiempoRestante = 100;

    function actualizarContador() {
      document.getElementById("contador").innerHTML = tiempoRestante;
      tiempoRestante--;

      if (tiempoRestante < 0) {
        clearInterval(intervalID);
        // alert("¡Tiempo terminado!");
      }
    }

    var intervalID = setInterval(actualizarContador, 1000);
    // FI 

    canvas.addEventListener('mousedown', function (event) {
      if (painter) {
        var mousePos = getMousePos(canvas, event);
        isDrawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY];
        socket.emit('draw', { x: mousePos.x, y: mousePos.y, b: brushSize, c: colorCanva, action: 'i' });
      }
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
      console.log(b, c)
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
    <div className="h-screen flex bg-[url('../style/spinning-bg-pinchitos.png')] bg-cover bg-center items-center lg:bg-[url('../style/webBackground.png')]">
      <div className="w-screen flex items-center justify-center">
        <div className='w-fit'>
          <div className="flex items-center">
            <div>
              <div id="contador"></div>
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
              </div>
              <div>
                <canvas ref={canvasRef} width='600px' height='600px' className="bg-white"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
