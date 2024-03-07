import React from 'react';

const NewMessage = ({ 
    message,
    updateMessage,
    sendMessage
}) => {

    const handleKeyUp = e => {
        if (e.key === 'Enter') {
            sendMessage(e)
        }
    }

    return (
        <div className='newWrapper'>
            <input
                placeholder='Type your message here...'
                className='newMessage'
                value={message}
                onChange={e => updateMessage(e)}
                onKeyUp={handleKeyUp} />
            {/* <button
                className='messageSend'
                type='submit'
                onClick={sendMessage}>Send</button> */}
        </div>
    )
}

export default NewMessage;