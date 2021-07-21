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

    // emit welcome message to single user when connected
    // socket.emit("welcomeMessage", "Welcome to Chatbud!")

    // emit to everyone except the client thats connected
    socket.broadcast.emit("welcomeMessage", "A new user connected");

    // emitting to all the clients
    // io.emit("welcomeMessage", "nise")

    // catching a reveived message from client
    socket.on("sentMessage", function(message){
        // console.log(message);

        // sending message to other clients as their received message
        socket.broadcast.emit("receivedMessage", message);
    })

    socket.on("disconnect", function(){
        console.log("A user disconnected");
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});