import React, { useEffect, useState } from 'react';
import '../../style/style.css';

const CreateGame = ({ socket }) => {
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState(5);
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

  const handleSubmit = () => {
    setIsSelected(true);
  };

  const handleClick = (e) => {
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
      category: 'Info',
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
              <form onSubmit={handleSubmit}>
                <button type='submit'>Send</button>
              </form>
              {categories.categoriesList.map((category) => (
                <button
                  type='text'
                  key={category.id}
                  value={category.id}
                  onClick={handleClick}
                >
                  {category.category}
                </button>
              ))}
            </>
          )}
        </div>
      ) : (
        <>
          <label>Here's the code to your lobby! Have FUN!</label>
          <hr></hr>
          <button onClick={createNewLobby}>Create a new lobby</button>
          <div className='lobby-list'>
            {lobbies.map((lobby, index) => (
              <div className='lobby' key={index}>
                <h2>{lobby.lobby_code}</h2>
                <p>{lobby.category}</p>
                {lobby.users.map((user, index) => (
                  <span className='users' key={index}>
                    {user.name}
                  </span>
                ))}
                <p>{lobby.maxUsers}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CreateGame;
