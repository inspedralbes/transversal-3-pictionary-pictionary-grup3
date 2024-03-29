import "../style/style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setUserData } from "../features/dataUserSlice";
import { Link } from "react-router-dom";
import logoSmall from "../style/logoPictoboomSmall.png";

import Swal from "sweetalert2";

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
      error = "Fill the blanks";
    }

    socket.on("not joined", (dataError) => {
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
    setReady(false);
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
        <div className="m-[auto] border-2 rounded-lg w-80 p-8 bg-rose-50 bg-opacity-50">
          <div className="h-fit w-fit">
            <Link to="/" className="h-[20px] block">
              <svg
                className="flex absolute h-5 w-5 text-rose-200 group-hover:text-indigo-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2796 3.71579C12.097 3.66261 11.903 3.66261 11.7203 3.71579C11.6678 3.7311 11.5754 3.7694 11.3789 3.91817C11.1723 4.07463 10.9193 4.29855 10.5251 4.64896L5.28544 9.3064C4.64309 9.87739 4.46099 10.0496 4.33439 10.24C4.21261 10.4232 4.12189 10.6252 4.06588 10.8379C4.00765 11.0591 3.99995 11.3095 3.99995 12.169V16C3.99995 16.9456 4.0005 17.6047 4.03569 18.1205C4.07028 18.6275 4.13496 18.9227 4.22832 19.148C4.5328 19.8831 5.11682 20.4672 5.8519 20.7716C6.07729 20.865 6.37249 20.9297 6.8794 20.9643C7.3953 20.9995 8.05439 21 8.99995 21H15C15.9455 21 16.6046 20.9995 17.1205 20.9643C17.6274 20.9297 17.9226 20.865 18.148 20.7716C18.8831 20.4672 19.4671 19.8831 19.7716 19.148C19.8649 18.9227 19.9296 18.6275 19.9642 18.1205C19.9994 17.6047 20 16.9456 20 16V12.169C20 11.3095 19.9923 11.0591 19.934 10.8379C19.878 10.6252 19.7873 10.4232 19.6655 10.24C19.5389 10.0496 19.3568 9.87739 18.7145 9.3064L13.4748 4.64896C13.0806 4.29855 12.8276 4.07463 12.621 3.91817C12.4245 3.7694 12.3321 3.7311 12.2796 3.71579ZM11.1611 1.79556C11.709 1.63602 12.2909 1.63602 12.8388 1.79556C13.2189 1.90627 13.5341 2.10095 13.8282 2.32363C14.1052 2.53335 14.4172 2.81064 14.7764 3.12995L20.0432 7.81159C20.0716 7.83679 20.0995 7.86165 20.1272 7.88619C20.6489 8.34941 21.0429 8.69935 21.3311 9.13277C21.5746 9.49916 21.7561 9.90321 21.8681 10.3287C22.0006 10.832 22.0004 11.359 22 12.0566C22 12.0936 22 12.131 22 12.169V16.0355C22 16.9373 22 17.6647 21.9596 18.2567C21.918 18.8654 21.8305 19.4037 21.6194 19.9134C21.1119 21.1386 20.1385 22.1119 18.9134 22.6194C18.4037 22.8305 17.8654 22.9181 17.2566 22.9596C16.6646 23 15.9372 23 15.0355 23H8.96443C8.06267 23 7.33527 23 6.74326 22.9596C6.13452 22.9181 5.59624 22.8305 5.08654 22.6194C3.8614 22.1119 2.88803 21.1385 2.38056 19.9134C2.16943 19.4037 2.08187 18.8654 2.04033 18.2567C1.99994 17.6647 1.99995 16.9373 1.99995 16.0355L1.99995 12.169C1.99995 12.131 1.99993 12.0936 1.99992 12.0566C1.99955 11.359 1.99928 10.832 2.1318 10.3287C2.24383 9.90321 2.42528 9.49916 2.66884 9.13277C2.95696 8.69935 3.35105 8.34941 3.87272 7.8862C3.90036 7.86165 3.92835 7.83679 3.95671 7.81159L9.22354 3.12996C9.58274 2.81064 9.89467 2.53335 10.1717 2.32363C10.4658 2.10095 10.781 1.90627 11.1611 1.79556Z"
                    fill="#0F1729"
                  ></path>
                </g>
              </svg>
            </Link>
          </div>
          <div className="flex justify-center text-center mt-4">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  id="lobby_code"
                  value={lobbyCode}
                  onChange={(e) => setLobbyCode(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 caret-rose-500 bg-rose-50 bg-opacity-60 outline-2 outline-rose-500 rounded-lg appearance-none peer"
                  placeholder=" "
                />
                <label
                  htmlFor="lobby_code"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-80 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-7 left-1"
                >
                  Lobby code
                </label>
              </div>

              <div className="relative mt-6">
                <input
                  id="player_name"
                  type="text"
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 caret-rose-500 bg-rose-50 bg-opacity-60 outline-2 outline-rose-500 rounded-lg appearance-none peer"
                  placeholder=" "
                />
                <label
                  htmlFor="player_name"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-7 scale-80 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-rose-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-7 left-1"
                >
                  Your name
                </label>
              </div>

              <button
                type="submit"
                className="font-semibold text-gray-900 text-xl default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none mt-[1.5rem] w-10/12"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="block w-full lg:h-full md:h-full">
          <div className="flex m-[auto] ">
            <div className="flex flex-col mx-[auto] lg:my-24 md:my-24 mt-40">
              <h2 className="font-semibold text-5xl text-center mb-10">
                Welcome{" "}
                <p className="font-bold text-yellow-400 inline">{nameUser}</p>!
                <br></br>Are you ready?!
              </h2>
              {!ready ? (
                <>
                  <button
                    onClick={handleClickReady}
                    className="default-button m-[auto]  text-red-700 font-extrabold bg-red-200 transition duration-100 hover:shadow-[0_20px_60px_-5px_rgba(0,0,0,0.7)] text-center w-60 h-16"
                  >
                    NOT READY
                  </button>
                  <button
                    onClick={handleClickLeave}
                    className="leave-lobby-btn"
                  >
                    Leave lobby
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleClickReady}
                    className="default-button m-[auto] text-green-900 font-extrabold bg-green-200 disabled:text-green-300 disabled:bg-gray-50 transition duration-100 text-center w-60 h-16"
                    disabled
                  >
                    READY
                  </button>
                  <button
                    onClick={handleClickLeave}
                    className="leave-lobby-btn"
                  >
                    Leave lobby
                  </button>
                </>
              )}
              <div className="grid lg:grid-cols-4 md:grid-cols-4 gird-cols-3 bg-rose-50 bg-opacity-25 lg:w-fit md:w-fit md:rounded-lg w-screen lg:rounded-lg mt-12 p-8 m-[auto] ">
                {usersReady.map((user) => (
                  <div
                    className="col-span-1 rounded-full bg-pink-50 lg:h-28 lg:w-28 md:h-28 md:w-28 h-36 w-36 bg-opacity-60 lg:m-4 flex border-dashed border-2 md:m-4 border-pink-600 mx-[auto] my-4 text-xl text-gray-900"
                    key={user.userId}
                  >
                    <p className="m-[auto] opacity-1 font-semibold">
                      {user.name}
                    </p>
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
