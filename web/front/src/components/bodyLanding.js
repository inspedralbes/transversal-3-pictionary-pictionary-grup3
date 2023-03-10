import logo from '../style/logoPictoboom.png';
import logoSmall from '../style/logoPictoboom small.png';
import bgImage from '../style/webBackground.png';
import { Link } from 'react-router-dom';

export default function bodyLanding() {
  return (
    <div className="relative px-6 lg:px-8 bg-[url('../style/webBackground.png')] h-screen">
      <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-10'>
        <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
        <div className='text-center '>
          <img className='w-96 m-[auto] mt-40' src={logoSmall} alt='Logo' />
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            ¡PictoBoom, where your drawings come alive!<br></br>
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              to='/joinGame'
              className='default-button text-sm font-semibold text-gray-100 hover:text-white shadow-sm hover:pink-to-orange-gr hover:outline-none outline-orange-600'
            >
              Play now!
            </Link>
            <Link
              to='/login'
              className='text-sm font-semibold text-gray-900 default-button hover:bg-gray-900 hover:text-gray-100 hover:outline-none'
            >
              Are you the teacher?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
