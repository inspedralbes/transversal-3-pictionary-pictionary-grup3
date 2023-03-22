import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Categories = ({ socket }) => {
    const stateLoginToken = useSelector((state) => state.loginToken.loginToken);
    const [titleCategories, setTitleCategories] = useState("");

    return (
        <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
            <div className='mx-auto max-w-2xl'>
                <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
                <div className='text-center '>
                    <div className='bg-rose-100 lg:h-auto lg:w-[32rem] opacity-70 lg:rounded-lg mx-auto lg:m-[auto] p-6 block h-screen w-screen'>
                        <form className='mt-8 space-y-6' action='#' onSubmit={handleSubmit}>
                            <label>Set the category title</label>
                            <input type='text' value={titleCategories}
                                onChange={(e) => setTitleCategories(e.target.value)}>
                            </input>
                            <button type="submit" className='rounded-lg w-24 p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold'>Add Word</button>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    );
};
