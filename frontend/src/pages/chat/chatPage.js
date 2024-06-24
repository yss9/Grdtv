import React, {useEffect, useRef, useState} from 'react';
import TopBarComponent from "../../components/TopBar/TopBar";
import axios from "axios";
import Cookies from "js-cookie";
import WebSocketService from "./WebSocketService";
import {
    BottomBar, ChatBubble, ChatButton, ChatHeader, ChatInput, ChatItem, ChatList, ChatListWrapper,
    ChatRoom, ChatWrapper, Main, Sidebar, SidebarContentInput, SidebarHeader, Username, Wrapper
} from "./chatPageStyle";
import {jwtDecode} from "jwt-decode";

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

    const buttonRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const [nicknames, setNicknames] = useState([]);
    const [chatUsername, setChatUsername] = useState('');
    const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기

    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/nicknames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNicknames(response.data);
                console.log('nicknames:',response.data);

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                console.log("userPayload:", userPayload);
                const extractedUsername = userPayload.nickname;
                setUsername(extractedUsername);
                console.log("extractedUsername", extractedUsername);
            } catch (error) {
                console.error('Failed to fetch nicknames', error);
            }
        };

        fetchNicknames();
    }, [token]);

    useEffect(() => {
        if (joined) {
            WebSocketService.connect(roomId, onMessageReceived);
        }
    }, [joined, roomId]);

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

    const handleAddUser = async (targetUserNickname) => {
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
            } catch (error) {
                console.error('Invalid token or failed to create chat room:', error);
            }
        } else {
            console.error('No JWT token found in cookies');
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            buttonRef.current.click();
        }
    }


    return (
        <Wrapper>
            <TopBarComponent />
            <ChatWrapper>
                <Sidebar>
                    <div style={{width: '100%', height: '45px', backgroundColor: "rgba(255, 255, 255, 0.6)", margin: '20px 0 20px 0', color: 'black'}}>
                        <SidebarHeader>
                            최근 채팅
                        </SidebarHeader>
                    </div>
                    <div>
                        <SidebarHeader style={{display: "flex", justifyContent: "center", margin: '0 0 10px 0'}}>
                            완료된 채팅
                        </SidebarHeader>
                    </div>
                    <br/>
                    <hr style={{margin: '0 7px'}}/>
                    <br/>
                    <div style={{display: "flex", justifyContent: "center", margin: '10px 0 0 0'}}>도쿄 예약 대행<br/><br/><br/>○○ 예약 대행</div>

                </Sidebar>
                <ChatListWrapper>
                    <div>
                        <SidebarContentInput type="text" placeholder="채팅방 내용, 참여자 검색"/>
                        <ChatList>
                            <div>
                                {nicknames.map(nickname => (
                                    nickname !== username && (
                                        <div
                                            style={{
                                                width: '100%',
                                                borderBottom: '1px solid lightgray',
                                                cursor: 'pointer',
                                                padding: '10px',
                                                overflow: 'hidden',
                                            }}
                                            onClick={() => handleAddUser(nickname)}
                                        >
                                            <img style={{
                                                width: '50px',
                                                float: 'left',
                                            }}
                                                 src='/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png' alt='채팅방'/>
                                            <div style={{
                                                float: 'right',
                                                width: 'calc(100% - 70px)',
                                                padding: '0 10px',
                                            }}>
                                                <div>
                                                    {nickname !== username && (
                                                            <ChatItem key={nickname}>
                                                                {nickname}
                                                            </ChatItem>
                                                        )
                                                    }
                                                </div>
                                                <div style={{fontSize: '12px', color: 'gray'}}>
                                                    메세지를 보내서 글로플러와...
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>


                        </ChatList>
                    </div>
                </ChatListWrapper>
                <Main>
                    {joined ? (
                        <div style={{overflow: 'hidden'}}>
                            <ChatHeader>
                                <img style={{
                                    width: '50px',
                                    float: 'left',
                                }}
                                     src='/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png' alt='채팅방'/>
                                <Username>{chatUsername}</Username>

                                <div style={{float: 'left',
                                    border: '1px solid #4E53ED',
                                    borderRadius: '20px',
                                    width: '85px',
                                    height: '30px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    marginLeft: '35px',
                                }}>
                                    리뷰 &nbsp;&gt;
                                </div>
                                <div style={{
                                    width: '120px',
                                    height: '35px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    color: 'white',
                                    backgroundColor: '#4E53ED',
                                    border: '1px solid #4E53ED',
                                    borderRadius: '20px',
                                    marginLeft: 'auto',
                                }}>
                                    글로플러 목록
                                </div>

                            </ChatHeader>
                            <ChatRoom style={{marginBottom: '20px', height: '58vh', overflowY: 'auto'}}>
                                {messages.map((message, index) => (
                                    <ChatBubble key={index} style={{
                                        ...(message.sender === username ? styles.myMessage : styles.otherMessage),
                                        width: "auto",
                                    }}>
                                        {message.content}
                                    </ChatBubble>
                                ))}
                            </ChatRoom>
                            <BottomBar>
                                <div style={{float: 'left', width: '7%', height: '100%'}}>
                                    <div style={{
                                        float: 'none',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'gray'
                                    }}>
                                        +
                                    </div>
                                </div>
                                <ChatButton
                                    ref={buttonRef}
                                    onClick={handleSendMessage}
                                ><img style={{height: "60%"}} src='/Img/채팅%20메세지%20버튼.png' alt='채팅 메세지 버튼'/>
                                </ChatButton>
                                <ChatInput
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="메세지를 보내서 글로플러와 예약을 진행해 보세요."
                                >
                                </ChatInput>
                            </BottomBar>

                        </div>

                    ) : (
                        <div>
                            {/*채팅방 입장 필요*/}
                        </div>
                    )}
                </Main>
            </ChatWrapper>
        </Wrapper>
    );
};

export default ChatPage;
