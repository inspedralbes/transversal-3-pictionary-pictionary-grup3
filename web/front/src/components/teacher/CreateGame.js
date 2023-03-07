import React from 'react';

const CreateGame = () => {

    function codeGenerator(long) {
        var items = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var code = "";
        for (var i = 0; i < long; i++) {
            code += items.charAt(Math.floor(Math.random() * items.length));
        }
        return code;
    }

    return (
        <div>
            <label>Here's the code to your lobby! Have FUN!</label>
            <p id="code">{codeGenerator(10)}</p>
        </div>
    );
};

export default CreateGame;
