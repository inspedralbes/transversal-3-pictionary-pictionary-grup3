import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Medal1, Medal2, Medal3, MedalNoTop } from "../components/Medals";
import { Link } from "react-router-dom";

export const RankingGame = () => {
  let dataScoreBoard = useSelector((state) => state.scoreBoard.score);
  const [scoreSort, setScoreSort] = useState([]);

  useEffect(() => {
    let test = dataScoreBoard.scoreBoard;
  //   setScoreSort([...test].sort((a, b) => b.score - a.score));
  // }, [dataScoreBoard]);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center bg-[url('../style/spinning-bg-only-pinchitos.png')] transform duration-200 easy-in-out">
      <div className="flex justify-center items-center -mt-20">
        <div className="">
          <div className="mt-6 flex justify-end">
              <Link
                to='/'
                className=''
              >
                <svg className="w-10 mb-5" fill="#000000" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 19.2811 49.5156 C 20.5233 49.5156 21.3436 48.6719 21.3436 47.4531 C 21.3436 46.8438 21.1561 46.3984 20.7811 46.0234 L 14.0311 39.4375 L 9.5780 35.6406 L 15.0858 35.8750 L 44.9920 35.8750 C 50.4529 35.8750 52.7267 33.3672 52.7267 28.0703 L 52.7267 14.2188 C 52.7267 8.7578 50.4529 6.4844 44.9920 6.4844 L 31.8671 6.4844 C 30.5780 6.4844 29.7342 7.4219 29.7342 8.5703 C 29.7342 9.7188 30.5780 10.6562 31.8671 10.6562 L 44.9920 10.6562 C 47.4764 10.6562 48.5545 11.7344 48.5545 14.2188 L 48.5545 28.0703 C 48.5545 30.6250 47.4764 31.7031 44.9920 31.7031 L 15.0858 31.7031 L 9.5780 31.9375 L 14.0311 28.1406 L 20.7811 21.5547 C 21.1561 21.1797 21.3436 20.7109 21.3436 20.1016 C 21.3436 18.9062 20.5233 18.0391 19.2811 18.0391 C 18.7655 18.0391 18.1561 18.2969 17.7577 18.6953 L 3.9764 32.2188 C 3.5077 32.6640 3.2733 33.2031 3.2733 33.7891 C 3.2733 34.3516 3.5077 34.9140 3.9764 35.3594 L 17.7577 48.8828 C 18.1561 49.2813 18.7655 49.5156 19.2811 49.5156 Z"></path></g></svg>
              </Link>
            </div>
          <h1 className="w-52 lg:w-[800px] md:w-[600px] mx-auto mt-5 lg:mt-0 md:mt-0 mb-5 text-4xl text-center font-bold rounded-md bg-rose-50 text-rose-400 leading-tight">USER RANKING</h1>
          <div className="lg:overflow-hidden md:overflow-hidden">
            <table className="lg:mx-auto md:mx-auto lg:w-full md:w-full text-center shadow-2xl border-4 border-rose-500 rounded-xl">
              <thead className="bg-gray-200 uppercase text-sm leading-normal">
                <tr className="bg-rose-200">
                  <th className="py-3 px-4 text-center">POSITION</th>
                  <th className="py-3 px-4 text-center">USERNAME</th>
                  <th className="py-3 px-4 text-center">SCORE</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light bg-rose-50">
                {scoreSort.map((player, key) => (
                  key < 5 && (
                    <tr className="hover:bg-rose-100" key={key}>
                      {key === 0 && <Medal1 />}
                      {key === 1 && <Medal2 />}
                      {key === 2 && <Medal3 />}
                      {key > 2 && <MedalNoTop />}
                      <td className="py-3 px-4 border-b border-gray-200">
                        {player.name.toUpperCase()}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
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


      {/* <div className="items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="w-[800px] mx-auto mb-5 text-4xl font-bold rounded-md bg-rose-50 text-rose-400 leading-tight">USER RANKING</h1>
          <div className="overflow-hidden">
            <table className="w-full text-center shadow-2xl border-4 border-rose-500 rounded-xl">
              <thead className="bg-gray-200 uppercase text-sm leading-normal">
                <tr className="bg-rose-200">
                  <th className="py-3 px-4 text-center">POSITION</th>
                  <th className="py-3 px-4 text-center">USERNAME</th>
                  <th className="py-3 px-4 text-center">SCORE</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light bg-rose-50">
                {scoreSort.map((player, key) => (
                  key < 5 && (
                    <tr className="hover:bg-rose-100" key={key}>
                      {key === 0 && <Medal1 />}
                      {key === 1 && <Medal2 />}
                      {key === 2 && <Medal3 />}
                      {key > 2 && <MedalNoTop />}
                      <td className="py-3 px-4 border-b border-gray-200">
                        {player.name.toUpperCase()}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        
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
    </div> */}
    </div>


  );
};