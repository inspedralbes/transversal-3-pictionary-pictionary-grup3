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
            lobbies.push({
                lobby_code: data.lobby_code,
                category: data.category,
                maxUsers: data.maxUsers,
                users: [],
                current_round: 0,
                painter_index: 0,
                drawings: []
            });
        }
        sendLobbyList();
    });

    socket.on('drawings', function () {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == socket.data.current_lobby) {
                let drawings = lobby.drawings;
            }
        });
        io.to(socket.data.current_lobby).emit("drawings", {
            drawings,
        });
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

    socket.on("join room", (data) => {
        lobbies.forEach((lobby) => {
            if (lobby.lobby_code == data.lobby_code) {
                if (lobby.users.length < lobby.maxUsers) {
                    let available = true;
                    lobby.users.forEach(user => {
                        if (user.nom == data.name) {
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
        socket.data.score = data.score;
        sendUserList(data.lobby_code);
    });

    socket.on("leave lobby", (lobby_code) => {
        leaveLobby(socket);
        sendUserList(lobby_code);
        sendLobbyList();
    });

    socket.on("disconnect", () => {
        leaveLobby(socket);
    });

});

async function sendUserList(lobby_code) {
    let list = [];
    const sockets = await io.in(lobby_code).fetchSockets();
    sockets.forEach((element) => {
        list.push({
            name: io.sockets.sockets.get(element.id).data.name,
            score: io.sockets.sockets.get(element.id).data.score,
        });
    });
    io.to(lobby_code).emit("lobby user list", {
        list: list,
    });
}

async function leaveLobby(socket) {
    lobbies.forEach((lobby, ind_lobby) => {
        if (lobby.lobby_code == socket.data.current_lobby) {
            lobby.users.forEach((member, index) => {
                if (member.nom == socket.data.name) {
                    lobby.users.splice(index, 1);
                }
            });
        }
        if (lobby.users.length == 0) {
            lobbies.splice(ind_lobby, 1);
        }
    });
    let lobby_code = socket.data.current_lobby;
    socket.leave(socket.data.current_lobby);
    socket.data.current_lobby = null
    sendUserList(lobby_code);
    sendLobbyList();
}

async function sendLobbyList() {
    await io.emit("lobbies list", lobbies);
}

server.listen(7500, () => {
    console.log("Listening on port 7500");
});