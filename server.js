const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { userEnter, userLeave, currentUser, usersInRoom } = require('./src/utils/users')

// const router = require('./routes/index')

app.use(logger('dev'));
app.use(express.json());

// app.use(router);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    // Console strictly for me to check reloads when changing stuff
    console.log('A new user connected: ' + socket.id);

    // USER JOINS
    socket.on('join', ({ username, room }) => {
        const { user } = userEnter({ id: socket.id, username, room });

        socket.join(user.room);

        // Message to user joining
        socket.emit('message', {
            text: `Welcome to ${user.room}, ${user.username}!`,
            isSystemMessage: true,
            timeStamp: new Date().toISOString()
        });

        // Message to current users in room
        socket.broadcast.to(user.room).emit('message', {
            text: `${user.username} has entered the chat.`,
            isSystemMessage: true,
            timeStamp: new Date().toISOString()
        });

        io.to(user.room).emit('roomUsers', { room: user.room, users: usersInRoom(user.room) });
    });


    // MESSAGE SENDS
    socket.on('sendMessage', message => {
        const user = currentUser(socket.id);

        socket.to(user.room).emit('clearLiveMessage')

        io.to(user.room).emit('message', {
            user: user.username,
            text: message,
            timeStamp: new Date().toISOString()
        });
    });


    // LIVE MESSAGE BROADCASTS TO USERS IN ROOM 
    socket.on('liveMessage', ({ user, message, room }) => {
        socket.broadcast.to(room).emit('liveMessage', {
            user,
            text: message
        })
    })


    // USER DISCONNECTS
    socket.on('leaveRoom', () => {
        console.log('user disconnected!')

        const user = userLeave(socket.id);

        if (user) {
            socket.broadcast.to(user.room).emit('message', {
                text: `${user.username} has left the chat`,
                isSystemMessage: true,
                timeStamp: new Date().toISOString()
            });
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: usersInRoom(user.room)
            });
        };
    });
});

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Server running on port ${port}`));