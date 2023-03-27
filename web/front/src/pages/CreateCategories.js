import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const CreateCategories = () => {
  const stateLoginToken = useSelector((state) => state.login.loginToken);
  const [titleCategories, setTitleCategories] = useState("");
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/create-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${stateLoginToken}`,
          },
          body: JSON.stringify({ idUser: 1, category: titleCategories }),
        }
      );
      setCreated(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="mx-auto max-w-2xl">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center ">
          <div className="bg-rose-100 lg:h-auto lg:w-[32rem] opacity-70 lg:rounded-lg mx-auto lg:m-[auto] p-6 block h-screen w-screen">
            <Link to="/categories" className="h-[20px] w-[20px] block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
            </Link>
            <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}>
              <label>Set the category title</label>
              <input
                type="text"
                value={titleCategories}
                onChange={(e) => setTitleCategories(e.target.value)}
              ></input>
              <button
                type="submit"
                className="rounded-lg w-24 p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold"
              >
                Create Category
              </button>
            </form>
            {created ? <h2>La categoria se ha creado correctamente</h2> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
