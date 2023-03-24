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
    let error = null;
    e.preventDefault();
    if (nameUser !== "" || lobbyCode !== "") {
      socket.emit("join room", {
        name: nameUser,
        userId: uuidv4(),
        lobby_code: parseInt(lobbyCode),
      });
      socket.on('not joined', (dataError) => {
        error =dataError.errorMsg;
        console.log(error)
      })
      if(error === null){
        dispatch(setUserData(nameUser));
        setInLobby(true);
      }
    } else {
      error = 'Fill the blanks'
    }
    Swal.fire({
      position: "bottom-end",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
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

  // const [nameUser, setNameUser] = useState('');
  // const [lobbyCode, setLobbyCode] = useState('');
  // const [inLobby, setInLobby] = useState(false)

  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (nameUser != '') {
  //     checkCodeRoom();
  //   }
  // };

  // const checkCodeRoom = () => {
  //   socket.emit('get lobbies');
  //   socket.emit('join room', {
  //     name: nameUser,
  //     userId: uuidv4(),
  //     lobby_code: lobbyCode,
  //   });
  //   navigate('/playGame');
  // };

  return (
    <div className="h-screen flex bg-[url('../style/spinning-bg-pinchitos.png')] bg-cover bg-center items-center justify-center lg:bg-[url('../style/webBackground.png')] w-screen">
      {!inLobby ? (
        <div className="m-[auto] border-2 rounded-lg w-80 p-16">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
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
            <div className="flex-nowrap m-[auto]">
              <h2 className="font-semibold text-5xl">Welcome <p className="font-bold text-yellow-400 inline">{nameUser}</p>!<br></br>Are you ready?!</h2>
                {!ready ? (
                  <button
                    onClick={handleClickReady}
                    className="default-button m-1 text-red-700 font-extrabold bg-red-200 red transition duration-100"
                  >
                    NOT READY
                  </button>
                ) : (
                  <button
                    onClick={handleClickReady}
                    className="default-button m-1 disabled text-green-900 font-extrabold bg-green-200 disabled:text-green-300 disabled:bg-gray-50 transition duration-100"
                    disabled
                  >
                    READY
                  </button>
                )}
            <div className="grid grid-cols-4 bg-rose-50 bg-opacity-25 w-fit rounded-lg">
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
