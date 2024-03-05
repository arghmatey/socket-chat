import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterForm = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handleRoomChange = e => {
        setRoom(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (room && username) {
            navigate(`/chatroom?username=${username}&room=${room}`);
        }
    }

    return (
        <div className="formWrapper">
            <h1>Enter Room</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Username"
                        className="formInput"
                        type="text"
                        onChange={handleUsernameChange}
                    />
                    <select
                        placeholder="Select a Room"
                        className="formInput"
                        onChange={handleRoomChange}
                    >
                        <option disabled="" default>Select a Room</option>
                        <option value="room1">Room 1</option>
                        <option value="room2">Room 2</option>
                        <option value="room3">Room 3</option>
                    </select>
                    <button
                        type="submit" className="formButton"
                    >
                        Enter Room
                    </button>
            </form>
        </div>
    )
}

export default EnterForm;