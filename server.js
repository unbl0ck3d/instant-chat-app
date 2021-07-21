const express = require('express');
const http = require('http');
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(__dirname + "/"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", function(socket) {
    console.log("new connection");
    socket.emit("welcomeMessage", "Welcome to Chatbud!")
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});