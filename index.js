const express = require('express');
const app = express();

const http = require('http');

const server = http.createServer(app); // request listener

const path = require('path');

const socket = require('socket.io');
const io = socket(server); // object



const users = {}


// for static files
app.use('/',express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`Connection Established at ${socket.id}`);

    //listen to some event
    socket.on('send-msg', (data) => {
        // console.log(data);
        // socket.emit('received-msg', {
        io.emit('received-msg', {
            msg : data.msg,
            id: socket.id,
            username:users[socket.id]
        })
    })

    socket.on('login', (data) => {
        // console.log(data);
        users[socket.id] = data.username; // mapping socket-id with username
    })
})

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server connected at port ${port}`);
})