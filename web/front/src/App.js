import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './components/Landing';
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
  return <RouterProvider router={router} />;
}

export default App;
