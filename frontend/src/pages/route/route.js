import {Wrapper} from "../review/reviewstyle";
import { Reset } from 'styled-reset';
import React from "react";
import {
    RecBtn, RecBtnWrapper, RecContainer, RecSubTitle,
    RecTitle, RecWrapper
} from "./routestyle";
import TopBarComponent from "../../components/TopBar/TopBar";

export default function RecomendationPage() {

    return(
        <>
            <Reset/>
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
                            <RecBtn>
                                <p>루트 탐색</p>
                                <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L10 9L1 17" stroke="black" strokeWidth="2"/>
                                </svg>
                            </RecBtn>
                        </RecBtnWrapper>
                    </RecContainer>
                </RecWrapper>
            </Wrapper>
        </>
    )
}