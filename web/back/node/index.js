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
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("connected");
    let socketId = socket.id;
    socket.data.current_lobby = null;

    socket.on("new lobby", (data) => {
        console.log("hola");
        let loby_exists = false;
        lobbies.forEach((element) => {
            if (element.lobby == data.lobby_code) {
                loby_exists = true;
            }
        });
        if (!loby_exists) {
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
                        if (user.nom == socket.data.name) {
                            available = false;
                        }
                    });
                    if (available) {
                        lobby.users.push({
                            name: socket.data.name,
                            idUser: socket.data.userId,
                        });
                    }
                }
            }
        });
        socket.join(data.lobby_code);
        socket.data.current_lobby = data.lobby_code;
    });

});

server.listen(7500, () => {
    console.log("Listening on port: 7500");
});