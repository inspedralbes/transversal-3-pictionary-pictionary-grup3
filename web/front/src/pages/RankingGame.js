import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export const RankingGame = () => {
    let dataScoreBoard = useSelector((state) => state.scoreBoard.score);
    const [scoreSort, setScoreSort] = useState([])

    useEffect(() => {
        let test = dataScoreBoard.scoreBoard
    
        console.log([...test].sort((a, b) => b.score - a.score))
        const scoreList  = [...test].sort((a, b) => b.score - a.score)
        console.log(scoreList)
        setScoreSort(scoreList);        
    }, [dataScoreBoard])
  
    
    return <ul>
    {scoreSort.map((player) => (      
          <li key={player.userId}>
            <span>{player.name}</span>
            <span>{player.score}</span>
          </li>
    ))}
    </ul>;
  };
  
