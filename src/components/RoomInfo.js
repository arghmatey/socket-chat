import React from 'react';

const RoomInfo = ({ users, room }) => {

    return (
        <div className="usersWrapper">
            <h3>{room}</h3>
            <div>
                {/* {users?.map(user => (
                    <div key={user.id}>{user.username}</div>
                ))} */}
                {users.length} users
            </div>
        </div>
    )
};

export default RoomInfo;