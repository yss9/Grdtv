import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [connected, setConnected] = useState(false);
    const [client, setClient] = useState(null);

    useEffect(() => {
        if (connected) {
            const socket = new SockJS('http://localhost:8080/ws');
            const stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                onConnect: () => {
                    stompClient.subscribe('/topic/public', (message) => {
                        const msg = JSON.parse(message.body);
                        setMessages((prevMessages) => [...prevMessages, msg]);
                    });

                    stompClient.publish({
                        destination: "/app/chat.addUser",
                        body: JSON.stringify({ sender: username, type: 'JOIN' })
                    });
                }
            });

            stompClient.activate();
            setClient(stompClient);

            return () => {
                if (stompClient) {
                    stompClient.deactivate();
                }
            };
        }
    }, [connected, username]);

    const sendMessage = () => {
        if (client && input.trim() !== '') {
            const message = {
                sender: username,
                content: input,
                type: 'CHAT'
            };
            client.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(message)
            });
            setInput('');
        }
    };

    const handleLogin = () => {
        setConnected(true);
    };

    return (
        <div className="App">
            {!connected ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleLogin}>Join Chat</button>
                </div>
            ) : (
                <div>
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.sender}</strong>: {msg.content}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
