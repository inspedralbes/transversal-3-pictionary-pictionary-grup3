import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Medal1, Medal2, Medal3, MedalNoTop } from "../components/Medals";

export const RankingGame = () => {
  let dataScoreBoard = useSelector((state) => state.scoreBoard.score);
  const [scoreSort, setScoreSort] = useState([]);

  useEffect(() => {
    let test = dataScoreBoard.scoreBoard;
    setScoreSort([...test].sort((a, b) => b.score - a.score));
  }, [dataScoreBoard]);

  return (
    <div className="w-screen">
      <div class="max-w-4xl mt-44 mx-auto text-center shadow-2xl">
        <h2 class="w-9/12 mx-auto text-2xl font-bold mb-4 bg-white border-2 border-rose-500 px-2 py-1 rounded-lg text-rose-500">
          USER RANKING
        </h2>
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
              {scoreSort.map((player, key) => (
                key < 5 && (
                    <tr className="hover:bg-rose-100" key={key}>
                    {key === 0 && <Medal1 />}
                    {key === 1 && <Medal2 />}
                    {key === 2 && <Medal3 />}
                    {key > 2 && <MedalNoTop />}
                    <td class="py-3 px-4 border-b border-gray-200">
                        {player.name.toUpperCase()}
                    </td>
                    <td class="py-3 px-4 border-b border-gray-200">
                        {player.score}
                    </td>
                    </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
