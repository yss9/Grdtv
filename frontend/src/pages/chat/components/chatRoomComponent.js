import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import BottomBarComponent from './bottomBarComponent';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import {ProfileImgContainer, ProfileImg, PointButton} from "../chatPageStyle";

// styled-components
const ChatRoomWrapper = styled.div`
    overflow: hidden;
    height: 100%
`
const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: white;
    width: calc(100% - 30px);
    height: 40px;
`
const ReviewButton = styled.div`
    float: left;
    border: 1px solid #4E53ED;
    border-radius: 20px;
    width: 85px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-left: 35px;
    cursor: pointer;
`
const Username = styled.div`
    font-size: 20px;
    margin-left: 20px;
`
const ChatRoom = styled.div`
    padding: 0 20px;
    // 스크롤바 숨기기~♥
    -ms-overflow-style: none;  // IE, Edge 
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
        display: none;  // Chrome, Safari, Opera
    }
    overflow: hidden;
    height: 50vh;
    overflow-y: auto;
    
`
const ChatBubble = styled.div`
    max-width: 30%;
    padding: 20px;
    margin-bottom: 10px;
    position: relative;
`
const GloplerListButton = styled.button`
    width: 120px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: white;
    background-color: #4E53ED;
    border: 1px solid #4E53ED;
    border-radius: 20px;
    margin-left: auto;
`
const ProcessWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 45px;
    background-color: #d9d9d9;
    border-radius: 0 30px 30px 0;
    margin-bottom: 5px;
`
const Process = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: orange;
    border-radius: 0 30px 30px 0;
    width: ${({ step }) =>
            step === 1 ? '25%' :
                    step === 2 ? '50%' :
                            step === 3 ? '75%' : '100%'};
    display: flex;
    justify-content: space-between;
    transition: width 0.5s ease-in-out;
`;
const ProcessText = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: grid;
    place-items: center;
    width: 25%;
    color: ${({ active }) => (active ? 'white' : 'black')};
    font-size: 14px;
`;
const ProcessButton = styled.button`
    width: 130px;
    height: 37px;
    background-color: #4E53ED;
    border: none;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    float: right;
    margin: 5px 10px;
    font-size: 13px;
    cursor: pointer;
    //box-shadow: #515151 1px 5px;
`





const ChatRoomComponent = ({
                               chatUsername,
                               messages,
                               username,
                               styles,
                               input,
                               setInput,
                               handleOpenModal, handleCloseModal,
                               handleFileChange,
                               onClickSendFile,
                               handleSendMessage,
                               handleKeyDown,
                               isVisible,
                               bottomRef,
                               isAgent,
                               handleVoiceMessageUpload,
                               userId,
                               onClickProcessButton,
                               step,
                               profilePictures
                           }) => {
    const token = Cookies.get('jwt');

    const serverUrl = 'http://localhost:8080';

    const isImage = (filePath) => {
        return filePath.match(/\.(jpeg|jpg|gif|png)$/);
    };

    const isPdf = (filePath) => {
        return filePath.match(/\.pdf$/);
    };

    const handleSendPoints = async (points) => {
        try {
            // 포인트 전송 API 호출
            // const response = await axios.post('http://localhost:8080/api/points/send', {
            //     fromUser: chatUsername,
            //     toUser: username,
            //     points: points,
            // }, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //     }
            // });
            // console.log('포인트 전송 성공:', response.data);
        } catch (error) {
            console.error('포인트 전송 실패:', error);
        }
    };

    return (
        <ChatRoomWrapper>
            <ChatHeader>
                <ProfileImgContainer>
                    <ProfileImg
                        src={'http://localhost:8080/'+profilePictures[chatUsername] || '/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'}
                        alt='채팅방'
                        onError={(e) => {
                            e.target.onerror = null; // 무한 루프 방지
                            e.target.src = '/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'; // 대체 이미지 설정
                        }}
                    />
                </ProfileImgContainer>
                <Username>{chatUsername}</Username>
                <ReviewButton>리뷰 &nbsp;&gt;</ReviewButton>
                <GloplerListButton>글로플러 목록</GloplerListButton>
            </ChatHeader>
            <ProcessWrapper>
                <Process step={step}/>
                {[1, 2, 3, 4].map((i) => (
                    <ProcessText
                        key={i}
                        active={i <= step}
                        style={{ left: `${(i - 1) * 25}%` }}
                    >
                        {i === 1 ? '글로플러 매칭' : i === 2 ? '대행 진행' : i === 3 ? '입금 완료' : '여행 완료'}
                    </ProcessText>
                ))}
            </ProcessWrapper>
            {isAgent ? (
                <div style={{width: '100%',height: '60px'}}>
                    {step === 1 ? <ProcessButton onClick={() => onClickProcessButton(2)}>대행 진행하기</ProcessButton>
                        : step === 2 ? <ProcessButton onClick={() => onClickProcessButton(3)}>입금 진행하기</ProcessButton>
                            : step === 3 ? <ProcessButton onClick={() => onClickProcessButton(4)}>여행 완료하기</ProcessButton>
                                : <ProcessButton onClick={() => onClickProcessButton(1)}>step1(임시)</ProcessButton>
                    }
                </div>
            ) : (
                <div>

                </div>
            )}

            <ChatRoom>
                {messages.map((message, index) => (
                    <ChatBubble
                        key={index}
                        style={{
                            ...(message.sender === username ? styles.myMessage : styles.otherMessage),
                            width: 'auto',
                            backgroundColor: message.content.includes('|button') ? '#FF9900' : undefined,
                            border: message.content.includes('|button') ? 'none' : '1px solid #4E53ED',
                            color: message.content.includes('|button') ? 'white' : 'black',
                        }}
                    >
                        {isImage(message.content) ? (
                            // 이미지일 경우 미리보기
                            <img
                                src={`${serverUrl}${message.content}`}
                                alt="Image preview"
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                        ) : isPdf(message.content) ? (
                            // PDF일 경우 보기 링크 제공
                            <a href={`${serverUrl}${message.content}`} target="_blank" rel="noopener noreferrer">
                                PDF 파일 보기
                            </a>
                        ) : message.content.includes('/image/') ? (
                            // 그 외 파일 다운로드 링크 제공
                            <a href={`${serverUrl}${message.content}`} target="_blank" rel="noopener noreferrer">
                                파일 다운로드
                            </a>
                        ) : message.content.includes('|button') ? (
                            <>
                                <div>{message.content.split('|button')[0]}</div>
                                <PointButton
                                    onClick={() => {
                                        // 정규식을 사용해 '포인트' 앞의 숫자를 추출
                                        const match = message.content.match(/(\d+)\s*포인트/);
                                        const points = match ? parseInt(match[1], 10) : 0; // 숫자가 없으면 기본값 0
                                        handleSendPoints(points);
                                    }}
                                >
                                    포인트 입금하기
                                </PointButton>
                            </>
                        ) : (
                            message.content
                        )}
                    </ChatBubble>

                ))}

                <div ref={bottomRef}></div>
            </ChatRoom>


            <BottomBarComponent
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                handleFileChange={handleFileChange}
                onClickSendFile={onClickSendFile}
                handleSendMessage={handleSendMessage}
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
                isVisible={isVisible}
                handleVoiceMessageUpload={handleVoiceMessageUpload}
            />
        </ChatRoomWrapper>
    );
};

export default ChatRoomComponent;
