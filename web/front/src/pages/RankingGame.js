import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Medal1, Medal2, Medal3, MedalNoTop } from "../components/Medals";
import { Link } from "react-router-dom";

export const RankingGame = () => {
  let dataScoreBoard = useSelector((state) => state.scoreBoard.score);
  const [scoreSort, setScoreSort] = useState([]);

  useEffect(() => {
    let test = dataScoreBoard.scoreBoard;
    setScoreSort([...test].sort((a, b) => b.score - a.score));
  }, [dataScoreBoard]);

  return (
    <div className="items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="w-[800px] mx-auto mb-5 text-4xl font-bold rounded-md bg-rose-50 text-rose-400 leading-tight">USER RANKING</h1>
          <div className="overflow-hidden">
            <table class="w-full text-center shadow-2xl border-4 border-rose-500 rounded-xl">
              <thead class="bg-gray-200 uppercase text-sm leading-normal">
                <tr className="bg-rose-200">
                  <th class="py-3 px-4 text-center">POSITION</th>
                  <th class="py-3 px-4 text-center">USERNAME</th>
                  <th class="py-3 px-4 text-center">SCORE</th>
                </tr>
              </thead>
              <tbody class="text-gray-700 text-sm font-light bg-rose-50">
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
          <div className="mt-6">
            <Link
              to='/'
              className='text-sm font-semibold text-gray-900 default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none'
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};