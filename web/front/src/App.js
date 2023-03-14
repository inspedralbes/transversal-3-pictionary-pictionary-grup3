import socketIO from 'socket.io-client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/style.css';
import Landing from './pages/Landing';
import Login from './components/teacher/Login';
import Register from './components/teacher/Register';
import CreateGame from './components/teacher/CreateGame';
import JoinGame from './components/students/JoinGame';
import PlayGame from './pages/PlayGame';
import WaitingRoom from './components/students/WaitingRoom';
import Test from './pages/Test';

const socket = socketIO.connect('http://localhost:7500');

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landing socket={socket} />} />
          <Route path='/login' element={<Login socket={socket} />} />
          <Route path='/register' element={<Register socket={socket} />} />
          <Route path='/createGame' element={<CreateGame socket={socket} />} />
          <Route path='/joinGame' element={<JoinGame socket={socket} />} />
          <Route path='/playGame' element={<PlayGame socket={socket} />} />
          <Route path='/test' element={<Test socket={socket} />} />
          <Route
            path='/waitingRoom'
            element={<WaitingRoom socket={socket} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
