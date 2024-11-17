import React from 'react';
import styled from 'styled-components';
import {ModalBackground, Button} from "../chatPageStyle";

const BottomBar = styled.div`
    overflow: hidden;
    position: fixed;
    bottom: 0;
    right: 3%;
    width: 60%;
    height: 8vh;
    border-radius: 10px 10px 0 0;
    box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
`
const SendButton = styled.div`
    height: 100%;
    width: 9%;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4E53ED;
    &:hover {
        cursor: pointer;
    }
`
const ChatInput = styled.input`
    width: 83%;
    height: 100%;
    border: none;
    float: right;
    outline: none;
`

const BottomBarComponent = ({
                                handleOpenModal,
                                handleCloseModal,
                                handleFileChange,
                                onClickSendFile,
                                handleSendMessage,
                                input,
                                setInput,
                                handleKeyDown,
                                isVisible,
                                handleVoiceMessageUpload,
                            }) => {
    return (
        <BottomBar>
            <div style={{ float: 'left', width: '7%', height: '100%' }}>
                <button
                    style={{
                        float: 'none',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'gray',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                    }}
                    onClick={handleOpenModal}
                >
                    +
                </button>
                {isVisible && (
                    <ModalBackground onClick={handleCloseModal}>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: '#fefefe',
                                margin: '15% auto',
                                padding: '30px',
                                border: '1px solid #888',
                                width: '30%',
                                borderRadius: '20px',
                            }}
                        >
                            <span
                                onClick={handleCloseModal}
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
                            <input
                                style={{width: '100%', height: '50px'}}
                                type="file"
                                onChange={handleFileChange}
                            />
                            <Button
                                style={{
                                    margin: '10px auto',
                                    width: '130px',
                                    fontSize: '17px',
                                }}
                                onClick={onClickSendFile}
                            >
                                파일 전송
                            </Button>
                            <Button
                                style={{
                                    margin: '0 auto',
                                    width: '160px',
                                    fontSize: '17px',
                                }}
                                onClick={handleVoiceMessageUpload}
                            >
                                음성 파일 전송
                            </Button>
                        </div>
                    </ModalBackground>
                    )}
            </div>
            <SendButton onClick={handleSendMessage}>
                <img style={{height: '60%'}} src='/Img/채팅%20메세지%20버튼.png' alt='채팅 메세지 버튼'/>
            </SendButton>
            <ChatInput
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메세지를 보내서 글로플러와 예약을 진행해 보세요."
            />
        </BottomBar>
    );
};

export default BottomBarComponent;
