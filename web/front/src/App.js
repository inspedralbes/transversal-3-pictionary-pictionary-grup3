import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './style/style.css';
import Landing from './pages/Landing';
import Login from './Components/teacher/Login';
import Register from './Components/teacher/Register';
import CreateGame from './Components/teacher/CreateGame';

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
    <RouterProvider router={router} />
  );
}

export default App;
