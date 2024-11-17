import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Mainreview from './mainreview';
import axios from 'axios';

const PopupContainer = styled.div`
    padding: 10px;
    position: absolute; // 클릭 위치에 고정
    display: flex;
    flex-direction: column;
    align-items: center;
    top: ${({ y }) => y- 100}px;
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
    box-shadow: inset 0 4px 4px #181945,
    inset 0 4px 4px rgba(255, 255, 255, 0.25),
    inset 0 4px 200px rgba(0, 0, 0, 0.25),
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

const Popup = ({ x, y, onClose, country }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [reviewData, setReviewData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true); // 데이터 요청 전 로딩 시작
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${country}`);
                const formattedData = response.data.map(item => ({
                    image: item.thumbnail,
                    title: item.title,
                    sentence: new Date(item.createDate).toLocaleDateString(),
                }));
                setReviewData(formattedData);
            } catch (error) {
                console.error('Error fetching review data:', error);
            } finally {
                setIsLoading(false); // 요청 완료 후 로딩 종료
            }
        };

        if (country) fetchReviews();
    }, [country]);

    const reviewsPerPage = 2;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleReviews = reviewData.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(reviewData.length / reviewsPerPage);

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
                <CountryName>{country}</CountryName>
                <CloseBtn onClick={handleClose}>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.3 23L0 20.7L9.2 11.5L0 2.3L2.3 0L11.5 9.2L20.7 0L23 2.3L13.8 11.5L23 20.7L20.7 23L11.5 13.8L2.3 23Z"
                            fill="white"
                        />
                    </svg>
                </CloseBtn>
            </TopWrapper>
            {isLoading ? ( // 로딩 중일 때 표시
                <div style={{ color: 'white', marginTop: '20px' }}>로딩 중...</div>
            ) : reviewData.length === 0 ? ( // 데이터가 없을 때 메시지 표시
                <div style={{ color: 'white', marginTop: '20px' }}>해당 블로그가 존재하지 않습니다.</div>
            ) : ( // 데이터가 있을 때 리뷰 표시
                <>
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
                </>
            )}
            <GoReservationBtn>예약 바로가기</GoReservationBtn>
        </PopupContainer>
    );
};

export default Popup;
