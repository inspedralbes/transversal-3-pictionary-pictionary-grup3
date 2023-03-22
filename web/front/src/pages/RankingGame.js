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
        <div>
            <ul className="list-none p-0;">
                {scoreSort.map((player, index) => (
                <li key={player.userId} className="flex justify-between align-center p-10 border-b-2 ">
                    <span>{index+1}.</span>
                    <span>{player.name}</span>
                    <span>{player.score}</span>
                </li>
                ))}
            </ul>
        </div>
    )
  };
  
