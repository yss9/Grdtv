import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import TopBarComponent from "../../components/TopBar/TopBar";
import { Reset } from 'styled-reset';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const MainContentArea = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden; // Main content area에 스크롤 숨기기
`;

const Sidebar = styled.div`
    width: 250px;
    background-color: #4E53ED;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-family: Regular;
`;

const SidebarItem = styled.div`
    margin-bottom: 20px;
    padding-left: 40px;
    padding-top: 20px;
    cursor: pointer;
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: white;
    overflow: hidden;
    font-family: Regular;
`;

const Header = styled.div`
    padding-top: 50px;
    padding-left: 100px;
    
    margin-bottom: 30px;
`;

const ChatBox = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto; // ChatBox에 스크롤 추가
    background-color: #F4F6F8;
`;

const ChatMessage = styled.div`
    display: flex;
    justify-content: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
    margin-bottom: 10px;
`;

const MessageBubble = styled.div`
    max-width: 60%;
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => (props.isUser ? '#e5e5ea' : '#4a5fc1')};
    color: ${(props) => (props.isUser ? 'black' : 'white')};
`;

const ChatInputContainer = styled.div`
    display: flex;
    border-top: 1px solid #eee;
    padding: 10px;
    background-color: white;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: none;
    outline: none;
`;

const SendButton = styled.button`
    padding: 10px 30px;
    background-color: #4E53ED;
    color: white;
    border: none;
    cursor: pointer;
`;

const QuestionListContainer = styled.div`
    margin-top: 13px;
`;

const QuestionButton = styled.button`
    font-family: SubTitle;
    margin-right: 20px;
    padding: 12px 40px 12px 40px;
    background-color: transparent;
    border: 1px solid #4E53ED;
    border-radius: 13px;
    cursor: pointer;
`;

const GlloImg = styled.div`
    width: 73px;
    height: 65px;
    display: inline-block;
    position: absolute;
    left: 310px;
    top: 140px;
    background-image: url("/gllo.png");
    
`


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [connected, setConnected] = useState(false);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            try {
                const parts = token.split('.');
                if (parts.length !== 3) {
                    throw new Error('Invalid JWT token format');
                }
                const userPayload = JSON.parse(atob(parts[1]));
                const extractedUsername = userPayload.name;
                setUsername(extractedUsername);
                handleAddUser(extractedUsername, token);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            console.error('No JWT token found in cookies');
        }
    }, []);

    const handleAddUser = (extractedUsername, token) => {
        setConnected(true);
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            reconnectDelay: 5000,
            onConnect: () => {
                stompClient.subscribe('/topic/public', (message) => {
                    const msg = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, msg]);
                });

                stompClient.publish({
                    destination: "/app/chat.addUser",
                    body: JSON.stringify({ sender: extractedUsername, type: 'JOIN', token: `Bearer ${token}` })
                });
            }
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    };

    const sendMessage = () => {
        if (client && input.trim() !== '') {
            const message = {
                sender: username,
                content: input,
                type: 'CHAT'
            };

            setMessages((prevMessages) => [...prevMessages, message]);

            client.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(message)
            });
            setInput('');
        }
    };

    return (
        <>
            <Reset/>
            <Container>
                <div style={{height: '55px'}}></div>
                <TopBarComponent/>
                <MainContentArea>
                    <Sidebar>
                        <SidebarItem>새로운 채팅</SidebarItem>
                        <SidebarItem>이전 채팅</SidebarItem>
                    </Sidebar>
                    <MainContent>
                        {!connected ? (
                            <Header>로딩 중...</Header>
                        ) : (
                            <>
                                <Header>
                                    <GlloImg></GlloImg>
                                    챗봇 글로에게 궁금한 점을 물어보세요.<br/>
                                    무엇을 도와드릴까요?<br/><br/><br/>
                                    빠르고 쉽게 물어보세요.
                                    <QuestionListContainer>
                                        <QuestionButton>이용 방법</QuestionButton>
                                        <QuestionButton>여행지 추천</QuestionButton>
                                        <QuestionButton>자주 묻는 질문 1</QuestionButton>
                                        <QuestionButton>자주 묻는 질문 2</QuestionButton>
                                    </QuestionListContainer>
                                </Header>
                                <ChatBox>
                                    {messages.map((msg, index) => (
                                        <ChatMessage key={index} isUser={msg.sender === username}>
                                            <MessageBubble isUser={msg.sender === username}>
                                                {msg.content}
                                            </MessageBubble>
                                        </ChatMessage>
                                    ))}
                                </ChatBox>
                                <ChatInputContainer>
                                    <ChatInput
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder="궁금한 사항을 입력해 주세요."
                                    />
                                    <SendButton onClick={sendMessage}> > </SendButton>
                                </ChatInputContainer>
                            </>
                        )}
                    </MainContent>
                </MainContentArea>
            </Container>
        </>
    );
}

export default Chatbot;
