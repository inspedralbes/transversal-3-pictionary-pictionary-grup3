import React, { useEffect, useState } from "react";
import "../../style/style.css";

const CreateGame = ({ socket }) => {
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState(null);
  const [lobbies, setLobbies] = useState([]);

  useEffect(() => {
    codeGenerator();
    userGenerator();
  }, []);

  const userGenerator = () => {
    const randomUsers = Math.floor(Math.random() * (5 - 1 + 1) + 1);
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
    userGenerator();
    socket.emit("new lobby", {
      lobby_code: room,
      maxUsers: users,
      category: "Info",
    });
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
        <label>Here's the code to your lobby! Have FUN!</label>
        <p id="code">{room}</p>
        <button onClick={createNewLobby}>Create a new lobby</button>
        <hr></hr>
        <button onClick={getLobby}>Get Lobby</button>
        <hr></hr>
        <button onClick={showLobby}>Show Lobby</button>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center justify-center">
        {lobbies.map((lobby, index) => (
        <div className="h-36 w-full rounded-md pink-to-orange-gr p-1" key={index}>
          <div className="h-full w-full bg-gray-200 back">
            <div className="max-w-sm rounded overflow-hidden" key={index}>
              <div className="">
                <div className="font-bold text-gray-800 text-xl">{lobby.lobby_code}</div>
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
