import { Reset } from 'styled-reset';
import React from 'react';
import TopBarComponent from "../../../components/TopBar/TopBar";
import {
    KeywordBtn, Place, PlaceContainer, PlaceName, PlaceWrapper, RefreshBtn,
    SubTitle, SubTitleWrapper, Title, TitleWrapper, Wrapper
} from "./personalstyle";

export default function MainPage() {

    return(
        <>
            <Reset/>
            <TopBarComponent />
            <Wrapper>
                <TitleWrapper>
                    <Title>나만의 맞춤 여행지</Title>
                </TitleWrapper>
                <SubTitleWrapper>
                    <SubTitle>키워드 성향에 따른 맞춤형 여행지를 추천해 드려요.</SubTitle>
                    <RefreshBtn>
                        <p>추천 새로고침</p>
                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_484_188)">
                                <path d="M7 18.45C4.98 18.2 3.31 17.32 1.99 15.81C0.66 14.3 0 12.53 0 10.5C0 9.4 0.22 8.35 0.65 7.34C1.08 6.33 1.7 5.45 2.5 4.7L3.93 6.13C3.3 6.7 2.82 7.36 2.49 8.11C2.16 8.86 2 9.66 2 10.51C2 11.98 2.47 13.27 3.4 14.4C4.33 15.53 5.53 16.21 7 16.46V18.46V18.45ZM9 18.45V16.45C10.45 16.18 11.65 15.49 12.59 14.37C13.53 13.25 14 11.96 14 10.49C14 8.82 13.42 7.41 12.25 6.24C11.08 5.07 9.67 4.49 8 4.49H7.92L9.02 5.59L7.62 6.99L4.12 3.49L7.63 0L9.03 1.4L7.93 2.5H8.01C10.24 2.5 12.14 3.28 13.69 4.83C15.24 6.38 16.02 8.27 16.02 10.51C16.02 12.53 15.36 14.29 14.03 15.8C12.7 17.31 11.03 18.2 9.02 18.46L9 18.45Z" fill="#5F6368"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_484_188">
                                    <rect width="16" height="18.45" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </RefreshBtn>
                </SubTitleWrapper>
                <PlaceContainer>
                    <PlaceWrapper>
                        <Place></Place>
                        <PlaceName>여행지</PlaceName>
                    </PlaceWrapper>
                    <PlaceWrapper>
                        <Place></Place>
                        <PlaceName>여행지</PlaceName>
                    </PlaceWrapper>
                    <PlaceWrapper>
                        <Place></Place>
                        <PlaceName>여행지</PlaceName>
                    </PlaceWrapper>
                </PlaceContainer>
                <KeywordBtn>키워드 다시 선정하기</KeywordBtn>
            </Wrapper>
        </>
    )
}