import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateCategories = () => {
  const stateLoginToken = useSelector((state) => state.login.loginToken);
  const [titleCategories, setTitleCategories] = useState("");
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleCategories !== "") {
      try {
        const response = await fetch(
          "//tr3-laravel.alumnes.inspedralbes.cat/public/api/create-category",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${stateLoginToken}`,
            },
            body: JSON.stringify({ idUser: 1, category: titleCategories.toLowerCase() }),
          }
        );
        setCreated(true);
      } catch (error) {
        // console.error("Error:", error);
      }
    } else {
      Swal.fire({
        position: "bottom-end",
        icon: "error",
        title: "Fill the blank",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  function categoriaCreada() {
    Swal.fire({
      title: "Category created!",
      text: "The category has been created successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
    setTitleCategories('')
    setCreated(false);
  }

  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="mx-auto max-w-2xl">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center ">
          <div className="bg-rose-100 lg:h-auto lg:w-[32rem] bg-opacity-70 lg:rounded-lg mx-auto lg:m-[auto] p-6 block h-screen w-screen">
            <Link to="/categories">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
            </Link>
            <form className="space-y-6 mb-3" action="#" onSubmit={handleSubmit}>
              <label htmlFor="title-category" className="text-lg font-semibold">
                Set the category title:{" "}
              </label>
              <input
                type="text"
                id="title-category"
                value={titleCategories}
                onChange={(e) => setTitleCategories(e.target.value)}
                className="w-6/12 mx-[auto] mt-0 input-join outline outline-1 focus:outline-2 focus:outline-rose-500 bg-opacity-1 bg-slate-50 caret-rose-500"
              ></input>
              <button
                type="submit"
                className="rounded-lg w-auto p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 hover:pink-to-orange-gr hover:outline-none hover:text-white font-semibold"
              >
                Create Category
              </button>
            </form>
            {created ? categoriaCreada() : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
