import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './style/App.css';
import Landing from './pages/Landing';
import Login from './Components/teacher/Login';
import Register from './Components/teacher/Register';
import CreateGame from './Components/teacher/CreateGame';
import JoinGame from './Components/students/JoinGame';

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
  {
    path: '/joinGame', 
    element: <JoinGame />,
  }
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
