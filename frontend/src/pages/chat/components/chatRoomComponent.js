import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import BottomBarComponent from './bottomBarComponent';
import axios from "axios";
import Cookies from "js-cookie";
import {
    ProfileImgContainer,
    ProfileImg,
    PointButton,
    ModalBackground,
    ReviewContentsWrapper,
    ReviewSentence, ReviewInput, Button, ReviewInputWrapper, Sending
} from "../chatPageStyle";
import WebSocketService from "../WebSocketService";
import {jwtDecode} from "jwt-decode";

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
    max-width: 300px;
    min-width: 200px;
    padding: 20px;
    margin-bottom: 10px;
    position: relative;
    line-height: 1.5;
    // 긴 문장 줄바꿈
    word-wrap: break-word;
    word-break: break-word;
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

const StarSVG = ({ fill = "#C4C4C4" }) => (
    <svg width="45" height="45" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.1958 3.70821C21.3932 0.0229654 26.6068 0.0229607 27.8042 3.7082L30.5109 12.0385C31.0464 13.6866 32.5822 14.8024 34.3151 14.8024H43.0741C46.949 14.8024 48.5601 19.7609 45.4253 22.0385L38.3391 27.1869C36.9371 28.2055 36.3505 30.011 36.886 31.6591L39.5927 39.9894C40.7901 43.6746 36.5722 46.7391 33.4373 44.4615L26.3511 39.3131C24.9492 38.2945 23.0508 38.2945 21.6489 39.3131L14.5627 44.4615C11.4278 46.7391 7.20991 43.6746 8.40731 39.9894L11.114 31.6591C11.6495 30.011 11.0629 28.2055 9.66091 27.1869L2.57473 22.0385C-0.560124 19.7609 1.05098 14.8024 4.92587 14.8024H13.6849C15.4178 14.8024 16.9536 13.6866 17.4891 12.0385L20.1958 3.70821Z" fill={fill} />
    </svg>
);



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
                               step, setStep,
                               profilePictures, loading, setLoading
                           }) => {
    const token = Cookies.get('jwt');
    const serverUrl = 'http://localhost:8080';
    const [isSended, setIsSended] = useState(false);
    const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewInputValue, setReviewInputValue] = useState('');


    const isImage = (filePath) => {
        return filePath.match(/\.(jpeg|jpg|gif|png)$/);
    };

    const isPdf = (filePath) => {
        return filePath.match(/\.pdf$/);
    };

    const handleSendPoints = async (points) => {
        try {
            // 포인트 전송 API 호출
            const response = await axios.post('http://localhost:8080/api/users/transfer-points', {
                userNickname: username,
                agentNickname: chatUsername,
                points: points,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // JSON 형식 명시
                }
            });
            console.log('포인트 전송 성공:', response.data);
            await handleIsSendedTrue();
            setIsSended(true);
            setStep(3)
        } catch (error) {
            alert('포인트가 부족합니다.')
            console.error('포인트 전송 실패:', error);
            console.error('Error details:', error.response?.data); // 백엔드에서 반환된 에러 메시지 출력
        }

        try {
            // 진행 상황 업데이트 요청
            const response = await axios.post(
                'http://localhost:8080/api/booking/update-progress',
                null,
                {
                    params: {
                        userId: username,
                        agentId: chatUsername,
                        progress: 3
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': '*/*'
                    }
                }
            );
            console.log('Progress Update complete')
        } catch (error) {
            console.error('Failed to update progress', error);
            console.error('Error details:', error.response?.data);
        }
    };
    const handleIsSendedTrue = async () => {
        try {
            // 포인트 전송 API 호출
            const response = await axios.post('http://localhost:8080/api/booking/set-sended', {
                userNickname: username,
                agentNickname: chatUsername,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log('포인트 전송 완료 상태 업데이트 성공:', response.data);
            await pointSendedMessage();
        } catch (error) {
            console.error('포인트 전송 완료 상태 업데이트 실패:', error);
            console.error('Error details:', error.response?.data); // 백엔드에서 반환된 에러 메시지 출력
        }
    };

    const pointSendedMessage = () => {
        const message = {
            sender: username,
            content: `포인트 입금이 완료되었어요!\n글로플과 함께 특별하고 믿을 수 있는 여행을 떠나보아요!|button`,
            type: 'CHAT'
        };
        WebSocketService.sendMessage(message);

    };
    
    useEffect(() => {
        const getIsSended = async () => {
            try {
                // 포인트 전송 API 호출
                const response = await axios.get('http://localhost:8080/api/booking/check-sended', {
                    params: {
                        userNickname: username,
                        agentNickname: chatUsername,
                    },
                });
                console.log('포인트 전송 상태 가져오기 성공:', response.data);
                setIsSended(response.data);
            } catch (error) {
                console.error('포인트 전송 상태 가져오기 실패:', error);
                console.error('Error details:', error.response?.data); // 백엔드에서 반환된 에러 메시지 출력
            }
        };
        getIsSended();
    }, [token]);

    const onClickReviewButton = () => {
        setIsOpenReviewModal(true);
    }

    const handleCloseReviewModal = () => {
        setIsOpenReviewModal(false);
    }

    const handleReviewInputChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 35) { // maxLength 검증
            setReviewInputValue(newValue);
        }
    };

    const handleReviewUpload = async () => {
        console.log(rating);
        console.log(reviewInputValue);
        if (token) {
            try {
                const response = await axios.post(
                    `http://localhost:8080/api/bookReviews/agent/${chatUsername}`,
                    null,
                    {
                        params: {
                            star: rating,
                            content: reviewInputValue,
                        },
                    }
                );
                console.log('Review Update complete')
            } catch (error) {
                console.error('Failed to update review', error);
            }
        }
        setIsOpenReviewModal(false);
    }

    // 실시간 진행도 업데이트
    useEffect(() => {
        const fetchProgress = async () => {
            if (chatUsername) {
                try {
                    // 진행 상황 조회 요청
                    const response = await axios.get('http://localhost:8080/api/booking/progress', {
                        params: {
                            userId: username,
                            agentId: chatUsername
                        },
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('실시간 진행도 업데이트 성공:', response.data);
                    setStep(response.data);
                } catch (error) {
                    console.error('실시간 진행도 업데이트 실패', error);
                }
            }
        };

        fetchProgress();
    }, [chatUsername, username, token, messages]); // 의존성 배열에 필요한 값 추가

    useEffect(() => {
        const fetchLoading = () => {
            setLoading(false);
            console.log('loading...')
        };
        fetchLoading();
    }, [messages]); // 의존성 배열에 필요한 값 추가
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
                {isAgent ? (
                    <></>
                ) : (
                    <ReviewButton onClick={onClickReviewButton}>리뷰 &nbsp;&gt;</ReviewButton>
                )}
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
                                : <ProcessButton onClick={() => onClickProcessButton(1)}>reset(임시)</ProcessButton>
                    }
                </div>
            ) : (
                <div>

                </div>
            )}

            <ChatRoom>
                {messages.map((message, index) => (
                    <>
                        <ChatBubble
                            key={index}
                            style={{
                                ...(message.sender === username ? styles.myMessage : styles.otherMessage),
                                width: 'auto',
                                backgroundColor: message.content.includes('|button') || message.content.includes('|stt') ? '#FF9900' : undefined,
                                border: message.content.includes('|button') || message.content.includes('|stt') ? 'none' : '1px solid #4E53ED',
                                color: message.content.includes('|button') || message.content.includes('|stt') ? 'white' : 'black',
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
                                    {(isAgent||isSended) ? (
                                        <></>
                                    ) : (
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
                                    )}

                                </>
                            ) : message.content.includes('|stt') ? (
                                <div>{message.content.split('|stt')[0]}</div>

                            ) : (
                                message.content
                            )}
                        </ChatBubble>
                    </>
                ))}


                <div ref={bottomRef}></div>
            </ChatRoom>


            {isOpenReviewModal && (
                <ModalBackground onClick={handleCloseReviewModal}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#fefefe',
                            margin: '15% auto',
                            padding: '20px',
                            border: '1px solid #888',
                            width: '330px',
                            borderRadius: '15px'
                        }}
                    >
                        <span
                            onClick={handleCloseReviewModal}
                            style={{
                                color: '#aaa',
                                float: 'right',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                                ×
                            </span>

                        <ReviewContentsWrapper>
                            <ProfileImgContainer style={{width: '150px', height: '150px', marginTop: '20px'}}>
                                <ProfileImg
                                    src={'http://localhost:8080/' + profilePictures[chatUsername] || '/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'}
                                    alt='채팅방'
                                    onError={(e) => {
                                        e.target.onerror = null; // 무한 루프 방지
                                        e.target.src = '/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'; // 대체 이미지 설정
                                    }}
                                />
                            </ProfileImgContainer>
                            <ReviewSentence>
                                <span style={{color: 'black'}}>
                                {chatUsername}
                            </span> 님에게<br/>리뷰를 남겨주세요.
                            </ReviewSentence>
                            <div className="star-rating" style={{display: 'flex', gap: '4px'}}>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;

                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => setRating(ratingValue)}
                                                style={{display: 'none'}} // Hide the input
                                            />
                                            <div
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(0)}
                                                onClick={() => setRating(ratingValue)}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <StarSVG
                                                    fill={ratingValue <= (hover || rating) ? "#FFDD53" : "#C4C4C4"}/>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                            <ReviewInputWrapper>
                                <ReviewInput
                                    type="text"
                                    value={reviewInputValue}
                                    onChange={handleReviewInputChange}
                                    maxLength="35"/>
                            </ReviewInputWrapper>
                            <Button onClick={handleReviewUpload} style={{backgroundColor: '#4E53ED', width: '150px'}}>리뷰 쓰기</Button>
                        </ReviewContentsWrapper>
                    </div>
                </ModalBackground>
            )}


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
            {loading ? (
                <ModalBackground style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                    <Sending>
                        STT메세지를 보내는 중입니다...
                    </Sending>
                </ModalBackground>
            ) : (<></>)}
        </ChatRoomWrapper>
    );
};

export default ChatRoomComponent;