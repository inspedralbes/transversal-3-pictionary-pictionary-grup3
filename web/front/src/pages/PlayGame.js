import React, { useEffect, useState, useRef } from 'react';
import logo from '../style/logoPictoboom small.png'
import '../style/style.css';
import { Link } from 'react-router-dom';

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

    socket.emit("get user list", {});

    socket.on("lobby user list", function (users) {
      console.log(users);
    });

    var tiempoRestante = 100;

    function actualizarContador() {
      document.getElementById("contador").innerHTML = tiempoRestante;
      tiempoRestante--;

      if (tiempoRestante < 0) {
        clearInterval(intervalID);
        alert("¡Tiempo terminado!");
      }
    }

    var intervalID = setInterval(actualizarContador, 1000);

    canvas.addEventListener('mousedown', function (event) {
      var mousePos = getMousePos(canvas, event);
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
      socket.emit('draw', { x: mousePos.x, y: mousePos.y, b: brushSize, c: colorCanva, action: 'i' });
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
        <div className="flex bg-cover bg-center lg:bg-fixed bg-[url('../style/webBackground.png')]">
            <div className="relative w-full max-w-screen-lg mx-auto">
                <div className="absolute inset-0 z-[-1] bg-cover bg-center" style={{ backgroundImage: "url('../style/spinning-bg-pinchitos.png')" }}></div>
                <div className="px-4 py-12 mt-10 mx-auto max-w-xl border-4 border-rose-300 bg-rose-100 shadow-2xl rounded-lg">
                    <div className="flex items-center justify-center mb-6">
                        <div id="contador" className="w-16 h-16 mb-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg"></div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Choose your colors   
                        <button 
                            onClick={wipe} 
                            className="ml-4 px-3 py-1 rounded text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                            Wipe
                        </button>
                    </h2>
                    <div className="flex items-center mb-4">
                        <label htmlFor="colorPicker" className="mr-4">Color:</label>
                        <input 
                            onChange={changeColor} 
                            type="color" 
                            id="colorPicker" 
                            className="h-8 w-8" 
                        />
                    </div>
                    <div className="flex items-center mb-6">
                        <label htmlFor="brushSize" className="mr-4">Brush Size:</label>
                        <input 
                            onChange={changeBrush} 
                            type="range"
                            min="1" max="20" 
                            id="brushSize" 
                            className="h-4 w-48"
                        />
                        <span className="ml-4 text-gray-700">{brushSize}</span>
                    </div>
                </div>
                <div className="mt-12 mx-auto max-w-xl">
                    <div id="canvas" className="flex items-center justify-center">
                        <canvas 
                            ref={canvasRef} 
                            width="750px" height="600px" 
                            className="bg-white border-4 border-rose-300">
                        </canvas>
                    </div>
                </div>
            </div>

            {/* CHAT */}
            <div className="absolute">
                <div id="chat" className="content-end mt-12 m-[auto]">
                    <div className="h-64 overflow-y-scroll border-4 border-rose-300 bg-white p-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-end">
                                <span className="bg-rose-300 text-white rounded-lg px-4 py-2 max-w-xs">
                                    Hola, ¿cómo estás?
                                </span>
                                <span class="text-sm text-gray-500 mt-2">Hace 2 minutos</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="bg-gray-200 rounded-lg px-4 py-2 max-w-xs">
                                    Estoy bien, ¿y tú?
                                </span>
                                <span className="text-sm text-gray-500 mt-2">Hace 1 minuto</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <input type="text" placeholder="Escribe un mensaje" className="border-2 border-gray-300 p-2 flex-1"/>
                        <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CreateGame;
