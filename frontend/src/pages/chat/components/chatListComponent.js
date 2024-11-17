import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import Cookies from "js-cookie";
import {ProfileImgContainer, ProfileImg} from "../chatPageStyle";

const ChatListWrapper = styled.aside`
    width: 18%;
    padding: 10px;
    overflow-y: auto;
    // 스크롤바 숨기기~♥
    -ms-overflow-style: none;  // IE, Edge 
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
        display: none;  // Chrome, Safari, Opera
    }
`;
const ChatList = styled.div`
    list-style: none;
    padding: 0;
    overflow-x: hidden;
`
const ChatItem = styled.div`
    margin-bottom: 5px;
    width: 100%;
`
const SidebarContentInput = styled.input`
    width: 100%;
    padding: 0 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    border: none;
    background-color: #E8E8E8;
    height: 40px;
`
const ChatContainer = styled.div`
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
`;

const ChatListComponent = ({ nicknames, handleAddUser, profilePictures, chattingNicknames, chatEndedNicknames, isRecentChatting }) => {

    if (isRecentChatting) {
        nicknames = chattingNicknames;
    } else {
        nicknames = chatEndedNicknames;
    }

    return (
        <ChatListWrapper>
            <SidebarContentInput type="text" placeholder="채팅방 내용, 참여자 검색" />
            <ChatList>
                <div>
                    {nicknames && nicknames.length > 0 && nicknames.map((nickname) => (
                        <div
                            style={{
                                width: '100%',
                                borderBottom: '1px solid lightgray',
                                cursor: 'pointer',
                                padding: '10px',
                                overflowX: 'hidden',
                            }}
                            onClick={() => handleAddUser(nickname)}
                            key={nickname}
                        >
                            <ChatContainer>
                                <ProfileImgContainer>
                                    <ProfileImg
                                        src={
                                            'http://localhost:8080/' + profilePictures[nickname] || '/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'
                                        }
                                        alt='채팅방'
                                        onError={(e) => {
                                            e.target.onerror = null; // 무한 루프 방지
                                            e.target.src = '/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'; // 대체 이미지 설정
                                        }}
                                    />
                                </ProfileImgContainer>
                                <div
                                    style={{
                                        width: 'calc(100% - 70px)',
                                        padding: '0 10px',
                                    }}
                                >
                                    <div>
                                        <ChatItem>{nickname}</ChatItem>
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'gray' }}>
                                        메세지를 보내서 글로플러와 대화해 보세요.
                                    </div>
                                </div>
                            </ChatContainer>
                        </div>
                    ))}

                </div>
            </ChatList>
        </ChatListWrapper>
    );
};

export default ChatListComponent;
