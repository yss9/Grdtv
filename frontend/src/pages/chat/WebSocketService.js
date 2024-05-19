import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketService = (() => {
    let stompClient = null;
    let currentRoomId = '';

    const connect = (roomId, onMessageReceived) => {
        const socket = new SockJS('/ws', null, { withCredentials: false });
        stompClient = Stomp.over(socket);
        stompClient.connect({}, async () => {
            currentRoomId = roomId;
            stompClient.subscribe(`/topic/public/${roomId}`, onMessageReceived);

            // Fetch chat history after connection
            try {
                console.log(`Fetching chat history for room: ${roomId}`);
                const response = await fetch(`http://localhost:8080/chat/history/${roomId}`); // Corrected URL with backend server port
                console.log('Chat history response:', response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const messages = await response.json();
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
