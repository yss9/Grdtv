import React, {useState} from 'react';
import styled from 'styled-components';
import BottomBarComponent from './bottomBarComponent';

// styled-components
const ChatRoomWrapper = styled.div`
  overflow: hidden;
`
const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: white;
    width: calc(100% - 30px);
`
const ReviewButton = styled.div`
    float: left;
    border: 1px solid #4E53ED;
    border-radius: 20px;
    width: 85px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-left: 35px;
`
const Username = styled.div`
    font-size: 18px;
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
`
const ChatBubble = styled.div`
    max-width: 40%;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
`
const GloplerListButton = styled.button`
    width: 120px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: white;
    background-color: #4E53ED;
    border: 1px solid #4E53ED;
    border-radius: 20px;
    margin-left: auto;
`
const ProcessWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 47px;
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
    font-size: 18px;
`;

const ChatRoomComponent = ({
                               chatUsername,
                               messages,
                               username,
                               styles,
                               input,
                               setInput,
                               handleOpenModal,
                               handleCloseModal,
                               handleFileChange,
                               onClickSendFile,
                               handleSendMessage,
                               handleKeyDown,
                               isVisible,
                               bottomRef,
                           }) => {

    const [step, setStep] = useState(2);

    return (
        <ChatRoomWrapper>
            <ChatHeader>
                <img
                    style={{
                        width: '50px',
                        float: 'left',
                    }}
                    src='/Img/프로토타입%20용%20임시%20채팅상대%20이미지.png'
                    alt='채팅방'
                />
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
            <div>
                <button onClick={() => setStep(1)}>step1</button>
                <button onClick={() => setStep(2)}>step2</button>
                <button onClick={() => setStep(3)}>step3</button>
                <button onClick={() => setStep(4)}>step4</button>
            </div>
            <ChatRoom style={{height: '58vh', overflowY: 'auto'}}>
                {messages.map((message, index) => (
                    <ChatBubble

                        key={index}
                        style={{
                            ...(message.sender === username ? styles.myMessage : styles.otherMessage),
                            width: 'auto',
                        }}
                    >
                        {message.content}
                    </ChatBubble>
                ))}
                <div ref={bottomRef}/>
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
            />
        </ChatRoomWrapper>
    );
};

export default ChatRoomComponent;
