import React, {useEffect, useRef, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";

import {
    ChatPageWrapper,
    Main,
    ModalBackground,
    PointModal,
    ProfileImg,
    ProfileImgContainer,
    Wrapper,
    Button, ModalFont
} from "./chatPageStyle";
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
    const [profilePictures, setProfilePictures] = useState({}); // 프로필 사진 저장 상태

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const [pointInput, setPointInput] = useState('');
    const handlePointInputChange = (event) => {
        setPointInput(event.target.value);
    };

    const onClickRequestPoints = () => {
        if (pointInput) {
            const message = {
                sender: username,
                content: `${username} 님께서 ${pointInput} 포인트를 요청했어요!|button`,
                type: 'CHAT'
            };
            WebSocketService.sendMessage(message);
            setPointInput('');
            handleClosePointModal();
        }
    };


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
                const response = await axios.get('http://localhost:8080/chat/userRooms', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('받은 값:',response.data)
                setNicknames(response.data);

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                const extractedUsername = userPayload.nickname;
                console.log('extractedUsername:',extractedUsername)
                setUsername(extractedUsername);
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
            try {
                // 진행 상황 조회 요청
                const response = await axios.get('http://localhost:8080/api/booking/progress', {
                    params: {
                        userId: username,
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
        if (stepValue === 3){
            handleOpenPointModal()
        }
        if (token) {
            try {
                // 진행 상황 업데이트 요청
                const response = await axios.post(
                    'http://localhost:8080/api/booking/update-progress',
                    null,
                    {
                        params: {
                            userId: username,
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
                console.error('Error details:', error.response?.data);
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
    const [isVisiblePointModal, setIsVisiblePointModal] = useState(false);

    const handleOpenModal = () => {
        setIsVisible(true);
    };

    const handleCloseModal = () => {
        setIsVisible(false);
    };

    const handleOpenPointModal = () => {
        setIsVisiblePointModal(true);
    };

    const handleClosePointModal = () => {
        setIsVisiblePointModal(false);
    }

    useEffect(() => {
        const fetchProfilePictures = async () => {
            try {
                const pictures = {};
                const fetchPromises = nicknames
                    .filter(nickname => nickname !== username)
                    .map(async (nickname) => {
                        const response = await axios.get(`http://localhost:8080/api/users/profile-picture/${nickname}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        let imageUrl = response.data.replace('static\\', '').replace(/\\/g, '/');

                        console.log('이미지 가져옴:', imageUrl);
                        pictures[nickname] = imageUrl; // 수정된 이미지 URL 저장
                        setProfilePictures(pictures);
                    });

                // 모든 요청이 완료될 때까지 대기
                await Promise.all(fetchPromises);

            } catch (error) {
                console.error('Failed to fetch profile pictures', error);
            }
        };
        fetchProfilePictures();
    }, [nicknames, username]);

    return (
        <Wrapper>
            <Reset/>
            <div style={{height: '40px'}}></div>
            <TopBarComponent
                step={step}
                style={{zIndex: '1000'}}
            />
            <ChatPageWrapper>
                <SideBarComponent/>
                <ChatListComponent
                    nicknames={nicknames}
                    username={username}
                    handleAddUser={handleAddUser}
                    profilePictures={profilePictures}
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
                            profilePictures={profilePictures}
                        />
                    ) : (
                        <div>
                            {/*채팅방 입장 필요*/}
                        </div>
                    )}
                </Main>
            </ChatPageWrapper>
            {isVisiblePointModal && (
                <ModalBackground onClick={handleClosePointModal}>
                    <PointModal
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            onClick={handleClosePointModal}
                            style={{
                                color: '#aaa',
                                fontSize: '40px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                position: 'absolute', // 절대 위치 설정
                                top: '20px', // 부모의 위쪽에 고정
                                right: '20px', // 부모의 오른쪽에 고정
                            }}
                        >
                            ×
                        </div>
                        <ProfileImgContainer style={{width:'150px', height:'150px'}}>
                            <ProfileImg
                                src={'http://localhost:8080/' + profilePictures[chatUsername] || '/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'}
                                alt={'프로필사진'}/>
                        </ProfileImgContainer>
                        <ModalFont>
                            <span style={{color: 'black'}}>
                                {chatUsername}
                            </span>&nbsp;님
                        </ModalFont>
                        <div style={{height: '50px', borderBottom: '2px solid gray'}}>
                            <input
                                style={{width:'200px',height:'48px', float: 'left', fontSize:'25px', textAlign:'right', border: "none", marginRight:'5px'}}
                                size="1"
                                value={pointInput}
                                onChange={handlePointInputChange}
                            />
                            <ModalFont style={{float:'right'}}>
                                포인트
                            </ModalFont>
                        </div>
                        <Button onClick={onClickRequestPoints}>
                            요청하기
                        </Button>
                    </PointModal>
                </ModalBackground>
            )}
        </Wrapper>
    );
};

export default ChatPage;
