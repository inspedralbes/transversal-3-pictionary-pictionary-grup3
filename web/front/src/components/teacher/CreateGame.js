import React, { useEffect, useState } from 'react';
import '../../style/style.css';

const CreateGame = ({ socket }) => {
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
      console.log(data);
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
    showLobby();
  };

  const getLobby = () => {
    socket.emit('get lobbies', {});
    socket.on('lobbies list', function (data) {
      setLobbies(data);
    });
  };

  const showLobby = () => {
    console.log(lobbies);
  };

  return (
    <>
      {!isSelected ? (
        <div>
          {loading ? (
            'Loading'
          ) : (
            <>
              <select onChange={handleSelect}>
                {categories.categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <label>Numero usuarios por sala</label>
              <input
                id='users'
                name='users'
                type='users'
                value={users}
                onChange={(e) => setUsers(e.target.value)}
              />
              <button onClick={handleClick}>Continue</button>
            </>
          )}
        </div>
      ) : (
        <>
          <label>Here's the code to your lobby! Have FUN!</label>
          <hr></hr>
          <button
            onClick={createNewLobby}
            className='default-button text-sm font-semibold text-gray-900 shadow-sm outline-orange-500 hover:outline-none hover:pink-to-orange-gr m-1'
          >
            Create a new lobby
          </button>
          <div className='grid grid-cols-5 gap-3 items-center justify-center p-8'>
            {lobbies.map((lobby, index) => (
              <div
                className='h-36 w-80 rounded-md pink-to-orange-gr p-1'
                key={index}
              >
                <div className='h-full w-full bg-white back p-2'>
                  <div className='max-w-sm rounded overflow-hidden' key={index}>
                    <div className=''>
                      <div className='font-bold text-gray-800 text-xl'>
                        {lobby.lobby_code}
                      </div>
                      {/* <p className='text-gray-800 text-base'>
                        {lobby.category}
                      </p> */}
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
        </>
      )}
    </>
  );
};

export default CreateGame;
