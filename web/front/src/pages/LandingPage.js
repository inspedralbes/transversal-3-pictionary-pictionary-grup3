import logoSmall from "../style/logoPictoboomSmall.png";
import "../style/landingStyle.css";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className='mx-auto -mt-5 max-w-2xl'>
        <div className='flex justify-end mr-5'>
          <Link to='/profile'>
              <svg className='w-14' fill="#000000" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M228,128A100,100,0,1,0,60.71,201.90967a3.97048,3.97048,0,0,0,.842.751,99.79378,99.79378,0,0,0,132.8982-.00195,3.96558,3.96558,0,0,0,.83813-.74756A99.76267,99.76267,0,0,0,228,128ZM36,128a92,92,0,1,1,157.17139,64.87207,75.616,75.616,0,0,0-44.50782-34.04053,44,44,0,1,0-41.32714,0,75.61784,75.61784,0,0,0-44.50782,34.04A91.70755,91.70755,0,0,1,36,128Zm92,28a36,36,0,1,1,36-36A36.04061,36.04061,0,0,1,128,156ZM68.86475,198.417a68.01092,68.01092,0,0,1,118.27.00049,91.80393,91.80393,0,0,1-118.27-.00049Z"></path> </g></svg>
          </Link>
        </div>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
        <div className='text-center '>
          <img className='w-72 md:w-96 lg:w-96 m-[auto]' src={logoSmall} alt='Logo' />
          <p className='mt-6 text-lg leading-8 text-slate-700 font-semibold'>
            ¡PictoBoom, where your drawings come alive!<br></br>
          </p>
          <div className="mt-10 block gap-x-6 relative group">
            <div className="absolute inset-2 bottom-5 bg-gray-100 w-[95%] blur-2xl h-28 animate-bounce opacity-75  group-hover:opacity-100 transition duration-200"></div>
            <Link
              to='/joinGame'
              className='pincel relative mx-6 mb-5 default-button block lg:m-4 text-2xl font-extrabold text-orange-600 hover:text-white shadow-2xl hover:pink-to-orange-gr hover:outline-gray-100 outline-orange-600 animate-bounce p-12'
            >
              Play now!
            </Link>

            <div className="mt-6">
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-900 default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none"
              >
                Are you a teacher?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
