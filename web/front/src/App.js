import socketIO from 'socket.io-client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/App.css';
import Landing from './pages/Landing';
import Login from './Components/teacher/Login';
import Register from './Components/teacher/Register';
import CreateGame from './Components/teacher/CreateGame';
import JoinGame from './Components/students/JoinGame';

const socket = socketIO.connect('http://localhost:7500');

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing socket={socket} />} />
        <Route path='/login' element={<Login socket={socket} />} />
        <Route path='/register' element={<Register socket={socket} />} />
        <Route path='/createGame' element={<CreateGame socket={socket} />} />
        <Route path='/joinGame' element={<JoinGame socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
