import React, { useEffect, useState, useRef } from 'react';
import '../style/style.css';
import { useSelector } from 'react-redux';

export const PlayGame = ({ socket }) => {
  const stateUserData = useSelector((state) => state.dataUser.dataUser);
  const [painter, setPainter] = useState(false);
  const [word, setWord] = useState('');
  const [wordInserted, setWordInserted] = useState('');
  const [round, setRound] = useState(0);
  const [timer, setTimer] = useState(90);

  const nameUser = stateUserData;
  const canvasRef = useRef(null);
  let colorCanva = 'black';
  let brushSize = 3;
  let lastX = 0;
  let lastY = 0;
  let canvas;
  let context;
  let isDrawing = false;
  let painterAux = false;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(interval);
      console.log('ha terminado el tiempo');
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    socket.emit('ready user');
    socket.on('start game', (data) => {
      if (data.lobby.painter === nameUser) {
        setPainter(true);
        painterAux = true;
      } else {
        setPainter(false)
        painterAux = false;
      }
      setWord(data.lobby.word);
      setRound(data.lobby.round);
    });
  }, [nameUser, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word === wordInserted) {
      socket.emit('word correct', {
        time: 60 - timer,
        word: wordInserted,
        round: round,
        painter: painter,
        userName: nameUser,
      });
    } else {
      socket.emit('word inserted', {
        word: wordInserted,
        round: round,
        painter: painter,
        userName: nameUser,
      });
    }
    setWordInserted('');
  };

  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext('2d');

  });

  useEffect(() => {
    canvas.addEventListener('mousedown', function (event) {
      if (painterAux) {
        var mousePos = getMousePos(canvas, event);
        isDrawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY];
        socket.emit('draw', { x: mousePos.x, y: mousePos.y, b: brushSize, c: colorCanva, action: 'i' });
      }
    });

    canvas.addEventListener('mousemove', function (event) {
      if (painterAux) {
        var mousePos = getMousePos(canvas, event);
        if (isDrawing) {
          socket.emit('draw', { x: mousePos.x, y: mousePos.y, b: brushSize, c: colorCanva, action: 'p' });
        }
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
    <div className="flex -ml-72 bg-cover bg-center lg:bg-fixed bg-[url('../style/webBackground.png')]">
      <div className="relative w-full max-w-screen-lg mx-auto">
        <div className="absolute inset-0 z-[-1] bg-cover bg-center" style={{
          backgroundImage: "url('../style/spinning-bg-pinchitos.png')"
        }}>
        </div>
        <div className='flex mt-10 '>
            <div class="-ml-5 h-44 w-96 absolute p-3 mx-4 bg-white border-4 border-rose-300 shadow-2xl rounded-lg">
                <div id='colores' className='w-full'>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Choose your colors
                        <button onClick={wipe}
                            className="ml-4 px-3 py-1 rounded text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                            Wipe
                        </button>
                    </h2>
                    <div className="flex items-center mb-4">
                        <label htmlFor="colorPicker" className="mr-4">Color:</label>
                        <input onChange={changeColor} type='color' id='colorPicker' className="h-8 w-8" />
                    </div>
                    <div className="flex items-center mb-6">
                        <label htmlFor="brushSize" className="mr-4">Brush Size:</label>
                        <input
                        onClick={changeBrush}
                        type='range'
                        min='1'
                        max='20'
                        id='brushSize'
                        className="h-4 w-48" />
                        <span className="ml-4 text-gray-700">{brushSize}</span>
                    </div>
                    {word}
                </div>
                {/* <!-- JUGADORES --> */}
                <br></br>
                <div className='w-96 h-full -mt-1 -ml-4 absolute bg-white border-4 border-rose-500 rounded-lg'>
                    <h3 class="text-lg text-center font-bold mb-2 px-2 py-1 bg-rose-300 text-white border-4 border-rose-300 ">Jugadores</h3>
                    <ul class="px-2 py-1">
                        <li>Jugador 1</li>
                        <li>Jugador 2</li>
                        <li>Jugador 3</li>
                    </ul>
                </div>
            </div>
            <div className="h-36 w-4/6 ml-96 px-4 py-12 mx-auto border-4 border-rose-300 bg-rose-100 shadow-2xl rounded-lg">
                <div className="flex items-center justify-center -mt-8">
                    <div id="contador"
                        className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg">
                    {timer}
                    </div>
                    <div className='absolute mt-28 '>
                        <h2 className='underline font-bold'>PALABRA</h2> 
                    </div>
                    <div className='absolute -mt-10 ml-96 underline font-bold'>
                        Round: {round} / 3
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5 mb-5 flex">
            <div id="canvas" className="flex items-center justify-center">
                <canvas ref={canvasRef} width="633px" height="600px" className="ml-96 mx-auto bg-white border-4 border-pink-500">
                </canvas>
            </div>
            {/* CHAT */}
            <div id="chat" className="m-auto w-96 h-40 ml-5 -mt-48">
              <div className="h-96 overflow-y-scroll border-4 border-pink-500 bg-white p-4">
              </div>
              <div className="flex gap-4 mt-2">
                <form onSubmit={handleSubmit}>
                    <input
                    name='word'
                    type='text'
                    value={wordInserted}
                    onChange={(e) => setWordInserted(e.target.value)}
                    className="border-2 border-gray-300 p-2 flex-1"
                    placeholder="Escribe un mensaje"
                    />
                    <button type='submit' className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">Enviar</button>
                </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
