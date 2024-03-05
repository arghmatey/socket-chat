import React from 'react';

const ChatMessages = ({ messages, username }) => {
    return (
        <div className="messagesWrapper">
            {messages.map((message, idx) => {
                const {
                    user,
                    text,
                    isSystemMessage,
                    timeStamp
                } = message

                if (isSystemMessage) {
                    return (
                        <div key={idx} className="systemMessage">
                            <p>{text}</p>
                            <div>{new Date(timeStamp).toLocaleTimeString()}</div>
                        </div>
                    )
                }

                return (
                    username === user
                    ?
                    <div key={idx} className="userMessage">
                        <h4>{user}</h4>
                        <p>{text}</p>
                    </div>
                    :
                    <div key={idx} className="chatMessage">
                        <h4>{user}</h4>
                        <p>{text}</p>
                    </div>
                )
            })}
        </div >
    )
}

export default ChatMessages;