import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';

import {
  LandingPage,
  JoinGame,
  CreateGame,
  RegisterForm,
  LoginForm,
  PlayGame,
  RankingGame,
  Profile,
  Categories,
  CreateCategories,
  AddWords,
} from './pages';

import { Provider } from 'react-redux';
import { store } from './app/store';

let socket = socketIO('http://tr3-g3.alumnes.inspedralbes.cat:7500', {
  withCredentials: true,
  cors: {
    origin: "*",
    credentials: true,
  },
  path: "/node/",
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/joinGame' element={<JoinGame socket={socket} />} />
          <Route path='/createGame' element={<CreateGame socket={socket} />} />
          <Route path='/playGame' element={<PlayGame socket={socket} />} />
          <Route path='/rankingGame' element={<RankingGame />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/createCategories' element={<CreateCategories />} />+
          <Route path='/addWords' element={<AddWords />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
