import "../style/style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setUserData } from "../features/dataUserSlice";

import Swal from 'sweetalert2'

export const JoinGame = ({ socket }) => {
  const [nameUser, setNameUser] = useState("");
  const [lobbyCode, setLobbyCode] = useState("");
  const [inLobby, setInLobby] = useState(false);
  const [usersReady, setUsersReady] = useState([]);
  const [ready, setReady] = useState(false);
  const [currentPlayers, setCurrentPlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = null;
    if (nameUser !== "" && lobbyCode !== "") {
      socket.emit("join room", {
        name: nameUser,
        userId: uuidv4(),
        lobby_code: parseInt(lobbyCode),
      });
    } else {
      error = 'Fill the blanks'
    }

    socket.on('not joined', (dataError) => {
      error = dataError.errorMsg;
    });

    setTimeout(() => {
      if (error) {
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        dispatch(setUserData(nameUser));
        setInLobby(true);
      }
    }, 500);
  };

  const handleClickLeave = (e) => {
    e.preventDefault();
    socket.emit("leave lobby");
    setInLobby(false);
  };

  const handleClickReady = () => {
    socket.emit("ready user");
    setReady(true);

    if (ready) {
      setReady(false);
    }
  };

  useEffect(() => {
    socket.on("lobby user list", (data) => {
      const readyUsers = data.list.filter((user) => user.ready);
      const currentPlayers = data.list.length;
      const maxPlayers = data.maxUsers;
      setMaxPlayers(maxPlayers);
      setCurrentPlayers(currentPlayers);
      setUsersReady(readyUsers);
    });

    socket.on("start game", (data) => {
      navigate("/playGame");
    });
  });

  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      {!inLobby ? (
        <div className="m-[auto] border-2 rounded-lg w-80 p-16">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="number"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
                placeholder="Lobby code"
                className="input-join"
              ></input>
            </label>
            <label>
              <input
                type="text"
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
                placeholder="Your name"
                className="input-join"
              ></input>
            </label>
            <button
              type="submit"
              className="default-button font-semibold outline outline-1 p-1 rounded-lg hover:bg-gray-800 hover:text-gray-50"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="block w-full lg:h-full">
          <button onClick={handleClickLeave} className="default-button m-1 bg-gray-900 text-gray-100 hover:text-gray-900 hover:bg-transparent font-semibold h-fit lg:m-16">
            Leave lobby
          </button>
          <div className="flex m-[auto] ">
            <div className="flex flex-col m-[auto]">
              <h2 className="font-semibold text-5xl text-center mb-10">Welcome <p className="font-bold text-yellow-400 inline">{nameUser}</p>!<br></br>Are you ready?!</h2>
              {!ready ? (
                <button
                  onClick={handleClickReady}
                  className="default-button m-[auto]  text-red-700 font-extrabold bg-red-200 transition duration-100 hover:shadow-[0_20px_60px_-5px_rgba(0,0,0,0.7)] text-center w-60 h-16"
                >
                  NOT READY
                </button>
              ) : (
                <button
                  onClick={handleClickReady}
                  className="default-button m-[auto] text-green-900 font-extrabold bg-green-200 disabled:text-green-300 disabled:bg-gray-50 transition duration-100 text-center w-60 h-16"
                  disabled
                >
                  READY
                </button>
              )}
              <div className="grid grid-cols-4 bg-rose-50 bg-opacity-25 w-fit rounded-lg mt-8">
                {usersReady.map((user) => (
                  <div
                    className="col-span-1 rounded-full bg-pink-50  h-28 w-28 bg-opacity-60 m-4 flex border-dashed border-2 border-pink-600"
                    key={user.userId}
                  >
                    <p className="m-[auto] opacity-1 font-semibold">{user.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
