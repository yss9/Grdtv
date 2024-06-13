import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import Osaka from '../../../public/Img/osaka.png';
import Paris from '../../../public/Img/paris.png';
import Sydney from '../../../public/Img/sydney.png';
import Kyoto from "../../../public/Img/kyoto.png";
import ApelTower from "../../../public/Img/apeltower.png";
import ThaiMarket from "../../../public/Img/thaimarket.png";
import Morein from "../../../public/Img/morein.png";
import Bbatong from "../../../public/Img/bbatong.png";
import Louis from "../../../public/Img/louis.png";
import Apls from "../../../public/Img/alps.png";

const PlaceReviewData = [
    { placename: '오사카', review: '오사카 리뷰1' },
    { placename: '오사카', review: '오사카 리뷰2' },
    { placename: '오사카', review: '오사카 리뷰3' },
    { placename: '오사카', review: '오사카 리뷰4' },
    { placename: '오사카', review: '오사카 리뷰5' },
    { placename: '오사카', review: '오사카 리뷰6' },
    { placename: '파리', review: '파리 리뷰1' },
    { placename: '파리', review: '파리 리뷰2' },
    { placename: '파리', review: '파리 리뷰3' },
    { placename: '파리', review: '파리 리뷰4' },
    { placename: '호주', review: '호주 리뷰1' },
    { placename: '호주', review: '호주 리뷰2' },
    { placename: '호주', review: '호주 리뷰3' },
    { placename: '호주', review: '호주 리뷰4' },
    { placename: '도초지', review: '호주 리뷰1' },
    { placename: '도초지', review: '호주 리뷰2' },
    { placename: '도초지', review: '호주 리뷰3' },
    { placename: '도초지', review: '호주 리뷰4' },
    { placename: '에펠탑', review: '호주 리뷰1' },
    { placename: '에펠탑', review: '호주 리뷰2' },
    { placename: '에펠탑', review: '호주 리뷰3' },
    { placename: '에펠탑', review: '호주 리뷰4' },
    { placename: '수상시장', review: '호주 리뷰1' },
    { placename: '수상시장', review: '호주 리뷰2' },
    { placename: '수상시장', review: '호주 리뷰3' },
    { placename: '수상시장', review: '호주 리뷰4' },
    { placename: '모레인 호수', review: '호주 리뷰4' },
    { placename: '모레인 호수', review: '호주 리뷰4' },
    { placename: '빠통 비치', review: '호주 리뷰4' },
    { placename: '빠통 비치', review: '호주 리뷰4' },
    { placename: '루이스 호수', review: '호주 리뷰4' },
    { placename: '루이스 호수', review: '호주 리뷰4' },
    { placename: '알프스 산맥', review: '호주 리뷰4' },
    { placename: '알프스 산맥', review: '호주 리뷰4' },
];

const PlaceData = [
    { placename: '오사카', detail: '오사카는 블라블라 개쩜 개존잼 개존맛 가세요 유후~', image: Osaka },
    { placename: '파리', detail: '마카롱 존맛탱', image: Paris },
    { placename: '호주', detail: '쿼카 졸귀탱', image: Sydney },
    { placename: '도초지',detail:'당고 존맛탱', image: Kyoto},
    { placename: '에펠탑',detail:'봉주르', image: ApelTower},
    { placename: '수상시장',detail:'팟타이 먹고싶당', image: ThaiMarket},
    { placename: '모레인 호수', image: Morein, detail: '여긴어디지' },
    { placename: '빠통 비치', image: Bbatong, detail: '여기도 어딘지모름' },
    { placename: '루이스 호수', image: Louis, detail: '여기또한 어딘지몰겟음' },
    { placename: '알프스 산맥', image: Apls, detail: '여긴 걍 내가 가고싶어서 넣어봄'},

];

export default function Information() {

    const { placename } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentPlace, setCurrentPlace] = useState({});
    const [filteredReviews, setFilteredReviews] = useState([]);

    useEffect(() => {
        const place = PlaceData.find(place => place.placename === placename);
        if (place) {
            setCurrentPlace(place);
            setFilteredReviews(PlaceReviewData.filter(review => review.placename === placename));
            setActiveIndex(0); // Reset index when place changes
        }
    }, [placename]);

    const reviewsPerPage = 2;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(filteredReviews.length / reviewsPerPage);

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Wrapper>
                <PlaceName>{currentPlace.placename}</PlaceName>
                <Container>
                    <ConsentContainer>
                        <PlaceImg src={currentPlace.image} />
                        <RightWrapper>
                            <DetailInfoWrapper>
                                <DetailInfoTitle>{currentPlace.placename}</DetailInfoTitle>
                                <DetailInfo>{currentPlace.detail}</DetailInfo>
                            </DetailInfoWrapper>
                            <ReviewContainer>
                                <ReviewTitle>리뷰</ReviewTitle>
                                <PlaceReivewContainer>
                                    <PlaceReviews>
                                        {visibleReviews.map((review, index) => (
                                            <PlaceReivew key={index} review={review.review} />
                                        ))}
                                    </PlaceReviews>
                                    <GaugeBarWrapper>
                                        <GaugeBar
                                            completion={(activeIndex + 1) / totalIndicators * 100}
                                            onClick={handleGaugeClick}
                                        />
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
