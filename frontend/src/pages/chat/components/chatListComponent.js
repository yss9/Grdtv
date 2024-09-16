import React from 'react';
import styled from 'styled-components';

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
    height: 30px;
`

const ChatListComponent = ({ nicknames, username, handleAddUser }) => {
    return (
        <ChatListWrapper>
            <SidebarContentInput type="text" placeholder="채팅방 내용, 참여자 검색" />
            <ChatList>
                <div>
                    {nicknames.map((nickname) => (
                        nickname !== username && (
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
                                <img
                                    style={{
                                        width: '50px',
                                        float: 'left',
                                    }}
                                    src='/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'
                                    alt='채팅방'
                                />
                                <div
                                    style={{
                                        float: 'right',
                                        width: 'calc(100% - 70px)',
                                        padding: '0 10px',
                                    }}
                                >
                                    <div>
                                        <ChatItem>
                                            {nickname}
                                        </ChatItem>
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'gray' }}>
                                        메세지를 보내서 글로플러와...
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </ChatList>
        </ChatListWrapper>
    );
};

export default ChatListComponent;
