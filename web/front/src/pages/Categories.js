import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Categories = () => {
  const stateLoginToken = useSelector((state) => state.login.loginToken);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idCategory, setIdCategory] = useState(1);
  const [words, setWords] = useState([]);
  const [isWords, setIsWords] = useState(false);

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

  const getWords = async () => {
    try {
      const response = await fetch(`//tr3-laravel.alumnes.inspedralbes.cat/public/api/list-words`, {
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
      // console.log(data);
      setIsWords(true);
    } catch (error) {
      // console.error(error);
    }
  };

  const handleSelect = (e) => {
    setIsWords(false);
    setIdCategory(e.target.value);
    getWords();
  };

  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="mx-auto max-w-2xl">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center ">
          <div className="bg-rose-100 lg:h-auto lg:w-[32rem] bg-opacity-70 lg:rounded-lg mx-auto lg:m-[auto] p-6 block h-screen w-screen">
            <Link to="/createGame" className="h-[20px] w-[20px] block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
            </Link>
            <div className="flex justify-center">
              <Link
                to="/createCategories"
                className="rounded-lg w-36 p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold "
              >
                Create Category
              </Link>
              <Link
                to="/addWords"
                className="rounded-lg w-36 p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold "
              >
                Add Words
              </Link>
            </div>
            {loading ? (
              <div className="w-[100%] flex items-center justify-center mt-5">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="opacity-animation mt-5">
                <label>Look at the existing categories</label>
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
            {isWords ? (
              <div className="max-h-72 overflow-scroll">
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
            ) : (
              <input hidden></input>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
