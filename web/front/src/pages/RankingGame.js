import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export const RankingGame = () => {
    let dataScoreBoard = useSelector((state) => state.scoreBoard.score);
    const [scoreSort, setScoreSort] = useState([])

    useEffect(() => {
        // let test = dataScoreBoard.scoreBoard

        const scoreBoard = [
            {userId: 1, name: 'carlos', score: 100},
            {userId: 2, name: 'arnau', score: 300},
            {userId: 3, name: 'isma', score: 400}
        ]
    
        // console.log([...test].sort((a, b) => b.score - a.score))
        const scoreList  = scoreBoard.sort((a, b) => b.score - a.score)
        // console.log(scoreList)
        setScoreSort(scoreBoard);        
    }, [dataScoreBoard])
  
    
    return (
        // <div>
        //     <div className="list-none p-0;">
        //         {scoreSort.map((player, index) => (
        //         <div key={player.userId} className="flex justify-between align-center p-10 border-b-2 ">
        //             <span>{index+1}.</span>
        //             <span className="uppercase font-semibold">{player.name}</span>
        //             <span>{player.score}</span>
        //         </div>
        //         ))}
        //     </div>
        // </div>

        <div class="max-w-4xl mt-44 mx-auto text-center shadow-2xl">
            <h2 class="w-9/12 mx-auto text-2xl font-bold mb-4 bg-white border-2 border-rose-500 px-2 py-1 rounded-lg text-rose-500">USER RANKING</h2>
            <div class="bg-white shadow-md overflow-hidden">
                <table class="w-full text-center border-4 border-rose-500 rounded-xl">
                    <thead class="bg-gray-200 uppercase text-sm leading-normal ">
                        <tr className="bg-rose-200">
                            <th class="py-3 px-4 text-center">POSITION</th>
                            <th class="py-3 px-4 text-center">USERNAME</th>
                            <th class="py-3 px-4 text-center">SCORE</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700 text-sm font-light bg-rose-50 ">
                        <tr className="hover:bg-rose-100">
                            <td class="py-3 px-4 border-b border-gray-200"><svg className="h-16 mx-auto" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Flat"> <g id="Color"> <polygon fill="#212529" points="8.26 3 25.94 33.62 38.06 26.62 24.42 3 8.26 3"></polygon> <path d="M38.06,26.62l-7.21-12.5-3.72,6.44a21.53,21.53,0,0,0-7,3l5.8,10Z" fill="#111315"></path> <polygon fill="#dd051d" points="34.6 28.62 29.4 31.62 12.87 3 19.8 3 34.6 28.62"></polygon> <polygon fill="#212529" points="39.58 3 25.94 26.62 38.06 33.62 55.74 3 39.58 3"></polygon> <path d="M34.6,28.62l-6.06-10.5-1.42,2.46a21.44,21.44,0,0,0-3.46,1.1l5.74,9.94Z" fill="#a60416"></path> <path d="M43.86,23.58a21.46,21.46,0,0,0-14.17-3.45l-3.75,6.49,12.12,7Z" fill="#111315"></path> <polygon fill="#dd051d" points="51.13 3 34.6 31.62 29.4 28.62 44.2 3 51.13 3"></polygon> <path d="M34.6,31.62l5.74-9.94a21.41,21.41,0,0,0-6-1.55L29.4,28.62Z" fill="#a60416"></path> <circle cx="32" cy="41.5" fill="#fccd1d" r="19.5"></circle> <circle cx="32" cy="41.5" fill="#f9a215" r="14.5"></circle> <path d="M34.13,43.63V33H29.88a3.19,3.19,0,0,1-3.19,3.19H25.63v4.25h4.25v3.19a2.13,2.13,0,0,1-2.13,2.12H25.63V50H38.38V45.75H36.25A2.12,2.12,0,0,1,34.13,43.63Z" fill="#fccd1d"></path> </g> </g> </g></svg></td>
                            <td class="py-3 px-4 border-b border-gray-200">Carlos</td>
                            <td class="py-3 px-4 border-b border-gray-200">750</td>
                        </tr >
                        <tr className="hover:bg-rose-100">
                            <td class="py-3 px-4 border-b border-gray-200"><svg className="h-16 mx-auto" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Flat"> <g id="Color"> <polygon fill="#212529" points="45 17 32 25 19 17 19 3 45 3 45 17"></polygon> <polygon fill="#dd051d" points="40 3 40 20.08 32 25 24 20.08 24 3 40 3"></polygon> <path d="M32,25l6.49-4a21.36,21.36,0,0,0-13,0Z" fill="#a60416"></path> <circle cx="32" cy="41.5" fill="#fccd1d" r="19.5"></circle> <circle cx="32" cy="41.5" fill="#f9a215" r="14.5"></circle> <path d="M33.88,33.57a6.49,6.49,0,0,0-5.81,1.23,6.41,6.41,0,0,0-2.21,4.89H30c0-2.24,3.37-2.38,4-1,1,2.1-8,7-8,7v4H38v-4H34a7.07,7.07,0,0,0,4-7.54A6.16,6.16,0,0,0,33.88,33.57Z" fill="#fccd1d"></path> </g> </g> </g></svg></td>
                            <td class="py-3 px-4 border-b border-gray-200">Arnau</td>
                            <td class="py-3 px-4 border-b border-gray-200">675</td>
                        </tr>
                        <tr className="hover:bg-rose-100">
                            <td class="py-3 px-4 border-b border-gray-200"><svg className="h-16 mx-auto" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Flat"> <g id="Color"> <polygon fill="#212529" points="45 17 32 25 19 17 19 3 45 3 45 17"></polygon> <polygon fill="#dd051d" points="40 3 40 20.08 32 25 24 20.08 24 3 40 3"></polygon> <path d="M32,25l6.49-4a21.36,21.36,0,0,0-13,0Z" fill="#a60416"></path> <circle cx="32" cy="41.5" fill="#fccd1d" r="19.5"></circle> <circle cx="32" cy="41.5" fill="#f9a215" r="14.5"></circle> <path d="M36.54,41.5A4.52,4.52,0,0,0,38.38,38c0-2.76-2.86-5-6.38-5s-6.37,2.24-6.37,5h3.92a2,2,0,0,1,3.9-.29c.17,1.23-.77,2.73-2,2.73v2.12c2.22,0,2.84,3.5.72,4.32A2,2,0,0,1,29.55,45H25.63c0,2.76,2.85,5,6.37,5s6.38-2.24,6.38-5A4.52,4.52,0,0,0,36.54,41.5Z" fill="#fccd1d"></path> </g> </g> </g></svg></td>
                            <td class="py-3 px-4 border-b border-gray-200">Ismael</td>
                            <td class="py-3 px-4 border-b border-gray-200">600</td>
                        </tr>
                     

                    </tbody>
                </table>
            </div>
        </div>




    )
  };
  
