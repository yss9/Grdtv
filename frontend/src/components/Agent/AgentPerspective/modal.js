// modal.js
import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    width: 400px;
    height: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    padding: 20px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    //background-color: #f0f0f0;
`;

const ModalTitle = styled.h2`
    margin-right: 100px;
    font-size: 22px;
    font-weight: bold;
    //background-color: #61dafb;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const ModalContent = styled.div`
    margin-top: 20px;
`;
const SaveBtn=styled.button`
    width: 70px;
    border: none;
    border-radius: 30px;
    height: 30px;
    background-color: black;
    color: white;
    font-family: Regular;
    font-weight: bold;
`

const Modal = ({ showModal, closeModal, children }) => {
    if (!showModal) return null;

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalHeader>
                    <CloseButton onClick={closeModal}>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.3 23L0 20.7L9.2 11.5L0 2.3L2.3 0L11.5 9.2L20.7 0L23 2.3L13.8 11.5L23 20.7L20.7 23L11.5 13.8L2.3 23Z"
                                fill="#5F6368"/>
                        </svg>
                    </CloseButton>
                    <ModalTitle>프로필 수정</ModalTitle>
                    <SaveBtn>저장</SaveBtn>
                </ModalHeader>
                <ModalContent>{children}</ModalContent>
            </ModalContainer>
        </ModalBackground>
    );
};

export default Modal;
