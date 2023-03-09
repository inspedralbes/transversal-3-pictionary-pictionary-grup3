import React from 'react';

const CreateGame = () => {
    return (
        <div>
            <label>Here's the code to your lobby! Have FUN!</label>
            <p id="code">{codeGenerator(6)}</p>
        </div>
    );
};

function codeGenerator(long) {
        let items = "0123456789";
        let code = "";
        for (let i = 0; i < long; i++) {
            code += items.charAt(Math.floor(Math.random() * items.length));
        }
        return code;
}

export default CreateGame;
