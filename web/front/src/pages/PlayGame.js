import React, { useEffect, useState, useRef } from 'react';
import '../style/style.css';
import { useSelector } from 'react-redux';

export const PlayGame = ({ socket }) => {
  const stateUserData = useSelector((state) => state.dataUser.dataUser);
  const [painter, setPainter] = useState(false);
  const [word, setWord] = useState('');
  const [wordInserted, setWordInserted] = useState('');
  const [round, setRound] = useState(0);
  const [timer, setTimer] = useState(60);

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
  });

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
  <div className="h-screen flex bg-[url('../style/spinning-bg-pinchitos.png')] bg-cover bg-center items-center lg:bg-[url('../style/webBackground.png')]">
    <div className="w-screen flex items-center justify-center">
      <div className='w-fit'>
        <div className="flex items-center">
          <div>
            <div>
              Timer: {timer}
              Round: {round} / 3
              {painter ? (
                word
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    <label>Introduce word</label>{' '}
                    <input
                      name='word'
                      type='text'
                      value={wordInserted}
                      onChange={(e) => setWordInserted(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                  </form>
                </>
              )}
            </div>
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
)};
