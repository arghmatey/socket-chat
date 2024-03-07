import React from 'react';

const ChatMessages = ({ messages, liveMessage, username }) => {

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
                        <div className="messageHeader">
                            <h4>{user}</h4>
                                <span className="messageTime">{new Date(timeStamp).toLocaleTimeString()}</span>
                        </div>
                        <p>{text}</p>
                    </div>
                    :
                    <div key={idx} className="chatMessage">
                        <div className="messageHeader">
                            <h4>{user}</h4>
                                <span className="messageTime">{new Date(timeStamp).toLocaleTimeString()}</span>
                        </div>
                        <p>{text}</p>
                    </div>
                )
            })}
            {liveMessage && 
                <div className="chatMessage">
                    <div className="messageHeader">
                        <h4>{liveMessage.user}</h4>
                        <span className="messageTime">LIVE</span>
                    </div>
                    <p>{liveMessage.text}</p>
                </div>
            }
        </div >
    )
}

export default ChatMessages;