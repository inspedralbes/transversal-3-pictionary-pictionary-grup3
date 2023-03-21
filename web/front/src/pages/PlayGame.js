import React, { useEffect, useState, useRef } from "react";
import "../style/style.css";
import { useSelector } from "react-redux";

export const PlayGame = ({ socket }) => {
  const stateUserData = useSelector((state) => state.dataUser.dataUser);
  const [painter, setPainter] = useState(false);
  const [wordCorrect, setWordCorrect] = useState(false);
  const [word, setWord] = useState("");
  const [wordInserted, setWordInserted] = useState("");
  const [round, setRound] = useState(0);
  const [timer, setTimer] = useState(60);
  const [userWords, setUserWords] = useState([]);
  const [userCorrectWords, setUserCorrectWords] = useState([]);

  const nameUser = stateUserData;
  const canvasRef = useRef(null);
  let colorCanva = "black";
  let brushSize = 3;
  let lastX = 0;
  let lastY = 0;
  let canvas;
  let context;
  let brushSize;
  let colorCanva = 'black';
  let isDrawing = false;
  let painterAux = false;

  useEffect(() => {
    socket.emit("ready user");
    socket.on("start game", (data) => {
      if (data.lobby.painter === nameUser) {
        setPainter(true);
        painterAux = true;
      } else {
        setPainter(false);
        painterAux = false;
      }
      setWord(data.lobby.word);
      setRound(data.lobby.round);
      setTime(data.lobby.time);
    });
  }, []);

  function setTime(time) {
    const interval = setInterval(() => {
      setTimer(time);
      if (time <= 0) {
        console.log('ha terminado el tiempo');
        clearInterval(interval);
        // socket.emit('call next turn');
      }
      time--;
    }, 1000);


  };

  socket.on('next round', function (data) {
    console.log('next round', data);
  });

  useEffect(() => {
    socket.on("word inserted", (data) => {
      setUserWords(data);
    });

    socket.on("correct word", (data) => {
      setUserCorrectWords(data.lobby.users);
    });

    socket.on('call next turn', () => {
      socket.emit('next turn')
    })

    socket.on('next turn', (data) => {
      console.log(data)
      if (data.lobby.painter === nameUser) {
        setPainter(true);
        painterAux = true;
      } else {
        setPainter(false);
        painterAux = false;
      }
      setWord(data.lobby.word);
      setRound(data.lobby.round);
    })
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word === wordInserted) {
      setWordCorrect(true);
    }
    socket.emit("word inserted", {
      word: wordInserted,
      time: timer,
    });
    setWordInserted("");
  };

  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
  });

  useEffect(() => {
    canvas.addEventListener("mousedown", function (event) {
      if (painterAux) {
        var mousePos = getMousePos(canvas, event);
        isDrawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY];
        brushSize = document.getElementById('brushSize').value;
        colorCanva = document.getElementById('colorPicker').value;
        socket.emit('draw', { x: mousePos.x, y: mousePos.y, b: brushSize, c: colorCanva, action: 'i' });
      }
    });

    canvas.addEventListener("mousemove", function (event) {
      if (painterAux) {
        var mousePos = getMousePos(canvas, event);
        if (isDrawing) {
          socket.emit("draw", {
            x: mousePos.x,
            y: mousePos.y,
            b: brushSize,
            c: colorCanva,
            action: "p",
          });
        }
      }
    });

    canvas.addEventListener("mouseup", function (event) {
      isDrawing = false;
    });

    canvas.addEventListener("mouseout", function (event) {
      isDrawing = false;
    });

    function draw(x, y, b, c, action) {
      context.beginPath();

      if (action == "p") {
        context.moveTo(lastX, lastY);
        lastX = x;
        lastY = y;
        context.lineTo(x, y);
        context.strokeStyle = c;
        context.lineWidth = b;
        context.lineCap = 'round';
      } else {
        lastX = x;
        lastY = y;
        context.lineTo(x, y);
        context.strokeStyle = c;
        context.lineWidth = b;
        context.lineCap = 'round';
      }
      context.fill();
      context.stroke();
      context.beginPath();
    }

    socket.on("draw", function (data) {
      if (data.data.action == "b") {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        draw(data.data.x, data.data.y, data.data.b, data.data.c, data.data.action);
      }
    });
  }, [brushSize]);

  function wipe() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("draw", { x: null, y: null, action: "b" });
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  return (
    <div className="flex bg-cover bg-center lg:bg-fixed bg-[url('../style/webBackground.png')]">
      <div className="relative w-full max-w-screen-lg mx-auto">
        {/* <!-- Lista de jugadores --> */}
        <div class="w-64 bg-white border-4 border-rose-300 shadow-2xl rounded-lg mr-5">
          <h3 class="text-lg font-bold mb-2 px-2 py-1 bg-rose-300 text-white rounded-t-lg">Jugadores</h3>
          <ul class="px-2 py-1">
            <li>Jugador 1</li>
            <li>Jugador 2</li>
            <li>Jugador 3</li>
          </ul>
        </div>
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center"
          style={{
            backgroundImage: "url('../style/spinning-bg-pinchitos.png')",
          }}
        ></div>
        <div className="h-64 px-4 py-12 mt-10 mx-auto border-4 border-rose-300 bg-rose-100 shadow-2xl rounded-lg">
          <div className="flex items-center justify-center -mt-8">
            <div
              id="contador"
              className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg"
            >
              {timer}
            </div>
            {painter ? (
              <>
                <div className="absolute mt-44 ml-96 underline font-bold">
                  PALABRA:
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="absolute mt-44 ml-96 underline font-bold">
            Round: {round} / 3
          </div>
          {painter ? (
            <>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
                Choose your colors
                <button
                  onClick={wipe}
                  className="ml-4 px-3 py-1 rounded text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Wipe
                </button>
              </h2>
              <div className="flex items-center mb-4">
                <label htmlFor="colorPicker" className="mr-4">Color:</label>
                <input type='color' id='colorPicker' className="h-8 w-8" defaultValue="#000000" />
              </div>
              <div className="flex items-center mb-6">
                <label htmlFor="brushSize" className="mr-4">
                  Brush Size:
                </label>
                <input
                  type='range'
                  min='1'
                  max='30'
                  id='brushSize'
                  className="h-4 w-48"
                  defaultValue="3" />
              </div>
              {word}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-5 mb-5 flex">
          <div id="canvas" className="flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width="700px"
              height="600px"
              className="bg-white border-4 border-rose-300"
            ></canvas>
          </div>
          {/* CHAT */}
          <div id="chat" className="m-auto w-96 ml-5 -mt-0.5">
            <div className="h-96 overflow-y-scroll border-4 border-rose-300 bg-white p-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-end">
                  <ul>
                    {userWords.map((userWords, key) => (
                      <li key={key}>
                        <strong>{userWords.name}</strong>
                        {userWords.word}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {painter ? (
              <></>
            ) :
              wordCorrect ? (
                <div className="flex gap-4 mt-4">
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 flex-1"
                    name="word"
                    value={wordInserted}
                    onChange={(e) => setWordInserted(e.target.value)}
                  />
                </div>
              ) : (
                <div className="flex gap-4 mt-4">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Introduce Word"
                      className="border-2 border-gray-300 p-2 flex-1"
                      name="word"
                      value={wordInserted}
                      onChange={(e) => setWordInserted(e.target.value)}
                    />
                    <button
                      className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
