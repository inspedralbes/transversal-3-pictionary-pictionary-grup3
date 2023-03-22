import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const CreateGame = ({ socket }) => {
  console.log(useSelector((state) => state.login.loginToken))
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

  useEffect(() => {
    codeGenerator();
    getCollection();
    console.log(stateLoginToken)
    console.log(stateLoginUser)
  }, []);

  useEffect(() => {
    getWords();
  }, [idCategory]);

  const handleClick = () => {
    setIsSelected(true);
  };

  const handleSelect = (e) => {
    setIdCategory(e.target.value);
  };

  const getWords = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/list-words`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
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
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/list-categories`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 15|CnfwDeENfDfNg8FFjUOnSRNvYclasEaxMZ3f2cws',
            // Authorization: 'Bearer ' + stateLoginToken,
          },
          method: 'get',
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
    socket.emit('new lobby', {
      lobby_code: room,
      maxUsers: users,
      category: idCategory,
      words: words,
    });
    getLobby();
  };

  const getLobby = () => {
    socket.emit('get lobbies', {});
    socket.on('lobbies list', function (data) {
      setLobbies(data);
    });
  };

  return (
    <div className="h-screen flex bg-cover bg-center bg-[url('../style/webBackground.png')]">
      {!isSelected ? (
        <div className='bg-rose-100 lg:h-auto lg:w-[32rem] opacity-70 lg:rounded-lg mx-auto lg:m-[auto] p-6 block h-screen w-screen'>
          {loading ? (
            'Loading'
          ) : (
            <>
              <select onChange={handleSelect} className="font-semibold bg-rose-50 border-2 border-rose-400 text-gray-900 text-md rounded-lg focus:ring-rose-500 focus:border-rose-500 p-1.5 m-1 w-full">
                {categories.categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <label className='font-semibold m-1 mb-0'>Nº Users: </label>
              <input
                id='users'
                name='users'
                type='number'
                min="1"
                value={users}
                onChange={(e) => setUsers(e.target.value)}
                className="w-full m-1 input-join focus:outline outline-2 outline-rose-500"
              />
              <button onClick={handleClick} className="rounded-lg p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 w-full hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold ">Continue</button>
            </>
          )}
        </div>
      ) : (
        <div className='inline mx-[auto] bg-rose-100 lg:rounded-lg m-[auto] p-6 h-auto w-screen lg:w-auto md:w-auto'>
          <label className='font-bold'>Here's the code to your lobby! Have FUN!</label>
          <br></br>
          <button
            onClick={createNewLobby}
            className='default-button text-sm font-semibold text-gray-900 shadow-sm outline-orange-500 hover:outline-none hover:pink-to-orange-gr m-1'
          >
            Create a new lobby
          </button>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center justify-center p-8'>
            {lobbies.map((lobby, index) => (
              <div
                className='h-48 w-60 rounded-lg pink-to-orange-gr p-1'
                key={index}
              >
                <div className='h-full w-full bg-white back p-2 rounded-lg'>
                  <div className='max-w-sm rounded overflow-hidden' key={index}>
                    <div className=''>
                      <div className='font-bold text-gray-800 text-xl'>
                        {lobby.lobby_code}
                      </div>
                      <p className='text-gray-800 text-base'>
                        {words.category}
                      </p>
                    </div>
                    <div className=''>
                      {lobby.users.map((user, index) => (
                        <span className='users' key={index}>
                          {user.name}
                        </span>
                      ))}
                    </div>
                    <p>{lobby.maxUsers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
