import {
    Community, Logo, LogoWrapper, MenuContainer, MyPage,
    Recomendation, Reservation, TopBar, Wrapper
} from "../review/reviewstyle";
import { Reset } from 'styled-reset';
import React from "react";
import {useNavigate} from "react-router-dom";

export default function MainPage() {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    };
    const handleGoReservation = () => {
        navigate('/reservation');
    };
    const handleGoReview = () => {
        navigate('/review');
    };

    return(
        <>
        <Reset/>
            <Wrapper>
                <TopBar>
                    <LogoWrapper>
                        <Logo onClick={handleGoHome}>LOGO</Logo>
                    </LogoWrapper>
                    <MenuContainer>
                        <Reservation onClick={handleGoReservation}>여행지 예약</Reservation>
                        <Recomendation>여행지 추천</Recomendation>
                        <Community onClick={handleGoReview}>커뮤니티</Community>
                        <MyPage>마이페이지</MyPage>
                    </MenuContainer>
                </TopBar>
            </Wrapper>
        </>
    )
}