import React, { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';
import TopBarComponent from '../../../components/TopBar/TopBar';
import {
    ConsentContainer, Container, DetailInfoWrapper,
    PlaceImg, PlaceName, Wrapper, RightWrapper,
    DetailInfoTitle, DetailInfo, ReviewContainer,
    BtnContainer, BtnTitle,
    RecomendationBtn, ReviewTitle, PlaceReviews,
    PlaceReivewContainer, GaugeBar, GaugeBarWrapper
} from "./informationstyle";
import PlaceReivew from "../../../components/PlaceReview/placeReview";
import { useNavigate, useParams } from 'react-router-dom';

export default function Information() {
    const { placename } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentPlace, setCurrentPlace] = useState({}); // 장소 정보를 저장할 상태
    const [placeImage, setPlaceImage] = useState(""); // 장소 이미지를 저장할 상태
    const [filteredReviews, setFilteredReviews] = useState([]); // 리뷰 리스트를 저장할 상태
    const [isGoogleMapsScriptLoaded, setIsGoogleMapsScriptLoaded] = useState(false);

    const navigate = useNavigate();

    const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0'; // 본인의 API 키로 교체하세요

    // Google Maps API 스크립트 로드
    const loadGoogleMapsScript = () => {
        return new Promise((resolve) => {
            if (window.google && window.google.maps && window.google.maps.places) {
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.onload = () => {
                    resolve();
                };
                document.body.appendChild(script);
            }
        });
    };

    useEffect(() => {
        loadGoogleMapsScript().then(() => {
            setIsGoogleMapsScriptLoaded(true);
        });
    }, []);

    // 장소 사진 및 상세 정보 가져오기
    useEffect(() => {
        if (isGoogleMapsScriptLoaded) {
            fetchPlaceDetails(placename);
        }
    }, [placename, isGoogleMapsScriptLoaded]);

    const fetchPlaceDetails = (placeName) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));

        // 1. placeId를 추출하기 위한 요청
        const request = {
            query: placeName,
            fields: ['place_id']
        };

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
                const placeId = results[0].place_id;

                // 2. placeId를 사용하여 장소 세부 정보를 가져옵니다
                const detailsRequest = {
                    placeId: placeId,
                    fields: ['name', 'photos', 'formatted_address']
                };

                service.getDetails(detailsRequest, (placeDetails, detailsStatus) => {
                    if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                        // 사진 URL 설정
                        if (placeDetails.photos && placeDetails.photos.length > 0) {
                            const photoUrl = placeDetails.photos[0].getUrl({ maxWidth: 400 });
                            setPlaceImage(photoUrl);
                        }

                        // 장소 상세 정보 설정
                        setCurrentPlace({
                            name: placeDetails.name,
                            address: placeDetails.formatted_address || "",
                            reviews: placeDetails.reviews || []
                        });

                        // 리뷰 목록 설정 (최대 5개까지 표시)
                        setFilteredReviews(placeDetails.reviews ? placeDetails.reviews.slice(0, 5).map(review => review.text) : []);
                    } else {
                        console.error(`Could not fetch details for ${placeName}`);
                    }
                });
            } else {
                console.error(`Could not fetch place ID for ${placeName}`);
            }
        });
    };

    // 리뷰 페이지네이션을 위한 설정
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

    const handleGoRouteRec = () => {
        navigate('/routeRec', { state: { placename: currentPlace.name } });
    };

    return (
        <>
            <Reset />
            <div style={{ height: '55px' }}></div>
            <TopBarComponent />
            <Wrapper>
                <PlaceName>{placename}</PlaceName>
                <Container>
                    <ConsentContainer>
                        {placeImage ? (
                            <PlaceImg src={placeImage} alt={placename} />
                        ) : (
                            <p>Loading image...</p>
                        )}
                        <RightWrapper>
                            <DetailInfoWrapper>
                                <DetailInfoTitle>{currentPlace.name}</DetailInfoTitle>
                                <DetailInfo>{currentPlace.address}</DetailInfo>
                            </DetailInfoWrapper>
                            <ReviewContainer>
                                <ReviewTitle>리뷰</ReviewTitle>
                                <PlaceReivewContainer>
                                    <PlaceReviews>
                                        {visibleReviews.map((review, index) => (
                                            <PlaceReivew key={index} review={review} />
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
                    <RecomendationBtn onClick={handleGoRouteRec}>루트 추천</RecomendationBtn>
                </BtnContainer>
            </Wrapper>
        </>
    );
}
