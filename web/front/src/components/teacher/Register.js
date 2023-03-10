import React from 'react';
import logo from '../../style/logoPictoboom small.png';
import "../../style/style.css"

const Register = () => {
  return (
    <div>
      {/* <a href='/'>Main</a>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>User:</label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={handlerChangeUsername}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handlerChangePassword}
        />

        <button type='submit'>Login</button>
      </form> */}

      <div className="flex h-50 w-1/2 py-12 px-4 sm:px-6 lg:px-8 m-[auto] border-rose-600 rounded-lg bg-rose-50 shadow-2xl">
        <div className="w-full max-w-md space-y-8 m-[auto]">
            <div>
                <a href='/'><img className="mx-auto h-20 w-auto" src={logo} alt="Your Company"></img></a>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register your account</h2>
                
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true"></input>
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input id="username" name="username" type="username" required className="relative block w-full border-0 py-1.5 p-3 rounded-md text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Username"></input>
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email</label>
                        <input id="email-address" name="email" type="email" required className="relative block w-full border-0 py-1.5 mt-2 p-3 rounded-md text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address"></input>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" required className="relative block w-full border-0 py-1.5 mt-6 p-3 rounded-md text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password"></input>
                    </div>
                    <div>
                        <label htmlFor="password-confirmation" className="sr-only">Password</label>
                        <input id="password-confirmation" name="password-confirmation" type="password" required className="relative block w-full border-0 py-1.5 mt-2 p-3 rounded-md text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password"></input>
                    </div>
                </div>
                <div>
                    <button type="submit" className="group relative flex w-full justify-center rounded-md bg-rose-500 py-2 px-3 text-sm font-semibold text-white hover:pink-to-orange-gr focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-rose-200 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Register
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
