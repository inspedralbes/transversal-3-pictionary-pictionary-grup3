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
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              to='/joinGame'
              className='default-button text-sm font-semibold text-gray-100 hover:text-white shadow-sm hover:pink-to-orange-gr hover:outline-none outline-orange-600 animate-bounce'
            >
              Play now!
            </Link>
            <Link
              to='/createGame' //This Link is Provisional, when we have login make, here we put the login
              className='text-sm font-semibold text-gray-900 default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none'
            >
              Are you the teacher?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
