import React from 'react'

const DUMMY_DATA= [
    {
        senderId: 'Netra',
        text: 'Hello, How are you?'
    },
    {
        senderId:'Sowmya',
        text:'Great!How about you?'
    }
]

class MessageList extends React.Component{
    render(){
        return(
            <div className="message-list">
                {DUMMY_DATA.map((message,index)=>{
                    retrun(
                        <div key={index} className="message">
                        <div className="message-username">{message.senderId}</div>
                        <div className="message-text">{message.text}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList