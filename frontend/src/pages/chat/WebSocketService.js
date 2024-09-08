import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import axios from 'axios';

const WebSocketService = (() => {
    let stompClient = null;
    let currentSubscription = null;  // 현재 구독 정보를 저장하는 변수
    let currentRoomId = '';

    // 구독 연결 함수
    const connect = (roomId, onMessageReceived) => {
        // 이전 구독이 있으면 해제
        if (currentSubscription) {
            currentSubscription.unsubscribe();
        }

        // 새로운 WebSocket 연결 설정
        const socket = new SockJS('http://localhost:8080/ws', null, { withCredentials: true });
        stompClient = Stomp.over(socket);

        const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기

        stompClient.connect({ Authorization: `Bearer ${token}` }, async () => {
            currentRoomId = roomId;

            // 새로운 채팅방에 대한 구독 설정
            currentSubscription = stompClient.subscribe(`/topic/public/${roomId}`, onMessageReceived);

            // 채팅 기록 가져오기
            try {
                console.log(`Fetching chat history for room: ${roomId}`);
                const response = await axios.get(`http://localhost:8080/chat/history/${roomId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true // 쿠키 사용 설정
                });

                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                const messages = response.data;
                console.log('Chat history messages:', messages);
                messages.forEach(message => onMessageReceived({ body: JSON.stringify(message) }));
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
            }
        });

        // 구독 해제 함수를 반환
        return () => {
            if (currentSubscription) {
                currentSubscription.unsubscribe();
            }
        };
    };

    // 메시지 전송 함수
    const sendMessage = (message) => {
        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/chat.sendMessage/${currentRoomId}`, {}, JSON.stringify(message));
        }
    };

    // 사용자를 추가하는 함수
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
