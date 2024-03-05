import React from 'react';

const RoomInfo = ({ users, room }) => {

    return (
        <div className="usersWrapper">
            <div>
                <h3>{room}</h3>
                <div>
                    {users?.map(user => (
                        <div key={user.id}>{user.username}</div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default RoomInfo;