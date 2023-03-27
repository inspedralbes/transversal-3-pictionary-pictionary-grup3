import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

export const CreateGame = ({ socket }) => {
  const stateLoginToken = useSelector((state) => state.login.loginToken);
  const stateLoginUser = useSelector((state) => state.login.loginUser);
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState(0);
  const [lobbies, setLobbies] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [idCategory, setIdCategory] = useState(1);

  // const navigate = useNavigate();

  useEffect(() => {
    codeGenerator();
    getCollection();
    getLobby();
    // if (stateLoginToken && stateLoginUser) {
    //   navigate("../login");
    // }
  }, []);

  useEffect(() => {
    getWords();
  }, [idCategory]);

  const handleClick = () => {
    if (users > 1 && users < 6) {
      setIsSelected(true);
    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Lobby must be between 2 and 6 users",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSelect = (e) => {
    setIdCategory(e.target.value);
  };

  const getWords = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/list-words`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          idCategory: idCategory,
        }),
      });
      const data = await response.json();
      setWords(data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCollection = async () => {
    console.log(stateLoginToken);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/list-categories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${stateLoginToken}`,
          },
          method: "get",
        }
      );

      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const codeGenerator = () => {
    const randomCode = Math.floor(
      Math.random() * (100000 - 999999 + 1) + 999999
    );
    setRoom(randomCode);
  };

  const createNewLobby = () => {
    codeGenerator();
    socket.emit("new lobby", {
      lobby_code: room,
      maxUsers: users,
      category: idCategory,
      words: words,
      teacher: stateLoginUser,
    });
    getLobby();
  };

  const getLobby = () => {
    socket.emit("get lobbies", {});
    socket.on("lobbies list", function (data) {
      setLobbies(data);
      console.log(data);
    });
  };

  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      {!isSelected ? (
        <div className="bg-rose-100 md:h-auto md:w-[32rem] opacity-70 md:rounded-lg mx-auto md:m-[auto] p-6 block h-screen w-screen">
          {loading ? (
            "Loading"
          ) : (
            <>
              <select
                onChange={handleSelect}
                className="font-semibold bg-rose-50 border-2 border-rose-400 text-gray-900 text-md rounded-lg focus:ring-rose-500 focus:border-rose-500 p-1.5 m-1 w-full"
              >
                {categories.categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <label className="font-semibold m-1 mb-0">Nº Users: </label>
              <input
                id="users"
                name="users"
                type="number"
                value={users}
                onChange={(e) => setUsers(e.target.value)}
                className="w-full m-1 input-join focus:outline outline-2 outline-rose-500"
              />
              <button
                onClick={handleClick}
                className="rounded-lg p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 w-full hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold "
              >
                Continue
              </button>
              <div className="mt-6 justify-center grid">
                <Link
                  to="/categories"
                  className="text-sm font-semibold text-gray-900 default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none"
                >
                  Create category
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="inline mx-[auto] bg-rose-100 lg:rounded-lg m-[auto] p-6 h-auto w-screen lg:w-auto md:w-auto">
          <div className="grid justify-center">
            <label className="font-bold">
              Here are your lobbies! Have FUN!
            </label>
            <br></br>
            <button
              onClick={createNewLobby}
              className="default-button text-sm font-semibold text-gray-900 shadow-sm outline-orange-500 hover:outline-none hover:pink-to-orange-gr m-1"
            >
              Create a new lobby
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center justify-center mt-4">
            {lobbies.map(
              (lobby, index) =>
                lobby.teacher === stateLoginUser && (
                  <div
                    className="h-48 w-60 rounded-lg pink-to-orange-gr p-1"
                    key={index}
                  >
                    <div className="h-full w-full bg-white back p-2 rounded-lg">
                      <div
                        className="max-w-sm rounded overflow-hidden"
                        key={index}
                      >
                        <div className="">
                          <div className="font-bold text-gray-800 text-xl">
                            {lobby.lobby_code}
                          </div>
                          <p className="text-gray-800 text-base">
                            {words.category}
                          </p>
                        </div>
                        <div className="">
                          {lobby.users.map((user, index) => (
                            <span className="users" key={index}>
                              {user.name}
                            </span>
                          ))}
                        </div>
                        <p>{lobby.maxUsers}</p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
