import React, { useState } from 'react';
import Login from './teacher/Login';
import Register from './teacher/Register';
import JoinGame from './students/JoinGame';

const Landing = () => {
  const [isStudent, setIsStudent] = useState(true);

  const handlerChangeStudent = () => {
    isStudent ? setIsStudent(false) : setIsStudent(true);
  };
  return (
    <div>
      <button onClick={handlerChangeStudent}>Change</button>
      {isStudent ? (
        <JoinGame />
      ) : (
        <>
          <Login /> <Register />
        </>
      )}
    </div>
  );
};

export default Landing;
