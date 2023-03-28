import React, { useEffect, useState, useRef } from "react";
import "../style/style.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setScoreBoard } from "../features/scoreBoardSlice";
import Swal from "sweetalert2";

export const PlayGame = ({ socket }) => {
  const stateUserData = useSelector((state) => state.dataUser.dataUser);
  const [painter, setPainter] = useState(false);
  const [whoPaint, setWhoPaint] = useState(false);
  const [wordCorrect, setWordCorrect] = useState(false);
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const [wordInserted, setWordInserted] = useState("");
  const [round, setRound] = useState(0);
  const [userWords, setUserWords] = useState([]);
  const [userCorrectWords, setUserCorrectWords] = useState([]);
  const [wordLength, setWordLength] = useState("");
  const [showWord, setShowWord] = useState(true);

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
  let timer = 90;

  socket.on("timer", (data) => {
    timer = data
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        timer--;
      }
      document.getElementById('timer').innerHTML = timer;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
  });

  useEffect(() => {
    socket.emit("ready user");
    socket.on("start game", (data) => {
      if (data.lobby.painter === nameUser) {
        setPainter(true);
        painterAux = true;
        canvas.classList.add("pincel");
      } else {
        setPainter(false);
        painterAux = false;
        canvas.classList.remove("pincel");
      }
      setWord(data.lobby.word);
      setDescription(data.lobby.words[data.lobby.totalTurns - 1].description);
      let str = "";
      for (let i = 0; i < data.lobby.word.length; i++) {
        str += "_ ";
      }
      setWhoPaint(data.lobby.painter);
      setWordLength(str);
      setRound(data.lobby.round);
      setUserCorrectWords(data.lobby.users);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("word inserted", (data) => {
      setUserWords(data);
    });

    socket.on("correct word", (data) => {
      setUserCorrectWords(data.lobby.users);
    });

    socket.on("next turn", (data) => {
      if (data.lobby.painter === nameUser) {
        setPainter(true);
        painterAux = true;
        canvas.classList.add("pincel");
      } else {
        setPainter(false);
        painterAux = false;
        canvas.classList.remove("pincel");
      }
      countdown();
      setWord(data.lobby.word);
      setDescription(data.lobby.words[data.lobby.totalTurns - 1].description);
      setShowWord(true);
      let str = "";
      for (let i = 0; i < data.lobby.word.length; i++) {
        str += "_ ";
      }
      setWhoPaint(data.lobby.painter);
      setWordLength(str);
      setRound(data.lobby.round);
      setWordCorrect(false);
      wipe();
    });

    function countdown() {
      console.log("SEXOOOOO");
      const modal = document.getElementById("modal");
      const countdown = document.getElementById("countdown");

      let count = 3;

      modal.style.display = "block";
      let countdownInterval = setInterval(function () {
        count--;
        countdown.textContent = count;
        if (count === 0) {
          clearInterval(countdownInterval);
          modal.style.display = "none";
          count = 3;
          countdown.textContent = count;
        }
      }, 1000);
    }

    socket.on("finished game", (data) => {
      dispatch(setScoreBoard(data));
      navigate("../rankingGame");
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wordInserted !== "") {
      if (word === wordInserted.toLowerCase()) {
        setWordCorrect(true);
        Swal.fire({
          position: "bottom-end",
          icon: "correct",
          title: "Answered Correctly!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      socket.emit("word inserted", {
        word: wordInserted.toLowerCase(),
        time: timer,
      });
      setWordInserted("");
    }
  };

  const handleClick = () => {
    if (showWord) setShowWord(false);
    else setShowWord(true);
  };

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
        canvas.style.backgroundColor = "#ffffff";
      } else if (data.data.action == "z") {
        canvas.style.backgroundColor = data.data.c;
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
    canvas.style.backgroundColor = "#ffffff";
    socket.emit("draw", { x: null, y: null, action: "b" });
  }

  const changeBackground = () => {
    colorCanva = document.getElementById("colorPicker").value;
    canvas.style.backgroundColor = colorCanva;

    socket.emit("draw", { x: null, y: null, action: "z", c: colorCanva });
  };

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="block md:flex w-fit h-screen md:h-fit mx-auto">
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center"
          style={{
            backgroundImage: "url('../style/spinning-bg-pinchitos.png')",
          }}
        ></div>
        <div className="h-[13%] md:h-fit w-[100%] md:w-[380px] md:mr-5">
          <div className="h-[100%] w-[45%] md:w-[100%] md:h-fit md:shadow-2xl md:rounded-lg float-left">
            <div className="h-[100%] md:h-fit bg-white border-4 border-rose-500 md:rounded-lg overflow-y-scroll md:overflow-hidden">
              <h3 className="text-lg text-center font-bold mb-2 px-2 py-1 bg-rose-300 text-white border-4 border-rose-300 ">
                Players
              </h3>
              <div className="ml-2 md:ml-5 md:mt-5">
                {userCorrectWords.map((userCorrectWords, key) => (
                  <div key={key}>
                    <div className="inline-block px-2 py-1 mb-3 bg-white border-2 border-rose-500 rounded-full font-semibold text-rose-500">
                      <strong>{userCorrectWords.name}</strong>:
                      {userCorrectWords.score}
                      {userCorrectWords.name === whoPaint && "🖌️"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {painter ? (
            // COLORES
            <div
              id="colores"
              className="w-[55%] md:w-[100%] h-[100%] md:h-fit p-3 bg-white border-4 border-rose-500 md:mt-5 float-right overflow-y-scroll"
            >
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
                Painter Tools
                <button
                  onClick={wipe}
                  className="md:ml-4 px-1 py-1 rounded text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>

                </button>
                <button
                  onClick={changeBackground}
                  className="ml-4 px-1 py-1 rounded text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.00914 17.9998L2.99914 13.9898C1.65914 12.6498 1.65914 11.3198 2.99914 9.9798L9.67914 3.2998L17.0291 10.6498C17.3991 11.0198 17.3991 11.6198 17.0291 11.9898L11.0091 18.0098C9.68914 19.3298 8.34914 19.3298 7.00914 17.9998Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.34961 1.9502L9.68961 3.29016" stroke="#ffffff" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M2.07031 11.9197L17.1903 11.2598" stroke="#ffffff" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 22H16" stroke="#ffffff" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z" stroke="#ffffff" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
        <div className="w-screen md:w-fit h-[87%] md:h-fit">
          <div className="overflow-y-scroll md:overflow-hidden h-[15%] md:h-36 w-[100%] p-2 md:px-4 md:py-12 mx-auto border-4 border-rose-500 bg-rose-100 md:shadow-2xl md:rounded-lg">
            <div className="flex items-center justify-between ">
              <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-lg">
                <div id="timer"></div>
              </div>
              {painter ? (
                <div className="ml-8 flex items-start">
                  {showWord ? (
                    <h1 className="uppercase md:-mt-16 font-bold text-xl">
                      {word}
                    </h1>
                  ) : (
                    <h1 className="uppercase md:-mt-16 font-bold text-xl">
                      {wordLength}
                    </h1>
                  )}
                  <button onClick={handleClick} className="md:-mt-16 ml-3">
                    👁️
                  </button>
                </div>
              ) : (
                <div className="ml-8">
                  <h2 className="uppercase md:-mt-16 font-bold text-xl">
                    {wordLength}
                  </h2>
                </div>
              )}
              <div className="font-bold text-xl">ROUND: {round} / 3</div>
            </div>
            {painter && showWord && (
              <p className="flex justify-center opacity-50">{description}</p>
            )}
          </div>
          <div className="block md:flex md:mt-5 h-[85%] md:h-fit">
            {/* CANVAS */}
            <div id="canvas" className="flex items-center justify-center h-[70%] md:h-fit">
              <canvas
                ref={canvasRef}
                width="633px"
                height="600px"
                className="mx-auto bg-white border-4 border-rose-500 w-[100%] md:w-[633px] h-[100%] md:h-[600px]"
              ></canvas>
            </div>

            {/* CHAT */}
            <div className="md:ml-5 h-[30%] md:h-fit">
              <div className="w-[100%] md:w-64 h-[65%] md:h-[550px] overflow-y-scroll border-4 border-rose-500 md:rounded-lg bg-white p-4">
                <ul className="flex flex-col items-center justify-start">
                  {userWords.map((userWords, key) => (
                    <li
                      key={key}
                      className={`md:rounded-lg p-2 mb-3 ml-auto bg-gray-200 text-black mr-auto'}`}
                    >
                      <span className="inline-block bg-white border-2 border-rose-500 px-2 py-1 rounded-full font-semibold text-rose-500">
                        {userWords.name}
                      </span>
                      <span className="mx-2">{userWords.word}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center gap-4 md:mt-2 h-[35%] md:h-fit">
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
                    autoComplete="off"
                  />
                ) : (
                  <form onSubmit={handleSubmit} className="flex justify-center items-center h-[35%] md:h-fit">
                    <input
                      name="word"
                      type="text"
                      value={wordInserted}
                      onChange={(e) => setWordInserted(e.target.value)}
                      className="inline w-40 border-2 border-gray-300 px-1 md:p-2 flex-1"
                      placeholder="Type the word"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      className="bg-rose-500 text-white ml-1 px-1 md:px-5 md:py-2 md:rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
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
      <div id="modal" className="hidden fixed z-1 top-0 left-0 w-screen h-screen overflow-auto bg-slate-700 bg-opacity-20">
        <div className="bg-white mx-[auto] mt-10 p-10 w-[180px] text-center rounded-lg">
          <div id="countdown" className="text-[48px]">3</div>
          <div className="text-center">NEXT TURN</div>
        </div>
      </div>
    </div>
  );
};
