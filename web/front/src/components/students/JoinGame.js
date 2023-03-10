import "../../style/style.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
      <div className="m-[auto] border-2 rounded-lg w-112 p-16 ">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={lobbyCode}
              onChange={handleChangeLobbyCode}
              className="input-join"
              placeholder="Lobby code"
            ></input>
          </label>
          <label>
            
            <input
              type="text"
              value={nameUser}
              onChange={handleChangeUserName}
              className="input-join"
              placeholder="Your name"
            ></input>
          </label>
          <button type="submit" className="font-semibold outline outline-1 p-1 rounded-lg hover:bg-gray-800 hover:text-gray-50 ">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
