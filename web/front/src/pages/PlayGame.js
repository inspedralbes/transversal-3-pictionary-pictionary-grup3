import React, { useEffect, useState, useRef } from "react";
import "../style/style.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setScoreBoard } from "../features/scoreBoardSlice";

export const PlayGame = ({ socket }) => {
  const stateUserData = useSelector((state) => state.dataUser.dataUser);
  const [painter, setPainter] = useState(false);
  const [wordCorrect, setWordCorrect] = useState(false);
  const [word, setWord] = useState("");
  const [wordInserted, setWordInserted] = useState("");
  const [round, setRound] = useState(0);
  const [timer, setTimer] = useState(90);
  const [userWords, setUserWords] = useState([]);
  const [userCorrectWords, setUserCorrectWords] = useState([]);
  const [wordLength, setWordLength] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameUser = stateUserData;
  const canvasRef = useRef(null);
  let colorCanva;
  let brushSize;
  let lastX = 0;
  let lastY = 0;
  let canvas;
  let context;
  let isDrawing = false;
  let painterAux = false;

  useEffect(() => {
    console.log("asd");
    socket.emit("ready user");
    socket.on("start game", (data) => {
      console.log(data);
      if (data.lobby.painter === nameUser) {
        setPainter(true);
        painterAux = true;
      } else {
        setPainter(false);
        painterAux = false;
      }
      setWord(data.lobby.word);
      let str = "";
      for (let i = 0; i < data.lobby.word.length; i++) {
        str += "_ "
      }
      setWordLength(str);
      setRound(data.lobby.round);
      // setTime(data.lobby.time);
    });
  }, [socket]);

  // function setTime(time) {
  //   const interval = setInterval(() => {
  //     setTimer((time) => time - 1);
  //     if (time === 0) {
  //       clearInterval(interval);
  //       console.log('ha terminado el tiempo');
  //       // socket.emit('call next turn');
  //     }
  //   }, 1000);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(interval);
      console.log("ha terminado el tiempo");
    }
    return () => clearInterval(interval);
  }, [timer]);

  socket.on("next round", function (data) {
    console.log("next round", data);
  });

  useEffect(() => {
    socket.on("word inserted", (data) => {
      setUserWords(data);
    });

    socket.on("correct word", (data) => {
      setUserCorrectWords(data.lobby.users);
    });

    socket.on("next turn", (data) => {
      console.log(data);
      if (data.lobby.painter === nameUser) {
        setPainter(true);
        painterAux = true;
      } else {
        setPainter(false);
        painterAux = false;
      }
      setWord(data.lobby.word);
      let str = "";
      for (let i = 0; i < data.lobby.word.length; i++) {
        str += "_ "
      }
      setWordLength(str);
      setRound(data.lobby.round);
      setTimer(90);
      setWordCorrect(false);
      wipe();
    });

    socket.on("finished game", (data) => {
      dispatch(setScoreBoard(data));
      navigate("../rankingGame");
    });
  });

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
        brushSize = document.getElementById("brushSize").value;
        colorCanva = document.getElementById("colorPicker").value;
        [lastX, lastY] = [event.offsetX, event.offsetY];
        socket.emit("draw", {
          x: mousePos.x,
          y: mousePos.y,
          b: brushSize,
          c: colorCanva,
          action: "i",
        });
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
        context.lineCap = "round";
      } else {
        lastX = x;
        lastY = y;
        context.lineTo(x, y);
        context.strokeStyle = c;
        context.lineWidth = b;
        context.lineCap = "round";
      }
      context.fill();
      context.stroke();
      context.beginPath();
    }

    socket.on("draw", function (data) {
      if (data.data.action == "b") {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        draw(
          data.data.x,
          data.data.y,
          data.data.b,
          data.data.c,
          data.data.action
        );
      }
    });
  }, []);

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
    <div className="flex -ml-72 bg-cover bg-center h-screen lg:bg-fixed bg-[url('../style/webBackground.png')]">
      <div className="relative w-full max-w-screen-lg mx-auto">
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center"
          style={{
            backgroundImage: "url('../style/spinning-bg-pinchitos.png')",
          }}
        ></div>
        <div className="flex mt-10 ">
          <div class="-ml-5 h-44 w-96 absolute mx-4 shadow-2xl rounded-lg">
            <div className="w-96 h-full -ml-0.5 mb-5 bg-white border-4 border-rose-500 rounded-lg">
              <h3 class="text-lg text-center font-bold mb-2 px-2 py-1 bg-rose-300 text-white border-4 border-rose-300 ">
                Players
              </h3>
              <div className="grid gap-4 grid-cols-3 grid-rows-3 ml-5 mt-5">
                {userCorrectWords.map((userCorrectWords, key) => (
                  <div key={key}>
                    <span className="px-2 py-1 bg-white border-2 border-rose-500 rounded-full font-semibold text-rose-500">
                      <strong>{userCorrectWords.name}</strong>:{" "}
                      {userCorrectWords.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {painter ? (
              // COLORES
              <div
                id="colores"
                className="w-96 -ml-0.5 p-3 bg-white border-4 border-rose-500 "
              >
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
                  <label
                    htmlFor="colorPicker"
                    className="mr-4 bg-white border-2 border-rose-500 px-2 py-1 rounded-full font-semibold text-rose-500"
                  >
                    Color
                  </label>
                  <input
                    type="color"
                    id="colorPicker"
                    className="h-8 w-8"
                    defaultValue="#000000"
                  />
                </div>
                <div className="flex items-center mb-6">
                  <label
                    htmlFor="brushSize"
                    className="mr-4 bg-white border-2 border-rose-500 px-2 py-1 rounded-full font-semibold text-rose-500"
                  >
                    Brush Size
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    id="brushSize"
                    className="h-4 w-48"
                    defaultValue="3"
                  />
                  <span className="ml-4 text-gray-700">{brushSize}</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="h-36 w-4/6 ml-96 px-4 py-12 mx-auto border-4 border-rose-500 bg-rose-100 shadow-2xl rounded-lg">
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-lg">
                {timer}
              </div>
              {painter ? (
                <div className="ml-8">
                  <h1 className="uppercase -mt-16 font-bold text-xl">{word}</h1>
                </div>
              ) : (
                <div className="ml-8">
                  <h2 className="uppercase -mt-16 font-bold text-xl">{wordLength}</h2>
                </div>
              )}
              <div className="font-bold text-xl">ROUND: {round} / 3</div>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-5 flex">
          {/* CANVAS */}
          <div id="canvas" className="flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width="633px"
              height="600px"
              className="ml-96 mx-auto bg-white border-4 border-rose-500"
            ></canvas>
          </div>

          {/* CHAT */}
          <br></br>
          <div className="ml-5 -mt-40">
            <div className="w-64 h-96 overflow-y-scroll border-4 border-rose-500 rounded-lg bg-white p-4">
              <ul className="flex flex-col items-center justify-start">
                {userWords.map((userWords, key) => (
                  <li
                    key={key}
                    className={`rounded-lg p-2 mb-3 ml-auto bg-gray-200 text-black mr-auto'}`}
                  >
                    <span className="inline-block bg-white border-2 border-rose-500 px-2 py-1 rounded-full font-semibold text-rose-500">
                      {userWords.name}
                    </span>
                    <span className="mx-2">{userWords.word}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 mt-2">
              {painter ? (
                <></>
              ) : wordCorrect ? (
                <input
                  name="word"
                  type="text"
                  value={wordInserted}
                  onChange={(e) => setWordInserted(e.target.value)}
                  className="w-64 border-2 border-gray-300 p-2 flex-1"
                  placeholder="Type the word"
                />
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    name="word"
                    type="text"
                    value={wordInserted}
                    onChange={(e) => setWordInserted(e.target.value)}
                    className="inline w-40 border-2 border-gray-300 p-2 flex-1"
                    placeholder="Type the word"
                  />
                  <button
                    type="submit"
                    className="bg-rose-500 text-white ml-1 px-5 py-2 rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    Enviar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
