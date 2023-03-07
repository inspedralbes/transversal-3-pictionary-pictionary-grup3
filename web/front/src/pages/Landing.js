import React, { useState } from 'react';
import JoinGame from '../components/students/JoinGame';

const Landing = () => {
    return (
        <div>
            <>
                <a href='/login'>Login</a>
                <a href='/register'>Register</a>
                <a href='/createGame'>Game</a>
            </>
        </div>
    );
};

export default Landing;