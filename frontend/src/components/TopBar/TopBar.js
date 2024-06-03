import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5em;
  margin-top: 2.5vh;
`;

const LogoWrapper = styled.div`
  width: 34%;
  text-align: left;
  //background-color: #61dafb;
`;

const Logo = styled.span`
  font-size: 35px;
  font-weight: bolder;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  width: 56%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //background-color: pink;
`;

const Recomendation = styled.div`
  position: relative;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  //background-color: pink;
  height: 2.5em;
  display: flex;
  align-items: center;
`;

const RecomendationList = styled.ul`
  background-color: #d9d9d9;
  border: none;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  opacity: 0;
  transition: opacity 0.8s;
  pointer-events: none;
  :hover{
    background-color: white;
  }
  ${Recomendation}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`;

const RecomendationItem = styled.li`
  text-align: center;
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecomendationDropdown = ({ children }) => {
    return <RecomendationList>{children}</RecomendationList>;
};

const Community = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
`;

const MyPage = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
`;

export default function TopBarComponent() {
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

    const handleGoRecomendation = () => {
        navigate('/recomendation');
    };

    const handleGoMbti = () => {
        navigate('/recomendation/mbti');
    };

    const handleGoPersonal = () => {
        navigate('/recomendation/personal');
    };
    const handleGoMyPage = () => {
        navigate('/my');
    };

    return (
        <TopBar>
            <LogoWrapper>
                <Logo onClick={handleGoHome}>LOGO</Logo>
            </LogoWrapper>
            <MenuContainer>
                <Recomendation onClick={handleGoReservation}>
                    여행지 예약
                    <RecomendationDropdown>
                        <RecomendationItem >글로플러 찾기</RecomendationItem>
                        <RecomendationItem >채팅 목록</RecomendationItem>
                    </RecomendationDropdown>
                </Recomendation>
                <Recomendation onClick={handleGoRecomendation}>
                    여행지 추천
                    <RecomendationDropdown>
                        <RecomendationItem onClick={(e) => { e.stopPropagation(); handleGoMbti(); }}>MBTI 기반 추천</RecomendationItem>
                        <RecomendationItem>키워드 추천</RecomendationItem>
                        <RecomendationItem onClick={(e) => { e.stopPropagation(); handleGoPersonal(); }}>여행 루트 추천</RecomendationItem>
                    </RecomendationDropdown>
                </Recomendation>
                <Community>루트 탐색</Community>
                <Community onClick={handleGoReview}>커뮤니티</Community>
                <Community>챗봇</Community>
                <MyPage onClick={handleGoMyPage}>마이페이지</MyPage>
            </MenuContainer>
        </TopBar>
    );
}
