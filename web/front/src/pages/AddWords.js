import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AddWords = () => {
  const stateLoginToken = useSelector((state) => state.login.loginToken);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [isWords, setIsWords] = useState(false);
  const [word, setUserWord] = useState("");
  const [description, setUserDescription] = useState("");
  const [Cword, setUserCWord] = useState("");
  const [Cdescription, setUserCDescription] = useState("");
  const [idCategory, setIdCategory] = useState("");
  let auxIdCategory = 0;

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    try {
      const response = await fetch(
        `//tr3-laravel.alumnes.inspedralbes.cat/public/api/list-categories`,
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
      // console.error(error);
    }
  };

  const getWords = async (id) => {
    try {
      const response = await fetch(`//tr3-laravel.alumnes.inspedralbes.cat/public/api/list-words`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          idCategory: id,
        }),
      });
      const data = await response.json();
      setWords(data);
      setIsWords(true);
    } catch (error) {
      // console.error(error);
    }
  };

  const handleSelect = (e) => {
    setIsWords(false);
    auxIdCategory = e.target.value;
    setIdCategory(e.target.value);
    getWords(auxIdCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (word != "" && description != "" && Cword != "" && Cdescription != "") {
      try {
        const response = await fetch(`//tr3-laravel.alumnes.inspedralbes.cat/public/api/create-word`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${stateLoginToken}`,
          },
          method: "POST",
          body: JSON.stringify({
            idCategory: idCategory,
            word: word,
            description: description,
            word_ca: Cword,
            description_ca: Cdescription,
          }),
        });

        setIsWords(true);
      } catch (error) {
        // console.error(error);
      }
    }

    setUserWord("");
    setUserDescription("");
    setUserCWord("");
    setUserCDescription("");
    getWords(idCategory);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="overflow-y-scroll md:overflow-y-hidden h-screen md:h-fit">
        <div className="block justify-center text-center">
          <div className="bg-rose-100 w-screen md:w-[32rem] bg-opacity-70 md:rounded-lg p-6 block md:mx-auto">
            {loading ? (
              <div className="w-[100%] flex items-center justify-center">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="opacity-animation">
                <Link to="/categories" className="h-[20px] w-[20px] block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                  </svg>
                </Link>
                <label>Select a category to add words</label>
                <select
                  onChange={handleSelect}
                  className="font-semibold bg-rose-50 border-2 border-rose-400 text-gray-900 text-md rounded-lg focus:ring-rose-500 focus:border-rose-500 p-1.5 m-1 w-full"
                >
                  <option hidden value="">
                    Select category
                  </option>
                  {categories.categoriesList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {isWords ? (
            <div className="md:flex justify-center md:mt-5 opacity-animation">
              <div className="bg-rose-100 md:h-auto h-fit md:w-[32rem] bg-opacity-70 md:rounded-lg p-6 block md:mr-5">
                <form
                  className="mt-8 space-y-6"
                  action="#"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label htmlFor="english_word">English word: </label>
                    <input
                      id="english_word"
                      type="text"
                      value={word}
                      onChange={(e) => setUserWord(e.target.value)}
                      className="addWordsInput"
                    ></input>
                  </div>

                  <div>
                    <label htmlFor="english_definition">English definition: </label>
                    <textarea
                      id="english_definition"
                      type="text"
                      value={description}
                      onChange={(e) => setUserDescription(e.target.value)}
                      className="addWordsInput"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="catalan_translation">
                      Catalan translation:{" "}
                    </label>
                    <input
                      id="catalan_translation"
                      type="text"
                      value={Cword}
                      onChange={(e) => setUserCWord(e.target.value)}
                      className="addWordsInput"
                    ></input>
                  </div>

                  <div>
                    <label htmlFor="catalan_definition">Catalan definition: </label>
                    <textarea
                      id="catalan_definition"
                      type="text"
                      value={Cdescription}
                      onChange={(e) => setUserCDescription(e.target.value)}
                      className="addWordsInput"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="rounded-lg w-24 p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold"
                  >
                    Add Word
                  </button>
                </form>
              </div>
              <div className="bg-rose-100 md:w-[32rem] h-fit md:h-auto opacity-70 md:rounded-lg p-6 block w-screen pt-10 md:pt-6">
                <div className="overflow-y-scroll h-[430px]">
                  <table className="text-left">
                    <thead>
                      <tr>
                        <th>Word</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {words.words.map((word, index) => (
                        <tr key={index}>
                          <td>{word.word}</td>
                          <td>{word.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
