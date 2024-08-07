import React, { useState } from 'react';
import styled from 'styled-components';
import Mainreview from './mainreview';
import Osaka from '../../public/Img/osaka.png';
import Sushi from '../../public/Img/sushi.png';
import Sushi2 from '../../public/Img/sushi2.png';

const MainReviewData = [
    { image: Osaka, title: '오사카 최고의 맛집', sentence:'글로플러가 엄선한 맛집 list'  },
    { image: Sushi, title: '도쿄의 전통 스시', sentence:'도쿄 최고의 초밥집'  },
    { image: Sushi2, title: '스시의 본고장 일본', sentence:'최고의 스시를 맛보다' },
];

const PopupContainer = styled.div`
    position: absolute;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: ${({ y }) => y}px;
    left: ${({ x }) => x-350}px;
    background: linear-gradient(
            133.4deg,
            #000000 0.96%,
            rgba(0, 0, 0, 0.3) 19.17%,
            rgba(0, 0, 0, 0.5) 28.14%,
            rgba(0, 0, 0, 0.8) 42.78%,
            rgba(0, 0, 0, 0.661422) 75.55%,
            rgba(0, 0, 0, 0.5) 93.67%,
            rgba(0, 0, 0, 0.159736) 98.78%,
            rgba(0, 0, 0, 0) 100.83%
    );
    box-shadow: inset 0px 4px 4px #181945,
    inset 0px 4px 4px rgba(255, 255, 255, 0.25),
    inset 0px 4px 200px rgba(0, 0, 0, 0.25),
    inset 2px 2px 10px rgba(0, 0, 0, 0.3);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    backdrop-filter: blur(2px);
    border-radius: 30px 0 30px 30px;
    width: 350px;
    height: 400px;
    border: 2px solid #999cff;
`;

const TopWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: 10px 0 0 10px;
`;

const CountryName = styled.div`
    color: white;
    font-family: Title;
    font-size: 28px;
    border-bottom: 5px solid #4e53ed;
    margin: 0 20px 0 0;
`;

const CloseBtn = styled.div`
    cursor: pointer;
    margin-right: 10px;
`;

const GaugeBarWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 5px;
`;

const GaugeBar = styled.div`
    width: 93%;
    height: 8px;
    background-color: #ffffff;
    border-radius: 100px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${(props) => props.completion}%;
        background-color: #ff9900;
        border-radius: 100px;
        transition: width 0.5s ease;
    }
`;

const GoReservationBtn = styled.button`
    width: 160px;
    height: 50px;
    background-color: #4e53ed;
    border: none;
    color: white;
    font-size: 18px;
    border-radius: 15px;
    margin-top: 40px;
    font-family: Regular;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    width: 100%;
`;

const SeeMoreBtn = styled.button`
    margin-right: 3%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 120px;
    height: 35px;
    border-radius: 30px;
    background-color: #333333;
    color: white;
    border: 1px solid #ffffff;
`;

const MainReviews = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
`;

const Popup = ({ x, y, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewsPerPage = 2;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleReviews = MainReviewData.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(MainReviewData.length / reviewsPerPage);

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <PopupContainer x={x} y={y}>
            <TopWrapper>
                <CountryName>일본</CountryName>
                <CloseBtn onClick={handleClose}>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.3 23L0 20.7L9.2 11.5L0 2.3L2.3 0L11.5 9.2L20.7 0L23 2.3L13.8 11.5L23 20.7L20.7 23L11.5 13.8L2.3 23Z"
                            fill="white"
                        />
                    </svg>
                </CloseBtn>
            </TopWrapper>
            <BtnWrapper>
                <SeeMoreBtn>
                    리뷰 더 보기
                    <svg
                        width="11"
                        height="16"
                        viewBox="0 0 11 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 1L9 8L1 15" stroke="#C0C0C0" strokeOpacity="0.8" strokeWidth="2" />
                    </svg>
                </SeeMoreBtn>
            </BtnWrapper>
            <MainReviews>
                {visibleReviews.map((review, index) => (
                    <Mainreview key={index} review={review} />
                ))}
            </MainReviews>
            <GaugeBarWrapper>
                <GaugeBar completion={(activeIndex + 1) / totalIndicators * 100} onClick={handleGaugeClick} />
            </GaugeBarWrapper>
            <GoReservationBtn>예약 바로가기</GoReservationBtn>
        </PopupContainer>
    );
};

export default Popup;
