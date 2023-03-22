import logoSmall from '../style/logoPictoboomSmall.png';
import '../style/landingStyle.css';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="flex items-center h-screen bg-cover bg-center w-screen bg-[url('../style/spinning-bg-only-pinchitos.png')]">
      <div className='mx-auto max-w-2xl'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
        <div className='text-center '>
          <img className='w-96 m-[auto]' src={logoSmall} alt='Logo' />
          <p className='mt-6 text-lg leading-8 text-slate-700 font-semibold'>
            ¡PictoBoom, where your drawings come alive!<br></br>
          </p>
          <div className='mt-10 block gap-x-6 relative group'>
            <div className='absolute inset-2 bottom-5 bg-gray-100 w-[95%] blur-2xl h-28 animate-bounce opacity-75  group-hover:opacity-100 transition duration-200'></div>
            <Link
              to='/joinGame'
              className='relative default-button block m-4 text-2xl font-extrabold text-orange-600 hover:text-white shadow-2xl hover:pink-to-orange-gr hover:outline-gray-100 outline-orange-600 animate-bounce p-12'
            >
              Play now!
            </Link>
            <Link
              to='/createGame' //This Link is Provisional, when we have login make, here we put the login
              className='text-sm font-semibold block m-4 mt-6 text-gray-900 default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none'
            >
              Are you the teacher?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
