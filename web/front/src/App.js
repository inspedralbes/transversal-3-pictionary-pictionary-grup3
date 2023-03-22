import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';

import {
  LandingPage,
  JoinGame,
  CreateGame,
  RegisterForm,
  LoginForm,
  PlayGame,
  RankingGame
} from './pages';
import Test from './pages/Test';


import { Provider } from 'react-redux';
import { store } from './app/store';

const socket = socketIO.connect('http://localhost:7500');

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
          <Route path='/test' element={<Test socket={socket} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
