import React from 'react';

const createNewLobby = ({ socket }) => {

    const createLobby = () => {
        socket.emit('new lobby', {
            lobby_code: 123,
            maxUsers: 5,
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
        console.log(data);
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
        console.log(data);
    });

    const readyLobby = () => {
        socket.emit('ready user');
    }

    socket.on('users ready', function (data) {
        console.log(data);
    });

    socket.on('start game', function (data) {
        console.log(data);
    });

    const leaveLobby = () => {
        socket.emit('leave lobby');
    }

    return (
        <>
            <button onClick={createLobby}>Create a new lobby</button>
            <br></br><button onClick={joinLobby1}>Join lobby 1</button>
            <br></br><button onClick={joinLobby2}>Join lobby 2</button>
            <br></br><button onClick={readyLobby}>Ready lobby</button>
            <br></br><button onClick={leaveLobby}>Leave lobby</button>
        </>
    );

};

export default createNewLobby;