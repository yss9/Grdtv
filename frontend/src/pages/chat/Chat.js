import React, { useState, useEffect } from 'react';
import WebSocketService from './WebSocketService';
import Cookies from 'js-cookie';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        if (joined) {
            WebSocketService.connect(roomId, onMessageReceived);
        }
    }, [joined]);

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const base64UrlDecode = (str) => {
        if (!str) {
            throw new Error('Invalid base64 string');
        }
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
            base64 += '=';
        }
        return atob(base64);
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
        const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기
        if (token) {
            try {
                const parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error('Invalid JWT token format');
                }
                const userPayload = JSON.parse(base64UrlDecode(parts[1]));
                const extractedUsername = userPayload.sub; // 서버에서 subject로 이메일/이름을 설정한 경우
                setUsername(extractedUsername);

                const user = {
                    sender: extractedUsername,
                    type: 'JOIN'
                };
                WebSocketService.addUser(user);
                setJoined(true);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            console.error('No JWT token found in cookies');
        }
    };

    return (
        <div>
            {!joined ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter room number"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <button onClick={handleAddUser}>Join</button>
                </div>
            ) : (
                <div>
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
            )}
        </div>
    );
};

export default Chat;
