import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import axios from 'axios';

const WebSocketService = (() => {
    let stompClient = null;
    let currentRoomId = '';

    const connect = (roomId, onMessageReceived) => {
        const socket = new SockJS('http://localhost:8080/ws', null, { withCredentials: true });
        stompClient = Stomp.over(socket);

        const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기

        stompClient.connect({ Authorization: `Bearer ${token}` }, async () => {
            currentRoomId = roomId;
            stompClient.subscribe(`/topic/public/${roomId}`, onMessageReceived);

            // Fetch chat history after connection
            try {
                console.log(`Fetching chat history for room: ${roomId}`);
                const response = await axios.get(`http://localhost:8080/chat/history/${roomId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true // 설정 부분
                });
                console.log('Chat history response:', response);

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                const messages = response.data;
                console.log('Chat history messages:', messages);
                messages.forEach(message => onMessageReceived({ body: JSON.stringify(message) }));
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
                // Optionally show error to user
            }
        });
    };

    const sendMessage = (message) => {
        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/chat.sendMessage/${currentRoomId}`, {}, JSON.stringify(message));
        }
    };

    const addUser = (user) => {
        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/chat.addUser/${currentRoomId}`, {}, JSON.stringify(user));
        }
    };

    return {
        connect,
        sendMessage,
        addUser
    };
})();

export default WebSocketService;
