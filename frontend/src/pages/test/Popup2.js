import React, { useState } from 'react';
import styled from 'styled-components';
import Mainreview from './mainreview';
import Russia from '../../public/Img/moscow.png';
import Russia2 from '../../public/Img/russia.png';
import Russia3 from '../../public/Img/russia2.png';
import Russia4 from '../../public/Img/russia3.png';
import Russia5 from '../../public/Img/russia4.png';

const MainReviewData = [
    { image: Russia, title: '모스크바 황홀의 끝', sentence:'세계 어디서도 볼수없는 광경' },
    { image: Russia2, title: '블라디보스톡 여행', sentence:'이색적인 완벽한 장소' },
    { image: Russia3, title: '블라디보스톡 day4', sentence:'최고의 루트' },
    { image: Russia4, title: '블라디보스톡 day2', sentence:'완벽하게 아름다웠던 하루' },
    { image: Russia5,  title: '러시아와 첫만남', sentence:'모스크바 맛집 예약 후기' },
];

const PopupContainer = styled.div`
    position: absolute;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: ${({ y }) => y-100}px;
    left: ${({ x }) => x}px;
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
    box-shadow: inset 0 4px 4px #181945,
    inset 0 4px 4px rgba(255, 255, 255, 0.25),
    inset 0 4px 200px rgba(0, 0, 0, 0.25),
    inset 2px 2px 10px rgba(0, 0, 0, 0.3);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    backdrop-filter: blur(2px);
    border-radius: 0 30px 30px 30px;
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
    margin-left: 10px;
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
                <CloseBtn onClick={handleClose}>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.3 23L0 20.7L9.2 11.5L0 2.3L2.3 0L11.5 9.2L20.7 0L23 2.3L13.8 11.5L23 20.7L20.7 23L11.5 13.8L2.3 23Z"
                            fill="white"
                        />
                    </svg>
                </CloseBtn>
                <CountryName>러시아</CountryName>
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
