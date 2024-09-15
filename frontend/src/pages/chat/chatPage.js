import React, {useEffect, useRef, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";

import {ChatPageWrapper, Main, Wrapper} from "./chatPageStyle";
import WebSocketService from "./WebSocketService";

import TopBarComponent from "../../components/TopBar/TopBar";
import ChatListComponent from "./components/chatListComponent";
import SideBarComponent from "./components/sideBarComponent";
import ChatRoomComponent from "./components/chatRoomComponent";


const styles = {
    myMessage: {
        backgroundColor: '#D9D9D9',
        marginLeft: 'auto',
        borderRadius: '10px 10px 0 10px',
        width: 'auto',
        border: '1px solid #4E53EE'
    },
    otherMessage: {
        backgroundColor: 'white',
        marginRight: 'auto',
        borderRadius: '10px 10px 10px 0',
        width: 'auto',
        border: '1px solid #4E53EE'
    }
};

const ChatPage = () => {

    const bottomRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const [roomJoined, setRoomJoined] = useState(false);
    const [nicknames, setNicknames] = useState([]);
    const [chatUsername, setChatUsername] = useState('');
    const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/nicknames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNicknames(response.data);
                // console.log('nicknames:',response.data);

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                // console.log("userPayload:", userPayload);
                const extractedUsername = userPayload.nickname;
                setUsername(extractedUsername);
                // console.log("extractedUsername", extractedUsername);
            } catch (error) {
                console.error('Failed to fetch nicknames', error);
            }
        };

        fetchNicknames();
    }, [token]);

    useEffect(() => {
        // joined가 true일 때만 구독 처리
        if (joined && roomId) {
            // 이전 방의 구독을 해제
            const unsubscribe = WebSocketService.connect(roomId, onMessageReceived);

            // 컴포넌트가 언마운트되거나 roomId가 변경될 때 구독 해제
            return () => {
                if (unsubscribe) {
                    unsubscribe(); // 구독 해제 함수 호출
                }
            };
        }
    }, [joined, roomId]);

    // 채팅 전송 시 스크롤 최하단으로 이동
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, message]);

    };

    const handleSendMessage = () => {
        if (input) {
            const message = {
                sender: username,
                content: input,
                type: 'CHAT'
            };
            WebSocketService.sendMessage(message);
            setInput('');
        }
    };

    const handleAddUser = async (targetUserNickname) => {
        setMessages([]);
        const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기
        if (token) {
            try {
                const response = await axios.post('http://localhost:8080/chat/createRoom', [username, targetUserNickname], {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const newRoomId = response.data;
                setRoomId(newRoomId);
                setChatUsername(targetUserNickname);
                setJoined(true);
                setRoomJoined(true);
            } catch (error) {
                console.error('Invalid token or failed to create chat room:', error);
            }
        } else {
            console.error('No JWT token found in cookies');
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage()
        }
    }
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const onClickSendFile = () => {
        const message = {
            sender: username,
            content: selectedFile,
            type: 'CHAT'
        };
        WebSocketService.sendMessage(message);
    }

    const [isVisible, setIsVisible] = useState(false);

    const handleOpenModal = () => {
        setIsVisible(true);
    };

    const handleCloseModal = () => {
        setIsVisible(false);
    };


    return (
        <Wrapper>
            <div style={{height: '40px'}}></div>
            <TopBarComponent/>
            <ChatPageWrapper>
                <SideBarComponent/>
                <ChatListComponent
                    nicknames={nicknames}
                    username={username}
                    handleAddUser={handleAddUser}
                />
                <Main>
                    {joined ? (
                        <ChatRoomComponent
                            chatUsername={chatUsername}
                            messages={messages}
                            username={username}
                            styles={styles}
                            input={input}
                            setInput={setInput}
                            handleOpenModal={handleOpenModal}
                            handleCloseModal={handleCloseModal}
                            handleFileChange={handleFileChange}
                            onClickSendFile={onClickSendFile}
                            handleSendMessage={handleSendMessage}
                            handleKeyDown={handleKeyDown}
                            isVisible={isVisible}
                            bottomRef={bottomRef}
                        />
                    ) : (
                        <div>
                            {/*채팅방 입장 필요*/}
                        </div>
                    )}
                </Main>
            </ChatPageWrapper>
        </Wrapper>
    );
};

export default ChatPage;
