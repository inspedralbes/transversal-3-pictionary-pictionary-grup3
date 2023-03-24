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
      <div className="h-screen max-w-4xl m-[auto] overflow-y-hidden">
        <div className="text-center mt-44">
          <h1 className="w-9/12 mx-auto mb-5 text-4xl font-bold rounded-md bg-rose-50 text-rose-400 leading-tight">USER RANKING</h1>
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
            <div className="mx-auto float-right w-16 mt-5 bg-transparent text-rose-200">
              <Link to="/">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.2796 3.71579C12.097 3.66261 11.903 3.66261 11.7203 3.71579C11.6678 3.7311 11.5754 3.7694 11.3789 3.91817C11.1723 4.07463 10.9193 4.29855 10.5251 4.64896L5.28544 9.3064C4.64309 9.87739 4.46099 10.0496 4.33439 10.24C4.21261 10.4232 4.12189 10.6252 4.06588 10.8379C4.00765 11.0591 3.99995 11.3095 3.99995 12.169V16C3.99995 16.9456 4.0005 17.6047 4.03569 18.1205C4.07028 18.6275 4.13496 18.9227 4.22832 19.148C4.5328 19.8831 5.11682 20.4672 5.8519 20.7716C6.07729 20.865 6.37249 20.9297 6.8794 20.9643C7.3953 20.9995 8.05439 21 8.99995 21H15C15.9455 21 16.6046 20.9995 17.1205 20.9643C17.6274 20.9297 17.9226 20.865 18.148 20.7716C18.8831 20.4672 19.4671 19.8831 19.7716 19.148C19.8649 18.9227 19.9296 18.6275 19.9642 18.1205C19.9994 17.6047 20 16.9456 20 16V12.169C20 11.3095 19.9923 11.0591 19.934 10.8379C19.878 10.6252 19.7873 10.4232 19.6655 10.24C19.5389 10.0496 19.3568 9.87739 18.7145 9.3064L13.4748 4.64896C13.0806 4.29855 12.8276 4.07463 12.621 3.91817C12.4245 3.7694 12.3321 3.7311 12.2796 3.71579ZM11.1611 1.79556C11.709 1.63602 12.2909 1.63602 12.8388 1.79556C13.2189 1.90627 13.5341 2.10095 13.8282 2.32363C14.1052 2.53335 14.4172 2.81064 14.7764 3.12995L20.0432 7.81159C20.0716 7.83679 20.0995 7.86165 20.1272 7.88619C20.6489 8.34941 21.0429 8.69935 21.3311 9.13277C21.5746 9.49916 21.7561 9.90321 21.8681 10.3287C22.0006 10.832 22.0004 11.359 22 12.0566C22 12.0936 22 12.131 22 12.169V16.0355C22 16.9373 22 17.6647 21.9596 18.2567C21.918 18.8654 21.8305 19.4037 21.6194 19.9134C21.1119 21.1386 20.1385 22.1119 18.9134 22.6194C18.4037 22.8305 17.8654 22.9181 17.2566 22.9596C16.6646 23 15.9372 23 15.0355 23H8.96443C8.06267 23 7.33527 23 6.74326 22.9596C6.13452 22.9181 5.59624 22.8305 5.08654 22.6194C3.8614 22.1119 2.88803 21.1385 2.38056 19.9134C2.16943 19.4037 2.08187 18.8654 2.04033 18.2567C1.99994 17.6647 1.99995 16.9373 1.99995 16.0355L1.99995 12.169C1.99995 12.131 1.99993 12.0936 1.99992 12.0566C1.99955 11.359 1.99928 10.832 2.1318 10.3287C2.24383 9.90321 2.42528 9.49916 2.66884 9.13277C2.95696 8.69935 3.35105 8.34941 3.87272 7.8862C3.90036 7.86165 3.92835 7.83679 3.95671 7.81159L9.22354 3.12996C9.58274 2.81064 9.89467 2.53335 10.1717 2.32363C10.4658 2.10095 10.781 1.90627 11.1611 1.79556Z"
                      fill="#0F1729"
                    ></path>
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};