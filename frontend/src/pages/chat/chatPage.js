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
import {Reset} from "styled-reset";


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
    const [nicknames, setNicknames] = useState([]);
    const [chatUsername, setChatUsername] = useState('');
    const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기

    const [selectedFile, setSelectedFile] = useState(null);

    const [id, setId] = useState(null);
    const [isAgent, setIsAgent] = useState(false);
    const [step, setStep] = useState(0);

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/my-info', {
                    params: {
                        userId: userId,
                    },
                });
                setIsAgent(response.data.agent);
                console.log('isAgent:', isAgent)
            } catch (error) {
                console.error('Failed to fetch myInfo', error);
            }
        };

        fetchMyInfo();
    }, [token]);

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

    // 음성파일
    const handleVoiceMessageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // 음성 파일을 HTTP로 서버에 업로드
            const response = await axios.post(`http://localhost:8080/chat/uploadVoiceMessage/${roomId}`, formData);
            const transcript = response.data;

            // WebSocket을 통해 텍스트 메시지 전송
            WebSocketService.sendMessage({
                sender: username,
                content: transcript,
                type: 'CHAT',
            });
        } catch (error) {
            console.error('음성 메시지 전송 실패:', error);
        }
    };



    const handleAddUser = async (targetUserNickname) => {
        setMessages([]);
        const token = Cookies.get('jwt'); // Get JWT token from cookies
        if (token) {
            try {
                // Chat room 생성 요청
                const response = await axios.post('http://localhost:8080/chat/createRoom', [username, targetUserNickname], {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const newRoomId = response.data;
                setRoomId(newRoomId);
                setChatUsername(targetUserNickname);
                setJoined(true);
            } catch (error) {
                console.error('Invalid token or failed to create chat room:', error);
            }

            // try {
            //     // 진행 상황 업데이트 요청
            //     const response = await axios.post(
            //         'http://localhost:8080/api/booking/update-progress',
            //         null, // POST 요청에서 본문이 필요하지 않으므로 null로 설정
            //         {
            //             params: {
            //                 userId: userId,
            //                 agentId: targetUserNickname,
            //                 progress: 25
            //             },
            //             headers: {
            //                 'Authorization': `Bearer ${token}`,
            //                 'Accept': '*/*'
            //             }
            //         }
            //     );
            //     console.log('Update progress response:', response.data);
            // } catch (error) {
            //     console.error('Failed to update progress', error);
            //     console.error('Error details:', error.response?.data); // 서버에서 받은 오류 메시지 출력
            // }
            //
            //
            try {
                // 진행 상황 조회 요청
                const response = await axios.get('http://localhost:8080/api/booking/progress', {
                    params: {
                        userId: userId,
                        agentId: targetUserNickname
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Fetch progress response:', response.data);
                setStep(response.data)

            } catch (error) {
                console.error('Failed to fetch progress', error);
            }
        } else {
            console.error('No JWT token found in cookies');
        }
    };

    const onClickProcessButton = async(stepValue) => {
        const token = Cookies.get('jwt');
        if (token) {
            try {
                // 진행 상황 업데이트 요청
                const response = await axios.post(
                    'http://localhost:8080/api/booking/update-progress',
                    null, // POST 요청에서 본문이 필요하지 않으므로 null로 설정
                    {
                        params: {
                            userId: userId,
                            agentId: chatUsername,
                            progress: stepValue
                        },
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': '*/*'
                        }
                    }
                );
                console.log('Progress Update complete')
                setStep(stepValue)
            } catch (error) {
                console.error('Failed to update progress', error);
                console.error('Error details:', error.response?.data); // 서버에서 받은 오류 메시지 출력
            }
        }
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage()
        }
    }
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const onClickSendFile = async() => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('sender', username);

        // 1. 파일을 HTTP 요청으로 업로드
        const response = await axios.post(`http://localhost:8080/chat/uploadFile/${roomId}`, formData);
        const fileUrl = response.data;

        // 2. 업로드된 파일 경로를 WebSocket으로 전송
        const message = {
            sender: username,
            content: fileUrl,
            type: 'FILE',
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
            <Reset/>
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
                            isAgent={isAgent}
                            handleVoiceMessageUpload={handleVoiceMessageUpload}
                            userId={userId}
                            onClickProcessButton={onClickProcessButton}
                            step={step}
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
