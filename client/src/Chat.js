import React from 'react'
import MessageList from './components/Chatbox/MessageList'
import SendMessageForm from './components/Chatbox/SendMessageForm'
import RoomList from './components/Chatbox/RoomList'
import NewRoomForm from './components/Chatbox/NewRoomForm'

class Chat extends React.Components{
    render(){
        return (
            <div className="chat">
                <RoomList/>
                <MessageList/>
                <SendMessageForm/>
                <NewRoomForm/>
                </div>
        );
    }
}

export default Chat