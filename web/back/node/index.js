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
    console.log("connected");
    socket.data.current_lobby = null;
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
                maxUsers: data.maxUsers,
                users: [],
            });
        }
        console.log(lobbies);
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
                            idUser: socket.data.userId,
                        });
                    }
                    console.log(socket.data.userId);
                }
            }
        });
        socket.join(data.lobby_code);
        socket.data.current_lobby = data.lobby_code;
        sendUserList(data.lobby_code);
        sendLobbyList();
        console.log(lobbies);
    });

    // socket.on("leave lobby", (lobby_code) => {
    //     leaveLobby(socket);
    //     sendUserList(lobby_code);
    //     sendLobbyList();
    // });

    // socket.on("disconnect", () => {
    //     leaveLobby(socket);
    // });

});

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

    socket.leave(socket.data.current_lobby);
    socket.data.current_lobby = null
    io.to(socket.id).emit("YOU_LEFT_LOBBY")
    sendLobbyList();
}

async function sendLobbyList() {
    await io.emit("lobbies list", lobbies);
}

async function sendUserList(room) {
    let list = [];
    const sockets = await io.in(room).fetchSockets();

    sockets.forEach((element) => {
        list.push({
            name: io.sockets.sockets.get(element.id).data.name,
        });
    });

    io.to(room).emit("lobby user list", {
        list: list,
        message: "user list",
    });
}

server.listen(7500, () => {
    console.log("Listening on port: 7500");
});