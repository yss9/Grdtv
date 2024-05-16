import {Reset} from "styled-reset";
import Agent from "../../components/Agent/Agent"
import {
    Community, Logo, LogoWrapper, MenuContainer, MyPage,
    Recomendation, Reservation, TopBar, Wrapper
} from "../review/reviewstyle";
import {
    SubTitle, SubTitleWrapper, SearchBarWrapper,
    SearchBarContainer, Magnifier, Search, Icon,
    SubTitle2, AgentContainer, Agents, GaugeBar, GaugeBarWrapper
} from './reservationstyle'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const AgentData=[
    { title: 'Review 1', content: 'This is the first blog', author: 'Author 1' },
    { title: 'Review 2', content: 'This is the second blog', author: 'Author 2' },
    { title: 'Review 3', content: 'This is the second blog', author: 'Author 3' },
    { title: 'Review 4', content: 'This is the first blog', author: 'Author 4' },
    { title: 'Review 5', content: 'This is the second blog', author: 'Author 5' },
    { title: 'Review 6', content: 'This is the second blog', author: 'Author 6' },
    { title: 'Review 7', content: 'This is the first blog', author: 'Author 7' },
    { title: 'Review 8', content: 'This is the second blog', author: 'Author 8' },
    { title: 'Review 9', content: 'This is the second blog', author: 'Author 9' },
];
export default function ReservationPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const reviewsPerPage = 3;

    const startIndex = activeIndex * reviewsPerPage;
    const visibleAgents = AgentData.slice(startIndex, startIndex + reviewsPerPage);

    const totalIndicators = Math.ceil(AgentData.length / reviewsPerPage);

    const navigate = useNavigate();

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };
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
                <SubTitleWrapper>
                    <SubTitle>필터 검색을 통해 원하는 대행자와 예약을 진행</SubTitle>
                </SubTitleWrapper>
                <SearchBarWrapper>
                    <Icon>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_74_14)">
                                <path d="M14.2222 32V21.3333H17.7778V24.8889H32V28.4444H17.7778V32H14.2222ZM0 28.4444V24.8889H10.6667V28.4444H0ZM7.11111 21.3333V17.7778H0V14.2222H7.11111V10.6667H10.6667V21.3333H7.11111ZM14.2222 17.7778V14.2222H32V17.7778H14.2222ZM21.3333 10.6667V0H24.8889V3.55556H32V7.11111H24.8889V10.6667H21.3333ZM0 7.11111V3.55556H17.7778V7.11111H0Z" fill="#5F6368"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_74_14">
                                    <rect width="32" height="32" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </Icon>
                    <SearchBarContainer>
                        <Search placeholder="여행지를 검색해 보세요."/>
                        <Magnifier>
                            <svg width="37" height="35" viewBox="-3 -5 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.7352 35L20.9321 22.75C19.916 23.5278 18.7474 24.1435 17.4265 24.5972C16.1055 25.0509 14.6999 25.2778 13.2096 25.2778C9.51767 25.2778 6.39343 24.0541 3.83687 21.6067C1.28031 19.1593 0.0013559 16.17 1.07526e-06 12.6389C-0.00135375 9.10778 1.2776 6.11852 3.83687 3.67111C6.39614 1.2237 9.52038 0 13.2096 0C16.8988 0 20.0237 1.2237 22.5843 3.67111C25.1449 6.11852 26.4232 9.10778 26.4191 12.6389C26.4191 14.0648 26.1821 15.4097 25.7079 16.6736C25.2337 17.9375 24.5901 19.0556 23.7772 20.0278L36.5804 32.2778L33.7352 35ZM13.2096 21.3889C15.7499 21.3889 17.9095 20.5385 19.6884 18.8378C21.4673 17.137 22.356 15.0707 22.3547 12.6389C22.3533 10.207 21.4645 8.14139 19.6884 6.44194C17.9122 4.7425 15.7526 3.89148 13.2096 3.88889C10.6666 3.8863 8.50764 4.73732 6.73282 6.44194C4.95799 8.14657 4.06855 10.2122 4.06449 12.6389C4.06042 15.0656 4.94987 17.1319 6.73282 18.8378C8.51577 20.5437 10.6747 21.3941 13.2096 21.3889Z" fill="#D9D9D9"/>
                            </svg>
                        </Magnifier>
                    </SearchBarContainer>
                </SearchBarWrapper>
                <SubTitleWrapper>
                    <SubTitle2>최근 이용자 수가 증가한 대행자 리스트예요.</SubTitle2>
                </SubTitleWrapper>
                <AgentContainer>
                    <Agents>
                        {visibleAgents.map((review, index) => (
                            <Agent key={index} review={review} />
                        ))}
                    </Agents>
                    <GaugeBarWrapper>
                        <GaugeBar completion={(activeIndex + 1) / totalIndicators * 100} onClick={handleGaugeClick} />
                    </GaugeBarWrapper>
                </AgentContainer>
            </Wrapper>
        </>
    )
}