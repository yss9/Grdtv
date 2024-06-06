import React, {useState} from 'react';
import { Reset } from 'styled-reset';
import TopBarComponent from '../../../components/TopBar/TopBar';
import {
    ConsentContainer, Container, DetailInfoWrapper,
    PlaceImg, PlaceName, Wrapper, RightWrapper,
    DetailInfoTitle, DetailInfo, ReviewContainer,
    BtnContainer, BtnTitle, FindRouteBtn,
    RecomendationBtn, ReviewTitle, PlaceReviews,
    PlaceReivewContainer, GaugeBar, GaugeBarWrapper
} from "./informationstyle";
import PlaceReivew from "../../../components/PlaceReview/placeReview";

const PlaceReviewData = [ //백엔드 처리
    {review: '리뷰1'},{review: '리뷰2'},
    {review: '리뷰3'},{review: '리뷰4'},
    {review: '리뷰5'},{review: '리뷰6'}
];


export default function Information() {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewsPerPage = 2;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleAgents = PlaceReviewData.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(PlaceReviewData.length / reviewsPerPage);

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    return(
        <>
            <Reset/>
            <TopBarComponent/>
            <Wrapper>
                <PlaceName>장소이름</PlaceName>
                <Container>
                    <ConsentContainer>
                        <PlaceImg></PlaceImg>
                        <RightWrapper>
                            <DetailInfoWrapper>
                                <DetailInfoTitle>상세정보</DetailInfoTitle>
                                <DetailInfo></DetailInfo>
                            </DetailInfoWrapper>
                            <ReviewContainer>
                                <ReviewTitle>리뷰</ReviewTitle>
                                <PlaceReivewContainer>
                                    <PlaceReviews>
                                        {visibleAgents.map((review, index) => (
                                            <PlaceReivew key={index} review={review} />
                                        ))}
                                    </PlaceReviews>
                                    <GaugeBarWrapper>
                                        <GaugeBar completion={(activeIndex + 1) / totalIndicators * 100} onClick={handleGaugeClick} />
                                    </GaugeBarWrapper>
                                </PlaceReivewContainer>
                            </ReviewContainer>
                        </RightWrapper>
                    </ConsentContainer>
                </Container>
                <BtnContainer>
                    <BtnTitle>해당 여행지를 포함한 여행이 궁금하다면?</BtnTitle>
                    <FindRouteBtn>루트 검색</FindRouteBtn>
                    <RecomendationBtn>루트 추천</RecomendationBtn>
                </BtnContainer>
            </Wrapper>

        </>
    )
}