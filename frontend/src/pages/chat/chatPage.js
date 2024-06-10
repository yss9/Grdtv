import React, {useEffect, useState} from 'react';
import TopBarComponent from "../../components/TopBar/TopBar";
import axios from "axios";
import Cookies from "js-cookie";
import WebSocketService from "./WebSocketService";

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
        width: '200px',
        backgroundColor: '#f1f1f1',
        padding: '10px',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
    },
    chatListContainer: {
        width: '300px',
        backgroundColor: '#f1f1f1',
        padding: '10px',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
    },
    sidebarHeader: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    sidebarContentInput: {
        width: '100%',
        padding: '5px',
        marginBottom: '10px',
        boxSizing: 'border-box',
    },
    chatList: {
        listStyle: 'none',
        padding: 0,
    },
    chatItem: {
        padding: '10px',
        backgroundColor: '#fff',
        marginBottom: '5px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        cursor: 'pointer',
        width: '100%',
    },
    chatMain: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    chatHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
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
    },
    chatContent: {
        flex: 1,
        overflowY: 'auto',
    },
    chatContentMessage: {
        backgroundColor: '#f1f1f1',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
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
                    <div style={styles.sidebarHeader} style={{display: "flex", justifyContent: "center"}}><br/><br/>최근
                        채팅<br/><br/><br/>완료된
                        채팅
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <div style={{display: "flex", justifyContent: "center"}}>도쿄 예약 대행<br/><br/><br/>○○ 예약 대행</div>

                </aside>
                <aside style={styles.chatListContainer}>
                    <div>
                        <input type="text" placeholder="채팅방 내용, 참여자 검색" style={styles.sidebarContentInput}/>
                        <div style={styles.chatList}>
                            <div>
                                <div>사용자 목록</div>
                                {nicknames.map(nickname => (
                                    nickname !== username && (
                                        <button key={nickname} style={styles.chatItem}
                                                onClick={() => handleAddUser(nickname)}>
                                            {nickname}
                                        </button>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
                <main style={styles.chatMain}>
                    {joined ? (
                        <div>
                            <div style={styles.chatHeader}>
                                <div style={styles.userIcon}></div>
                                <div style={styles.userName}>{chatUsername}</div>
                            </div>
                            <div style={{marginBottom: '20px', height: '58vh', overflowY: 'auto'}}>
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
                                style={{width: "80%", height: "30px"}}
                            />
                            <button
                                onClick={handleSendMessage}
                                style={{height: "40px", width: "70px"}}
                            >Send</button>
                        </div>

                    ) : (
                        <div>채팅방 입장 필요</div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ChatPage;
