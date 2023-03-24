import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export const Profile = () => {
    return (
        <div className="h-screen overflow-y-hidden items-center bg-cover bg-center bg-[url('../style/spinning-bg-only-pinchitos.png')]">
            <div class="mt-44">
                <h1 class="w-2/5 mx-auto text-center text-4xl font-bold rounded-md bg-rose-50 text-rose-400 leading-tight">USER PROFILE</h1>
            </div>
            <div className="mx-auto mt-5 container border-4 border-rose-500 bg-rose-300 rounded-lg lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3shadow-lg transform duration-200 easy-in-out">
                <div className="bg-rose-200">
                    <div className="h-32 overflow-hidden">
                        <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80" alt=""></img>
                    </div>
                    <div className="flex justify-center px-5 -mt-12">
                        <img className="h-32 w-32 bg-rose-500 p-2 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-KvmYtfhk5J3DDze-qCIyGGNLA_QxfIZosn7h-etCZw&s" alt=""></img>
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
  
