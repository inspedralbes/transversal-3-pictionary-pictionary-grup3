import React, { useState } from 'react';
import logo from '../../style/logoPictoboom small.png';
import '../../style/style.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log('Response:', json);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='flex py-12 px-4 h-screen bg-rose-50 shadow-2xl lg:mt-20 lg:h-full lg:w-1/2 lg:px-8 lg:m-[auto] lg:rounded-lg'>
        <div className='w-full max-w-md space-y-8 m-[auto]'>
          <div>
            <a href='/'>
              <img
                className='mx-auto h-20 w-auto'
                src={logo}
                alt='Your Company'
              ></img>
            </a>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
          </div>
          <form className='mt-8 space-y-6' action='#' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' value='true'></input>
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label htmlFor='username-address' className='sr-only'>
                  Username
                </label>
                <input
                  id='username-address'
                  name='username'
                  type='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete='username'
                  required
                  className='relative block w-full p-3 rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6'
                  placeholder='username address'
                ></input>
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  required
                  className='relative block w-full p-3 rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6'
                  placeholder='Password'
                ></input>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                ></input>
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <Link
                  to='/register'
                  className='font-medium text-rose-800 hover:text-indigo-500'
                >
                  Havn't an account yet?
                </Link>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md bg-rose-500 py-2 px-3 text-sm font-semibold text-white hover:pink-to-orange-gr focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-rose-200 group-hover:text-indigo-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
