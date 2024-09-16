import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Container=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1500px;
  height: 50px;
  //margin-top: 3vh;
  //background-color: gray;
`;

const LogoWrapper = styled.div`
  width: 37%;
  text-align: left;
  //background-color: #61dafb;
    
`;

const Logo = styled.div`
    background-image: url("/GlopleLogo.png");
    background-size: cover;
    background-position: center;
    width: 250px;
    height: 50px;
    display: flex;
  margin-bottom: 1.5em;
  cursor: pointer;
  //background-color: pink;
    
`;

const MenuContainer = styled.div`
  width: 56%;
  display: flex;
  align-items: center;
  justify-content: space-between;
 
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


export default function TopBarComponent({ fontColor }) {
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

    const handleGoRoute = () => {
        navigate('/route');
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

    const handleGoChatBot = () =>{
        navigate('/chatbot');
    };

    const handleGoChat = () =>{
        navigate('/chat');
    };

    return (
        <Container>
            <TopBar>
                <LogoWrapper>
                    <Logo onClick={handleGoHome}></Logo>
                </LogoWrapper>
                <MenuContainer style={{color:fontColor}}>
                    <Recomendation>
                        여행지 예약
                        <RecomendationDropdown>
                            <RecomendationItem style={{color:"black"}} onClick={handleGoReservation}>글로플러 찾기</RecomendationItem>
                            <RecomendationItem style={{color:"black"}} onClick={handleGoChat}>채팅 목록</RecomendationItem>
                        </RecomendationDropdown>
                    </Recomendation>
                    <Recomendation>
                        여행지 추천
                        <RecomendationDropdown>
                            <RecomendationItem style={{color:"black"}} onClick={(e) => { e.stopPropagation(); handleGoMbti(); }}>MBTI 기반 추천</RecomendationItem>
                            <RecomendationItem style={{color:"black"}} onClick={(e) => { e.stopPropagation(); handleGoPersonal(); }}>키워드 추천</RecomendationItem>
                        </RecomendationDropdown>
                    </Recomendation>
                    <Community style={{color:fontColor}} onClick={handleGoRoute}>루트 탐색</Community>
                    <Community style={{color:fontColor}} onClick={handleGoReview}>커뮤니티</Community>
                    <Community style={{color:fontColor}} onClick={handleGoChatBot}>챗봇</Community>
                    <MyPage style={{color:fontColor}} onClick={handleGoMyPage}>마이페이지</MyPage>
                </MenuContainer>
            </TopBar>
        </Container>
    );
}
