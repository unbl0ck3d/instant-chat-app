// Server side code for instant chat app
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.get("/", function(req, res){
    res.send("<h1>Hello World!</h1>")
})

app.listen(3000, function(){
    console.log("listening to localhost 3000");
})