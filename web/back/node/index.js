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

    socket.on("get user list", () => {
        sendUserList(socket);
    });

    socket.on("new lobby", (data) => {
        let lobby_exists = false;
        lobbies.forEach((element) => {
            if (element.lobby_code == data.lobby_code) {
                lobby_exists = true;
            }
        });
        if (!lobby_exists) {
            lobbies.push({
                lobby_code: data.lobby_code,
                category: data.category,
                maxUsers: data.maxUsers,
                users: [],
                round: 0,
                painter: null,
                drawings: [],
                word: "",
                words: data.words.words,
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
                            score: 0,
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

    socket.on('draw', function (data) {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                switch (data.action) {
                    case 'i': lobby.drawings.push(data);
                        break;
                    case 'p': lobby.drawings.push(data);
                        break;
                    case 'b': lobby.drawings = [];
                        break;
                    default:
                        break;
                }
            }
        });
        io.to(socket.data.current_lobby).emit("draw", {
            data
        });
    });

    socket.on('drawings', function () {
        let drawings;
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                drawings = lobby.drawings;
            }
        });
        io.to(socket.data.current_lobby).emit("drawings", {
            drawings,
        });
    });

    socket.on("ready lobby", () => {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                lobby.round = 1;
                lobby.painter = lobby.users[0].name;
                lobby.word = lobby.words[0].word;
                io.to(socket.data.current_lobby).emit("start game", { lobby });
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
    if (socket) {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                list = lobby.users;
            }
        });
        io.to(socket.data.current_lobby).emit("lobby user list", {
            list: list,
        });
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