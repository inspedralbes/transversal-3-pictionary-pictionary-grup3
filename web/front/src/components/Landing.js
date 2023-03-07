import React, { useState } from 'react';
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
                    <a href='/login'>Login</a>
                    <a href='/register'>Register</a>
                    <a href='/createGame'>Game</a>
                </>
            )}
        </div>
    );
};

export default Landing;
