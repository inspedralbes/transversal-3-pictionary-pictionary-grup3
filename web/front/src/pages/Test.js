import React from 'react';

const createNewLobby = ({ socket }) => {

    const createLobby = () => {
        socket.emit('new lobby', {
            lobby_code: 123,
            maxUsers: 2,
            category: 1,
            words: {
                category: 'Categoria 1',
                words: [
                    {
                        word: 'Word 1',
                        description: 'Description word 1',
                        word_ca: 'Paraula 1',
                        description_ca: 'Descripció paraula 1'
                    },
                    {
                        word: 'Word 2',
                        description: 'Description word 2',
                        word_ca: 'Paraula 2',
                        description_ca: 'Descripció paraula 2'
                    }
                ]
            }
        });
    }

    socket.on('lobbies list', function (data) {
        console.log('lobbies list', data);
    });

    const joinLobby1 = () => {
        socket.emit('join room', {
            name: "test1",
            userId: 1,
            lobby_code: 123,
        });
    }

    const joinLobby2 = () => {
        socket.emit('join room', {
            name: "test2",
            userId: 2,
            lobby_code: 123,
        });
    }

    socket.on('lobby user list', function (data) {
        console.log('lobby user list', data);
    });

    const readyLobby = () => {
        socket.emit('ready user');
    }

    socket.on('start game', function (data) {
        console.log('start game', data);
    });

    const leaveLobby = () => {
        socket.emit('leave lobby');
    }

    const nextRound = () => {
        socket.emit('next round');
    }

    socket.on('next round', function (data) {
        console.log('next round', data);
    });

    const correctWord = () => {
        socket.emit('correct word', {
            score: 50,
        });
    }

    socket.on('correct word', function (data) {
        console.log('correct word', data);
    });

    socket.on('finished game', function (data) {
        console.log('finished game', data);
    });

    return (
        <>
            <button onClick={createLobby}>Create a new lobby</button>
            <br></br><button onClick={joinLobby1}>Join lobby user 1</button>
            <br></br><button onClick={joinLobby2}>Join lobby user 2</button>
            <br></br><button onClick={readyLobby}>Ready lobby</button>
            <br></br><button onClick={correctWord}>Correct word</button>
            <br></br><button onClick={nextRound}>Next round</button>
            <br></br><button onClick={leaveLobby}>Leave lobby</button>
        </>
    );

};

export default createNewLobby;