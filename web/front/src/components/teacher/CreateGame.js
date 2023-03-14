import React, { useEffect, useState } from "react";
import "../../style/style.css";

const CreateGame = ({ socket }) => {
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState(5);
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    codeGenerator();
  }, []);

  const userGenerator = () => {
    const randomUsers = Math.floor(Math.random() * (5 - 4 + 4) + 4);
    setUsers(randomUsers);
  };

  const codeGenerator = () => {
    const randomCode = Math.floor(
      Math.random() * (100000 - 999999 + 1) + 999999
    );
    setRoom(randomCode);
  };

  const createNewLobby = () => {
    codeGenerator();
    socket.emit('new lobby', {
      lobby_code: room,
      maxUsers: users,
      category: "Info",
    });
    getLobby();
    showLobby();
  };

  const getLobby = () => {
    socket.emit("get lobbies", {});
    socket.on("lobbies list", function (data) {
      setLobbies(data);
    });
  };

  const showLobby = () => {
    console.log(lobbies);
  };

  return (
    <>
      <div>
        <label>Here's your lobbies! Have FUN!</label>
        <p id="code">{room}</p>
        <div className="grid grid-cols-3 gap-10">
          <button
            onClick={createNewLobby}
            className="default-button text-sm font-semibold text-gray-900 shadow-sm outline-orange-500 hover:outline-none hover:pink-to-orange-gr m-1"
          >
            Create a new lobby
          </button>
          {/* <button
            onClick={getLobby}
            className="default-button text-sm font-semibold text-gray-900 shadow-sm outline-orange-500 hover:outline-none hover:pink-to-orange-gr m-1"
          >
            Get Lobby
          </button>
          <button
            onClick={showLobby}
            className="default-button text-sm font-semibold text-gray-900 shadow-sm outline-orange-500 hover:outline-none hover:pink-to-orange-gr m-1"
          >
            Show Lobby
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 items-center justify-center p-8">
        {lobbies.map((lobby, index) => (
          <div
            className="h-36 w-80 rounded-md pink-to-orange-gr p-1"
            key={index}
          >
            <div className="h-full w-full bg-white back p-2">
              <div className="max-w-sm rounded overflow-hidden" key={index}>
                <div className="">
                  <div className="font-bold text-gray-800 text-xl">
                    {lobby.lobby_code}
                  </div>
                  <p className="text-gray-800 text-base">{lobby.category}</p>
                </div>
                <div className="">
                  {lobby.users.map((user, index) => (
                    <span className="users" key={index}>
                      {user.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div classNameName="lobby-list text-gray-100">
              {lobbies.map((lobby, index) => (
                <div classNameName="lobby" key={index}>
                  <h2>{lobby.lobby_code}</h2>
                  <p>{lobby.category}</p>
                  {lobby.users.map((user, index) => (
                    <span classNameName="users" key={index}>
                    USUARIO: {user.name}
                    </span>
                    ))}
                    <p>{lobby.maxUsers}</p>
                    </div>
                    ))}
                  </div> */}
    </>
  );
};

export default CreateGame;
