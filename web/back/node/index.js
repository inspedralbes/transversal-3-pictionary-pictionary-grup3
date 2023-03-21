const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let lobbies = [];

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
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
                users: [],
                userWords: [],
                round: 0,
                turn: 0,
                totalTurns: 0,
                painter: null,
                // drawings: [],
                word: "",
                words: randomWords.sort(random),
            });
            sendLobbyList();
        }
    });

    socket.on("join room", (data) => {
        let available = true;
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
                        });
                    }
                }
            }
        });
        socket.join(data.lobby_code);
        socket.data.current_lobby = data.lobby_code;
        socket.data.name = data.name;
        socket.data.userId = data.userId;
        sendUserList(socket);
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
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                if (lobby.turn == lobby.users.length && lobby.round == 3) {
                    let finishedLobbyUsers = lobby.users;
                    // lobby.drawings = [];
                    lobby.round = 0;
                    lobby.turn = 0;
                    lobby.totalTurns = 0;
                    lobby.painter = null;
                    lobby.word = "";
                    lobby.users.forEach((user) => {
                        user.ready = false;
                        user.score = 0;
                        user.answered = false;
                    });
                    io.to(socket.data.current_lobby).emit("finished game", { "scoreBoard": finishedLobbyUsers, "lobby": lobby });
                } else {
                    if (lobby.turn == lobby.users.length && lobby.round < 3) {
                        lobby.round = lobby.round + 1;
                        lobby.turn = 1;
                    } else {
                        lobby.turn = lobby.turn + 1;
                    }
                    lobby.totalTurns = lobby.totalTurns + 1;
                    lobby.painter = lobby.users[lobby.turn - 1].name;
                    lobby.word = lobby.words[lobby.totalTurns - 1].word;
                    lobby.users.forEach((user) => {
                        user.answered = false;
                    });
                    io.to(socket.data.current_lobby).emit("next turn", { lobby });
                }
            }
        });
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
                            lobby.userWords.push({
                                name: socket.data.name,
                                word: "Answered correctly",
                            });
                        }
                    });
                } else {
                    lobby.userWords.push({
                        name: socket.data.name,
                        word: data.word,
                    });
                }
                io.to(socket.data.current_lobby).emit("word inserted", lobby.userWords);
                let usersAnswered = 0;
                lobby.users.forEach((user) => {
                    if (user.answered) {
                        usersAnswered++;
                    }
                });
                if (usersAnswered == lobby.users.length - 1) {
                    io.to(socket.data.current_lobby).emit("call next turn");
                }
            }
        });
    });

    socket.on("leave lobby", () => {
        leaveLobby(socket);
        sendLobbyList();
    });

    socket.on("disconnect", () => {
        leaveLobby(socket);
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

function leaveLobby(socket) {
    lobbies.forEach((lobby) => {
        if (lobby.lobby_code == socket.data.current_lobby) {
            lobby.users.forEach((member, index) => {
                if (member.name == socket.data.name) {
                    lobby.users.splice(index, 1);
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

server.listen(7500, () => {
    console.log("Listening on port 7500");
});