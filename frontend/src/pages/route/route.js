import { Wrapper } from "../review/reviewstyle";
import { Reset } from 'styled-reset';
import React, { useState } from "react";
import {
    RecBtn, RecBtnWrapper, RecContainer, RecSubTitle,
    RecTitle, RecWrapper, RecInput, RecList, RecListItem, RecListCountry
} from "./routestyle";
import TopBarComponent from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // 모달 컴포넌트 import

export default function RoutePage() {
    const [showInput, setShowInput] = useState(false);
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가
    const navigate = useNavigate();

    const onClickRecBtn = () => {
        setShowInput(true);
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <Reset />
            <Wrapper>
                <TopBarComponent />
                <RecWrapper>
                    <RecContainer>
                        <RecTitle>여행지 탐색</RecTitle>
                        <RecSubTitle>
                            <p>처음 접하는 해외 여행에 어려움을 겪고 있을까요?</p>
                            <p>원하는 키워드를 선정해 맞춤형 여행 루트를 받아보세요.</p>
                        </RecSubTitle>
                        <RecBtnWrapper>
                            {!showInput && (
                                <RecBtn onClick={onClickRecBtn}>
                                    <p>루트 탐색</p>
                                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L10 9L1 17" stroke="white" strokeWidth="2" />
                                    </svg>
                                </RecBtn>
                            )}
                            {showInput && (
                                <div>
                                    <RecInput placeholder="어디로 여행을 떠나시나요?" />
                                    <RecList>
                                        <RecListItem>하와이
                                            <RecListCountry>미국</RecListCountry>
                                        </RecListItem>
                                        <RecListItem>괌
                                            <RecListCountry>미국</RecListCountry>
                                        </RecListItem>
                                        <RecListItem onClick={openModal}>오사카
                                            <RecListCountry>일본</RecListCountry>
                                        </RecListItem>
                                        <RecListItem>도쿄
                                            <RecListCountry>일본</RecListCountry>
                                        </RecListItem>
                                        <RecListItem>뉴욕
                                            <RecListCountry>미국</RecListCountry>
                                        </RecListItem>
                                    </RecList>
                                </div>
                            )}
                        </RecBtnWrapper>
                    </RecContainer>
                </RecWrapper>
                <Modal isOpen={showModal} onClose={closeModal} />
            </Wrapper>
        </>
    )
}
