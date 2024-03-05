import React, { useState } from 'react';
import { redirect } from 'react-router-dom';

const EnterForm = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handleRoomChange = e => {
        setRoom(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (room && username) {
            redirect(`/chatroom?username=${username}&room=${room}`);
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
                        <option disabled default>Select a Room</option>
                        <option>Room 1</option>
                        <option>Room 2</option>
                        <option>Room 3</option>
                    </select>
                    <button className="formButton">Enter Room</button>
            </form>
        </div>
    )
}

export default EnterForm;