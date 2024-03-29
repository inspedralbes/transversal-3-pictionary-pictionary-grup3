const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 7500;
const host = '0.0.0.0';

let lobbies = [];

const io = require("socket.io")(server, {
    cors: {
        origin: true,
        credentials: true,
    },
    path: "/node/",
});

io.on("connection", (socket) => {
    socket.data.current_lobby = null;

    socket.on("get lobbies", () => {
        sendLobbyList();
    });

    socket.on("new lobby", (data) => {
        let lobby_exists = false;
        lobbies.forEach((element) => {
            if (element.lobby_code == data.lobby_code) {
                lobby_exists = true;
            }
        });
        if (!lobby_exists) {
            let randomWords = data.words.words;
            const random = () => Math.random() - 0.5;
            lobbies.push({
                lobby_code: data.lobby_code,
                category: data.category,
                maxUsers: data.maxUsers,
                created: new Date().getTime(),
                teacher: data.teacher,
                users: [],
                userWords: [],
                round: 0,
                turn: 0,
                totalTurns: 0,
                painter: null,
                word: "",
                words: randomWords.sort(random),
                timer: 93,
                // drawings: [],
            });
            sendLobbyList();
        }
    });

    socket.on("join room", (data) => {
        let available = true;
        let joinedOrError = false;
        if (lobbies.length > 0) {
            lobbies.forEach((lobby) => {
                if (lobby.lobby_code == data.lobby_code) {
                    if (lobby.users.length < lobby.maxUsers) {
                        lobby.users.forEach(user => {
                            if (user.name == data.name) {
                                available = false;
                            }
                        });
                        if (available) {
                            lobby.users.push({
                                name: data.name,
                                userId: data.userId,
                                ready: false,
                                score: 0,
                                answered: false,
                                status: "connected",
                            });
                            socket.join(data.lobby_code);
                            socket.data.current_lobby = data.lobby_code;
                            socket.data.name = data.name;
                            socket.data.userId = data.userId;
                            joinedOrError = true;
                            sendUserList(socket);
                        } else {
                            io.to(socket.id).emit("not joined", {
                                "errorMsg": "Name not available",
                            });
                            joinedOrError = true;
                        }
                    } else {
                        io.to(socket.id).emit("not joined", {
                            "errorMsg": "Lobby is full",
                        });
                        joinedOrError = true;
                    }
                }
            });
            if (!joinedOrError) {
                io.to(socket.id).emit("not joined", {
                    "errorMsg": "Lobby doesn't exist",
                });
            }
        } else {
            io.to(socket.id).emit("not joined", {
                "errorMsg": "Lobby doesn't exist",
            });
        }
    });

    socket.on("get user list", () => {
        sendUserList(socket);
    });

    socket.on('draw', function (data) {
        // lobbies.forEach((lobby) => {
        // if (lobby.lobby_code == socket.data.current_lobby) {
        //     switch (data.action) {
        //         case 'i': lobby.drawings.push(data);
        //             break;
        //         case 'p': lobby.drawings.push(data);
        //             break;
        //         case 'b': lobby.drawings = [];
        //             break;
        //         default:
        //             break;
        //     }
        // }
        // });
        io.to(socket.data.current_lobby).emit("draw", {
            data
        });
    });

    socket.on("ready user", () => {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                lobby.users.forEach((user) => {
                    if (user.name == socket.data.name) {
                        user.ready = true;
                    }
                });
                let ready = 0;
                lobby.users.forEach((user) => {
                    if (user.ready) {
                        ready++;
                    }
                });
                if (ready == lobby.maxUsers) {
                    lobby.round = 1;
                    lobby.turn = 1;
                    lobby.totalTurns = 1;
                    lobby.painter = lobby.users[0].name;
                    lobby.word = lobby.words[0].word;
                    io.to(socket.data.current_lobby).emit("start game", { lobby });
                } else {
                    sendUserList(socket);
                }
            }
        });
    });

    socket.on("next turn", () => {
        nextTurn(socket.data.current_lobby);
    });

    socket.on("word inserted", (data) => {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                if (lobby.word == data.word) {
                    lobby.users.forEach((user) => {
                        if (user.name == socket.data.name) {
                            user.answered = true;
                            user.score = user.score + (data.time + 10);
                            io.to(socket.data.current_lobby).emit("correct word", { lobby });
                            lobby.userWords.unshift({
                                name: socket.data.name,
                                word: "Answered correctly",
                            });
                        }
                    });
                } else {
                    lobby.userWords.unshift({
                        name: socket.data.name,
                        word: "Answered wrong",
                    });
                }
                io.to(socket.data.current_lobby).emit("word inserted", lobby.userWords);
                let usersAnswered = 0;
                lobby.users.forEach((user) => {
                    if (user.answered || user.status == "disconnected") {
                        usersAnswered++;
                    }
                });
                if (usersAnswered == lobby.users.length - 1) {
                    lobby.timer = 0;
                }
            }
        });
    });

    socket.on("leave lobby", () => {
        leaveLobby(socket, "leave");
        sendLobbyList();
    });

    socket.on("disconnect", () => {
        leaveLobby(socket, "disconnect");
    });

});

