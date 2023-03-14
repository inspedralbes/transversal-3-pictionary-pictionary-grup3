import React, { useEffect, useState, useRef } from 'react';
import logo from '../style/logoPictoboom small.png'
import '../style/style.css';
import { Link } from 'react-router-dom';

const CreateGame = ({ socket }) => {
  const canvasRef = useRef(null);
  let colorCanva = "black";
  let brushSize = 3;
  let nameUser = "";
  let lastX = 0;
  let lastY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let isDrawing = false;

    socket.on('drawings', function (data) {
      data.forEach(function (drawing) {
        draw(drawing.x, drawing.y);
      });
    });

    canvas.addEventListener('mousedown', function (event) {
      var mousePos = getMousePos(canvas, event);
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
      socket.emit('draw', { x: mousePos.x, y: mousePos.y, action: 'i' });
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
      console.log(lastX, lastY);
      if (isDrawing) {
        socket.emit('draw', { x: mousePos.x, y: mousePos.y, action: 'p' });
      }
    });

    canvas.addEventListener('mouseup', function (event) {
      isDrawing = false;
    });

    canvas.addEventListener('mouseout', function (event) {
      isDrawing = false;
    });

    socket.on('draw', function (data) {
      draw(data.data.x, data.data.y);
    });

    function draw(x, y) {
      context.beginPath();
        context.moveTo(lastX, lastY);
        lastX = x;
        lastY = y;
        context.lineTo(x, y);
        context.strokeStyle = colorCanva;
        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.fill();
        context.stroke();
      context.beginPath();
    }
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
      y: evt.clientY - rect.top
    };
  }

  function userName() {
    nameUser = document.getElementById("nameUser").value;
  }

  function changeColor() {
    colorCanva = document.getElementById("colorPicker").value;
  }

  function changeBrush() {
    brushSize = document.getElementById("brushSize").value;
    document.getElementById("brushText").innerHTML = "Brush Size: " + brushSize ;
  }

  return (
    <div>
      {/* <label>Enter your name please!</label>
      <input type="text" id="nameUser" />
      <button onClick={userName}>Submit</button>
      <input onChange={changeColor} type="color" id="colorPicker"/>

      <input onClick = {changeBrush} type="range" min="1" max="20" id="brushSize"/>
      <label id="brushText">Brush Size: {brushSize} </label>
      <button onClick={wipe}>Wipe</button> */}
        
        <div className='flex h-50 py-5 px-4 border-4 border-rose-300 bg-rose-100 shadow-2xl lg:h-1/3 lg:w-1/2 lg:mt-20 lg:py-12 lg:px-8 m-[auto]'>
            <label>
                <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                    Choose your colors   
                    <button 
                        onClick={wipe}
                        className="mt-6 ml-12 absolute rounded p-3 text-white bg-rose-500"
                    >
                        Wipe
                    </button>
                </h2>
                <input 
                    onChange={changeColor}
                    className='mt-5'
                    type="color" 
                    id="colorPicker"
                />
                <input 
                    onClick = {changeBrush} 
                    type="range" 
                    min="1" 
                    max="20"
                    id="brushSize"
                />
                <label className='block' id="brushText">
                    <p className='font-medium'>
                        Brush Size: {brushSize}
                    </p>
                </label>
            </label>

      
        </div>

        <canvas 
            ref={canvasRef} 
            className="w-screen h-screen border-2 bg-gray-100" 
            // style={{backgroundColor:"green"}}
        >
        </canvas>
    </div>
  );
};

export default CreateGame;
