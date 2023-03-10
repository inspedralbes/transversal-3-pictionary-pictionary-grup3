import "../../style/style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Link } from 'react-router-dom';

const JoinGame = ({ socket }) => {
  const [nameUser, setNameUser] = useState("");
  const [lobbyCode, setLobbyCode] = useState("");

  const handleChangeLobbyCode = (e) => {
    setLobbyCode(e.target.value);
  };

  const handleChangeUserName = (e) => {
    setNameUser(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ lobby_code: lobbyCode, name: nameUser });
    socket.emit("join room", {
      name: nameUser,
      userId: uuidv4(),
      lobby_code: lobbyCode,
    });
  };

  return (
    <div className="h-screen flex bg-[url('../style/webBackground.png')] bg-cover items-center">
      <div className="m-[auto] border-2 w-112 ">
        <form onSubmit={handleSubmit}>
          <label>
            Enter lobby code
            <input
              type="text"
              value={lobbyCode}
              onChange={handleChangeLobbyCode}></input>
          </label>
          <label>
            Enter your name
            <input
              type="text"
              value={nameUser}
              onChange={handleChangeUserName}
            ></input>
          </label>
          <Link to="/playGame" type="submit" className="default-button">
            Send
          </button>
          <Link to="/playGame">Play Game</Link>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