function sendUserList(socket) {
    let list;
    let maxUsers;
    if (socket) {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                list = lobby.users;
                maxUsers = lobby.maxUsers;
            }
        });
        io.to(socket.data.current_lobby).emit("lobby user list", {
            list: list,
            maxUsers: maxUsers
        });
        sendLobbyList();
    }
}

function leaveLobby(socket, type) {
    lobbies.forEach((lobby) => {
        if (lobby.lobby_code == socket.data.current_lobby) {
            lobby.users.forEach((user, index) => {
                if (user.name == socket.data.name) {
                    if (type == "disconnect") {
                        user.status = "disconnected";
                    } else {
                        lobby.users.splice(index, 1);
                    }
                }
            });
        }
    });
    socket.leave(socket.data.current_lobby);
    sendUserList(socket);
    socket.data.current_lobby = null;
}

function sendLobbyList() {
    io.emit("lobbies list", lobbies);
}

function nextTurn(current_lobby) {
    lobbies.forEach((lobby, index) => {
        if (lobby.lobby_code == current_lobby) {
            if (lobby.turn == lobby.users.length && lobby.round == 3) {
                io.to(current_lobby).emit("finished game", { "scoreBoard": lobby.users });
                lobbies.splice(index, 1);
                sendLobbyList();
            } else {
                if (lobby.turn == lobby.users.length && lobby.round < 3) {
                    lobby.round = lobby.round + 1;
                    lobby.turn = 1;
                } else {
                    lobby.turn = lobby.turn + 1;
                }
                lobby.totalTurns = lobby.totalTurns + 1;
                if (lobby.users[lobby.turn - 1].status == "connected") {
                    lobby.painter = lobby.users[lobby.turn - 1].name;
                } else {
                    lobby.timer = 0;
                }
                lobby.word = lobby.words[lobby.totalTurns - 1].word;
                lobby.users.forEach((user) => {
                    user.answered = false;
                });
                io.to(current_lobby).emit("next turn", { lobby });
            }
        }
    });
};

setInterval(function () {
    lobbies.forEach((lobby) => {
        if (lobby.totalTurns > 0) {
            if (lobby.timer == 0) {
                lobby.timer = 93;
                nextTurn(lobby.lobby_code);
                io.to(lobby.lobby_code).emit("timer", lobby.timer);
            } else {
                lobby.timer = lobby.timer - 1;
            }
        }
    });
}, 1000);

setInterval(function () {
    lobbies.forEach((lobby, index) => {
        let diference = ((new Date().getTime() - lobby.created) / 60) / 1000;
        if (parseInt(diference) >= 30 && lobby.users.length === 0) {
            lobbies.splice(index, 1);
        }
        sendLobbyList();
    });
}, 1000 * 30);

server.listen(port, host, () => {
    console.log("Listening on " + host + ":" + port);
    setInterval(function () {
        console.log("Server is on - " + new Date().toLocaleString());
    }, 1000 * 60);
});