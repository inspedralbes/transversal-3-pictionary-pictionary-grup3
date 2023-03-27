import avatar from '../style/avatar.png';
import banner from '../style/banner.jpg'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Profile = () => {
    const stateLoginToken = useSelector((state) => state.login.loginToken);

    useEffect(() => {
      getProfile();
    }, [])
    
    const getProfile = async () => {
        try {
            const response = await fetch(
              `http://127.0.0.1:8000/api/profile`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${stateLoginToken}`,
                },
                method: "get",
              }
            );
      
            const data = await response.json();
            console.log(data)
          } catch (error) {
            console.error(error);
          }
        };
    return (
        <div className="h-screen overflow-y-hidden bg-cover bg-center bg-[url('../style/spinning-bg-only-pinchitos.png')]">
            <div className="mt-5">
                <h1 className="w-2/5 mx-auto text-center text-4xl font-bold rounded-md bg-rose-50 text-rose-400 leading-tight">USER PROFILE</h1>
            </div>
            <div className="w-11/12 mx-auto mt-5 container border-4 border-rose-500 bg-rose-300 rounded-lg lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3shadow-lg transform duration-200 easy-in-out">
                <div className="bg-rose-200">
                    <div className="h-32 overflow-hidden">
                        <img className="w-full" src={banner} alt=""></img>
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img className="h-32 w-32 bg-rose-500 p-2 rounded-full" src={avatar} alt=""></img>
                    </div>
                    <div>
                        <div className="text-center px-14">
                            <h2 className="text-gray-800 text-3xl font-bold">Carlos</h2>
                            <a className="text-gray-800 font-semibold mt-2 hover:text-blue-500" href="">a21cargomfue@inspedrlabes.cat</a>
                        </div>
                        <hr className="mt-6"></hr>
                        <div className="flex bg-rose-50">
                            <button className="text-center w-1/2 p-4 hover:bg-rose-300 cursor-pointer">
                                <p>CHANGE PASSWORD</p>
                            </button>
                            <div className="border"></div>
                            <button className="text-center w-1/2 p-4 hover:bg-rose-300 cursor-pointer">
                                <p>LOGOUT</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
  
