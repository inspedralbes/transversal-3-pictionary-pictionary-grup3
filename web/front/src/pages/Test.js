import React from 'react';

const createNewLobby = ({ socket }) => {

    const createLobby = () => {
        socket.emit('new lobby', {
            lobby_code: 123,
            maxUsers: 5,
            category: 1,
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

    const leaveLobby = () => {
        socket.emit('leave lobby');
    }

    return (
        <>
            <button onClick={createLobby}>Create a new lobby</button>
            <br></br><button onClick={joinLobby1}>Join lobby 1</button>
            <br></br><button onClick={joinLobby2}>Join lobby 2</button>
            <br></br><button onClick={leaveLobby}>Leave lobby</button>
        </>
    );

};

export default createNewLobby;