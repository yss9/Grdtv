import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketService = (() => {
    let stompClient = null;

    const connect = (onMessageReceived) => {
        const socket = new SockJS('/ws', null, { withCredentials: false });
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/public', onMessageReceived);
        });
    };

    const sendMessage = (message) => {
        if (stompClient && stompClient.connected) {
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
        }
    };

    const addUser = (user) => {
        if (stompClient && stompClient.connected) {
            stompClient.send('/app/chat.addUser', {}, JSON.stringify(user));
        }
    };

    return {
        connect,
        sendMessage,
        addUser
    };
})();

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        WebSocketService.connect(onMessageReceived);
    }, []);

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleSendMessage = () => {
        const message = {
            sender: username,
            content: input,
            type: 'CHAT'
        };
        WebSocketService.sendMessage(message);
        setInput('');
    };

    const handleAddUser = () => {
        const user = {
            sender: username,
            type: 'JOIN'
        };
        WebSocketService.addUser(user);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleAddUser}>Join</button>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}: </strong>{message.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
