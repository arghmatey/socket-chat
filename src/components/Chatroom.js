import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { io } from 'socket.io-client';

import ChatMessages from './ChatMessages';
import RoomInfo from './RoomInfo';
import NewMessage from './NewMessage';

let socket;

const Chatroom = () => {
    const location = useLocation();
    const parsed = queryString.parse(location.search);

    const username = parsed['username'];
    const room = parsed['room'];

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [liveMessage, setLiveMessage] = useState(null)

    const [users, setUsers] = useState([]);

    const chatEl = useRef(null);

    useEffect(() => {
        socket = io();
        // TODO:    Add error handling.
        //          Dispaly error message.
        socket.emit('join', { username, room });

        socket.on('roomUsers', ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.emit('leaveRoom');
            socket.off();
        }
    }, [username, room]);

    useEffect(() => {
        socket.on('message', msg => {
            setMessages(messages => [...messages, msg]);
        });

        socket.on('liveMessage', newMessage => {
            setLiveMessage(newMessage);
        })

        socket.on('clearLiveMessage', () => {
            setLiveMessage(null)
        })
    }, []);

    const sendMessage = e => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message);
            setMessage('');
        }
    }

    const updateMessage = e => {
        socket.emit('liveMessage', { 
            user: username,
            message: e.target.value,
            room});
        setMessage(e.target.value);
    }

    return (
        <div className="chatWrapper">
            <div ref={chatEl} className="messagesContainer">
                <ChatMessages
                    username={username}
                    messages={messages}
                    liveMessage={liveMessage}
                />
            </div>
            <RoomInfo
                users={users}
                room={room}
            />
            <NewMessage
                message={message}
                updateMessage={updateMessage}
                sendMessage={sendMessage}
            />
        </div>
    )
}

export default Chatroom;