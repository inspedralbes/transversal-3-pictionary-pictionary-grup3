import avatar from "../style/avatar.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const stateLoginToken = useSelector((state) => state.login.loginToken);
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    fetch(`http://127.0.0.1:8000/api/user-profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stateLoginToken}`,
      },
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        setEmailUser(data.userData.email);
        setNameUser(data.userData.username);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleClick = (e) => {
    e.preventDefault();
    document.cookie =
      "sessionCookie=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("../");
  };

  return (
    <div className="h-screen overflow-y-hidden items-center bg-cover bg-center bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="mt-44">
        <h1 className="w-2/5 mx-auto text-center text-4xl font-bold rounded-md bg-rose-50 text-rose-400 leading-tight">
          USER PROFILE
        </h1>
      </div>
      <div className="mx-auto mt-5 container border-4 border-rose-500 bg-rose-300 rounded-lg lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3shadow-lg transform duration-200 easy-in-out">
        <div className="bg-rose-200">
          <div className="h-16 overflow-hidden"></div>
          <div className="flex justify-center px-5 -mt-12">
            <img
              className="h-32 w-32 bg-rose-500 p-2 rounded-full"
              src={avatar}
              alt=""
            ></img>
          </div>
          <div className="text-center px-14">
            {loading ? (
              "Loading"
            ) : (
              <>
                <h2 className="text-gray-800 text-3xl font-bold">{nameUser}</h2>
                <p className="text-gray-800 font-semibold mt-2 hover:text-blue-500">
                  {emailUser}
                </p>
              </>
            )}
          </div>
          <hr className="mt-6"></hr>
          <div className="flex bg-rose-50">
            <button className="text-center w-1/2 p-4 hover:bg-rose-300 cursor-pointer">
              <p>CHANGE PASSWORD</p>
            </button>
            <div className="border"></div>
            <button
              onClick={handleClick}
              className="text-center w-1/2 p-4 hover:bg-rose-300 cursor-pointer"
            >
              <p>LOGOUT</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
