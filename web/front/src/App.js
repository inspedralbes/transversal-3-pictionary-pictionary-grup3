import socketIO from 'socket.io-client';

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './style/App.css';
import Landing from './pages/Landing';
import Login from './components/teacher/Login';
import Register from './components/teacher/Register';
import CreateGame from './components/teacher/CreateGame';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/createGame',
    element: <CreateGame />,
  },
]);
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing socket={socket} />} />
        <Route path='/login' element={<Login socket={socket} />} />
        <Route path='/register' element={<Register socket={socket} />} />
        <Route path='/createGame' element={<CreateGame socket={socket} />} />
        <Route path='/joinGame' element={<JoinGame socket={socket} />} />
        <Route path='/playGame' element={<PlayGame socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
