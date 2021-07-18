const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    })
    socket.on("chat message", (msg) => {
        console.log("message received.");
        console.log("message: " + msg);
    })
    socket.on("message sender", (nick) => {
        console.log("nick: " + nick);
    })
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('message sender', (nick) => {
        io.emit('message sender', nick);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});