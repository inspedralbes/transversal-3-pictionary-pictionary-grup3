import React from 'react';

const createNewLobby = ({ socket }) => {

    const createLobby = () => {
        socket.emit('new lobby', {
            lobby_code: 123,
            maxUsers: 2,
            category: 1,
            words: {
                category: '1',
                words: [
                    { word: 'cat', description: 'A small carnivorous mammal and a popular pet', word_ca: 'Gat', description_ca: 'Un petit mamífer carnívor i una mascota popular' },
                    { word: 'dog', description: 'A domesticated mammal and a popular pet', word_ca: 'Gos', description_ca: 'Un mamífer domèstic i una mascota popular' }
                    ,
                    { word: 'lion', description: 'A large carnivorous feline found in Africa and Asia', word_ca: 'Lleó', description_ca: "Un gran fèlid carnívor que es troba a l'Àfrica i l'Àsia" }
                    ,
                    { word: 'elephant', description: 'A large mammal with a long trunk and tusks', word_ca: 'Elefant', description_ca: 'Un gran mamífer amb una trompa i preses' }
                    ,
                    { word: 'giraffe', description: 'A tall African mammal with a long neck and spots', word_ca: 'Girafa', description_ca: 'Un mamífer africà alt amb un coll llarg i taques' }
                    ,
                    { word: 'horse', description: 'A large domesticated mammal used for riding and racing', word_ca: 'Cavall', description_ca: 'Un gran mamífer domèstic utilitzat per a la equitació i les curses' }
                    ,
                    { word: 'bird', description: 'A warm-blooded egg-laying vertebrate with feathers', word_ca: 'Ocell', description_ca: 'Un vertebrat que pon ous de sang calenta i amb plomes' }
                    ,
                    { word: 'fish', description: 'A cold-blooded aquatic vertebrate with scales', word_ca: 'Peix', description_ca: 'Un vertebrat aquàtic de sang freda amb escates' }
                    ,
                    { word: 'frog', description: 'A cold-blooded amphibian with smooth skin and long hind legs', word_ca: 'Granota', description_ca: 'Un amfibi de sang freda amb pell suau i potes posteriors llargues' }
                    ,
                    { word: 'butterfly', description: 'A flying insect with brightly colored wings', word_ca: 'Papallona', description_ca: 'Un insecte volador amb ales de colors' }
                    ,
                    { word: 'penguin', description: 'A flightless bird that lives in cold climates and has a distinctive black and white coloration', word_ca: 'Pingüí', description_ca: 'Un ocell sense vol que viu en climes freds i té una coloració distintiva en blanc i negre' }
                    ,
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

    const nextTurn = () => {
        socket.emit('next turn');
    }

    socket.on('next turn', function (data) {
        console.log('next turn', data);
    });

    const correctWord = () => {
        socket.emit('word inserted', {
            word: "Word 1",
            time: 50,
        });
    }

    socket.on('word inserted', function (data) {
        console.log('word inserted', data);
    });

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
            <br></br><button onClick={nextTurn}>Next turn</button>
            <br></br><button onClick={leaveLobby}>Leave lobby</button>
        </>
    );

};

export default createNewLobby;