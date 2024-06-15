import React, {useEffect, useState} from 'react';
import TopBarComponent from "../../components/TopBar/TopBar";
import axios from "axios";
import Cookies from "js-cookie";
import WebSocketService from "./WebSocketService";
import {BottomBar, ChatButton, ChatInput, ChatRoom, Main} from "./chatPageStyle";

const styles = {
    body: {
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        height: '97vh',
        overflowY: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #ddd',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    nav: {
        display: 'flex',
    },
    navLink: {
        margin: '0 10px',
        textDecoration: 'none',
        color: '#333',
    },
    chatContainer: {
        display: 'flex',
        height: 'calc(100vh - 50px)', // Adjust based on header height
    },
    sidebar: {
        width: '13%',
        backgroundColor: '#4E53ED',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
        color: 'white',
        fontSize: '14px',
    },
    chatListContainer: {
        width: '20%',
        padding: '10px',
        overflowY: 'auto',
    },
    sidebarHeader: {
        // fontSize: '18px',
        marginBottom: '10px',
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sidebarContentInput: {
        width: '100%',
        padding: '0 10px',
        marginBottom: '10px',
        boxSizing: 'border-box',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#E8E8E8',
        height: '30px',
    },
    chatList: {
        listStyle: 'none',
        padding: 0,
    },
    chatItem: {
        // backgroundColor: '#818181',
        marginBottom: '5px',
        width: '100%',
    },
    chatHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        backgroundColor:'white',
        width: 'calc(100% - 30px)',
    },
    userIcon: {
        width: '50px',
        height: '50px',
        backgroundColor: '#ccc',
        borderRadius: '50%',
        marginRight: '10px',
    },
    userName: {
        fontSize: '18px',
        marginLeft: '20px'
    },
    chatContent: {
        flex: 1,
        overflowY: 'auto',
    },
    chatBubble: {
        maxWidth: '40%',
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
    },
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
    },
};

const ChatPage = () => {

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


                const parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error('Invalid JWT token format');
                }
                const userPayload = JSON.parse(base64UrlDecode(parts[1]));
                const extractedUsername = userPayload.nickname; // 토큰의 nickname 값 가져오기
                setUsername(extractedUsername);
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


    return (
        <div style={styles.body}>
            <TopBarComponent />
            <div style={styles.chatContainer}>
                <aside style={styles.sidebar}>
                    <div style={{width: '100%', height: '45px', backgroundColor: "rgba(255, 255, 255, 0.6)", margin: '20px 0 20px 0', color: 'black'}}>
                        <div style={styles.sidebarHeader}>
                            최근 채팅
                        </div>
                    </div>
                    <div>
                        <div style={styles.sidebarHeader} style={{display: "flex", justifyContent: "center", margin: '0 0 10px 0'}}>
                            완료된 채팅
                        </div>
                    </div>
                    <br/>
                    <hr style={{margin: '0 7px'}}/>
                    <br/>
                    <div style={{display: "flex", justifyContent: "center", margin: '10px 0 0 0'}}>도쿄 예약 대행<br/><br/><br/>○○ 예약 대행</div>

                </aside>
                <aside style={styles.chatListContainer}>
                    <div>
                        <input type="text" placeholder="채팅방 내용, 참여자 검색" style={styles.sidebarContentInput}/>
                        <div style={styles.chatList}>
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
                                                    {nicknames.map(nickname => (
                                                        nickname !== username && (
                                                            <div key={nickname} style={styles.chatItem}>
                                                                {nickname}
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                                <div style={{fontSize: '12px', color: 'gray'}}>
                                                    메세지를 보내서 글로플러와...
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>


                        </div>
                    </div>
                </aside>
                <Main>
                    {joined ? (
                        <div style={{overflow: 'hidden'}}>
                            <div style={styles.chatHeader}>
                                <img style={{
                                    width: '50px',
                                    float: 'left',
                                }}
                                     src='/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png' alt='채팅방'/>
                                <div style={styles.userName}>{chatUsername}</div>

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

                            </div>
                            <ChatRoom style={{marginBottom: '20px', height: '58vh', overflowY: 'auto'}}>
                                {messages.map((message, index) => (
                                    <div key={index} style={{
                                        ...styles.chatBubble,
                                        ...(message.sender === username ? styles.myMessage : styles.otherMessage),
                                        width: "auto",
                                    }}>
                                        {message.content}
                                    </div>
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
                                    onClick={handleSendMessage}
                                ><img style={{height: "60%"}} src='/Img/채팅%20메세지%20버튼.png' alt='채팅 메세지 버튼'/>
                                </ChatButton>
                                <ChatInput
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
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
            </div>
        </div>
    );
};

export default ChatPage;
