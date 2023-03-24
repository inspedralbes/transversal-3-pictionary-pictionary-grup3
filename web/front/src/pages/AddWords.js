import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const AddWords = ({ socket }) => {
    const stateLoginToken = useSelector((state) => state.loginToken.loginToken);

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
                `http://127.0.0.1:8000/api/list-categories`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer 15|CnfwDeENfDfNg8FFjUOnSRNvYclasEaxMZ3f2cws',
                        // Authorization: 'Bearer ' + stateLoginToken,
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
    }

    const getWords = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/list-words`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({
                    idCategory: id,
                }),
            });
            const data = await response.json();
            setWords(data);
            setIsWords(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelect = (e) => {
        setIsWords(false);
        auxIdCategory = e.target.value;
        setIdCategory(e.target.value);
        getWords(auxIdCategory);
    };

    const handleSubmit = async (e) => {
        console.log(idCategory);
        e.preventDefault();

        if (word != "" && description != "" && Cword != "" && Cdescription != "") {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/create-word`, {
                    headers: {
                        'Content-Type': 'application/json'
                        // Authorization: 'Bearer ' + stateLoginToken,
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        "idCategory": idCategory,
                        "word": word,
                        "description": description,
                        "word_ca": Cword,
                        "description_ca": Cdescription,
                    }),
                });

                setIsWords(true);
            } catch (error) {
                console.error(error);
            }
        }

        setUserWord("");
        setUserDescription("");
        setUserCWord("");
        setUserCDescription("");
        getWords(idCategory);
    };

    return (
        <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
            <div className='mx-auto max-w-2xl'>
                <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
                <div className='text-center'>
                    <div className='bg-rose-100 h-auto lg:w-[32rem] opacity-70 lg:rounded-lg mx-auto lg:m-[auto] p-6 block'>
                        {loading ? (
                            'Loading'
                        ) : (
                            <>
                                <label>Select a category to add words</label>
                                <select onChange={handleSelect} className="font-semibold bg-rose-50 border-2 border-rose-400 text-gray-900 text-md rounded-lg focus:ring-rose-500 focus:border-rose-500 p-1.5 m-1 w-full">
                                    <option hidden value="">Select category</option>
                                    {categories.categoriesList.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                </div>
                {isWords ? (
                    <div className='mt-5 lg:flex justify-center'>
                        <div className='bg-rose-100 lg:h-auto h-fit lg:w-[32rem] opacity-70 lg:rounded-lg p-6 block mr-5'>
                            <Link to="/categories">Back</Link>
                            <form className='mt-8 space-y-6' action='#' onSubmit={handleSubmit}>
                                <label>English word</label>
                                <input type='text' value={word}
                                    onChange={(e) => setUserWord(e.target.value)}>
                                </input>
                                <br></br>
                                <label>English description</label>
                                <textarea type='text' value={description}
                                    onChange={(e) => setUserDescription(e.target.value)}>
                                </textarea>
                                <br></br>
                                <label>Catalan word</label>
                                <input type='text' value={Cword}
                                    onChange={(e) => setUserCWord(e.target.value)}>
                                </input>
                                <br></br>
                                <label>Catalan description</label>
                                <textarea type='text' value={Cdescription}
                                    onChange={(e) => setUserCDescription(e.target.value)}>
                                </textarea>
                                <br></br>
                                <button type="submit" className='rounded-lg w-24 p-1.5 m-1 outline outline-2 outline-orange-500 text-gray-900 hover:pink-to-orange-gr hover:outline-none hover:text-rose-50 font-semibold'>Add Word</button>
                            </form>
                        </div>
                        <div className='bg-rose-100 lg:w-[32rem] h-fit lg:h-auto opacity-70 lg:rounded-lg p-6 block h-screen w-screen'>
                            <div className='overflow-y-scroll h-[400px]'>
                                <table className='text-left'>
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
                    <></>)}
            </div>
        </div >
    );
};


