import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Reset } from 'styled-reset';
import React from 'react';
import {
    Explain, Horizonalline, Mbti,
    MbtiContainer, MbtiSubTitle, MbtiTitle, MbtiTitleContainer,
    WriteMbtiBtn, WriteMbtiBtnWrapper, Container, MbtiTitleWrapper,Wrapper
} from "./mbtistyle";
import TopBarComponent from "../../../components/TopBar/TopBar";
import {
    Place,
    PlaceContainer,
    PlaceName1,
    PlaceWrapper,
    RefreshBtn,
    SubTitle,
    SubTitleWrapper
} from "../Personal/personalstyle";

// Google Maps Places API 키 추가
const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0'; // 본인의 Google Maps API 키로 교체

// PlaceData 배열에서 이미지 URL을 Google Maps API에서 동적으로 불러오도록 수정
const PlaceData = [
    { placename: '오사카' },
    { placename: '파리' },
    { placename: '호주' },
    { placename: '도초지' },
    { placename: '파리 에펠탑' },
    { placename: '짜뚜짝 시장' },
    { placename: '모레인 호수' },
    { placename: '빠통 비치' },
    { placename: '루이스 호수' },
    { placename: '알프스 산맥' }
];

export default function RecMbtiPage() {
    const navigate = useNavigate();
    const [displayedPlaces, setDisplayedPlaces] = useState([]);
    const [placeImages, setPlaceImages] = useState({});

    useEffect(() => {
        refreshPlaces();
        loadGoogleMapsScript();
    }, []);

    const loadGoogleMapsScript = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        document.body.appendChild(script);
    };

    const refreshPlaces = () => {
        const shuffled = [...PlaceData].sort(() => 0.5 - Math.random());
        setDisplayedPlaces(shuffled.slice(0, 3));
    };

    const fetchPlacePhoto = (placeName) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            query: placeName,
            fields: ['place_id', 'photos']
        };

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
                const place = results[0];
                if (place.photos && place.photos.length > 0) {
                    const photoUrl = place.photos[0].getUrl({ maxWidth: 400 });
                    setPlaceImages(prevState => ({
                        ...prevState,
                        [placeName]: photoUrl
                    }));
                }
            } else {
                console.error(`Could not fetch place photo for ${placeName}`);
            }
        });
    };

    useEffect(() => {
        displayedPlaces.forEach((place) => {
            if (!placeImages[place.placename]) {
                fetchPlacePhoto(place.placename);
            }
        });
    }, [displayedPlaces]);

    const handleGoInformation = (placename) => {
        navigate(`/recomendation/information/${placename}`);
    };

    return (
        <>
            <Reset />
            <div style={{ height: '55px' }}></div>
            <TopBarComponent />
            <Wrapper>
                <Container>
                    <MbtiTitleContainer>
                        <MbtiTitleWrapper>
                            <MbtiTitle>MBTI 기반 추천</MbtiTitle>
                            <MbtiSubTitle>
                                <p>나와 비슷한 성격의 소유자들은 어떤 여행지를 선호하고 있을까요?</p>
                                <p>나의 MBTI와 나와 비슷한 성향의 사용자 데이터를 통해 맞춤형 여행 정보를 제공합니다. </p>
                            </MbtiSubTitle>
                            <WriteMbtiBtnWrapper>
                                <WriteMbtiBtn>
                                    <p>MBTI를 다시 작성해야 할까요?</p>
                                    <svg width="12" height="18" viewBox="0 0 12 18" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L10 9L1 17" stroke="white" stroke-width="2"/>
                                    </svg>
                                </WriteMbtiBtn>
                            </WriteMbtiBtnWrapper>
                        </MbtiTitleWrapper>
                        <Horizonalline></Horizonalline>
                        <MbtiContainer>
                            <Mbti>ISFP</Mbti>
                            <Explain>가 선호하는 여행지를 알려드릴게요.</Explain>
                        </MbtiContainer>
                        <SubTitleWrapper>
                            <SubTitle></SubTitle>
                            <RefreshBtn onClick={refreshPlaces}>
                                <p>추천 새로고침</p>
                                <svg width="16" height="19" viewBox="0 0 16 19" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_484_188)">
                                        <path
                                            d="M7 18.45C4.98 18.2 3.31 17.32 1.99 15.81C0.66 14.3 0 12.53 0 10.5C0 9.4 0.22 8.35 0.65 7.34C1.08 6.33 1.7 5.45 2.5 4.7L3.93 6.13C3.3 6.7 2.82 7.36 2.49 8.11C2.16 8.86 2 9.66 2 10.51C2 11.98 2.47 13.27 3.4 14.4C4.33 15.53 5.53 16.21 7 16.46V18.46V18.45ZM9 18.45V16.45C10.45 16.18 11.65 15.49 12.59 14.37C13.53 13.25 14 11.96 14 10.49C14 8.82 13.42 7.41 12.25 6.24C11.08 5.07 9.67 4.49 8 4.49H7.92L9.02 5.59L7.62 6.99L4.12 3.49L7.63 0L9.03 1.4L7.93 2.5H8.01C10.24 2.5 12.14 3.28 13.69 4.83C15.24 6.38 16.02 8.27 16.02 10.51C16.02 12.53 15.36 14.29 14.03 15.8C12.7 17.31 11.03 18.2 9.02 18.46L9 18.45Z"
                                            fill="#5F6368"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_484_188">
                                            <rect width="16" height="18.45" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </RefreshBtn>
                        </SubTitleWrapper>
                        <PlaceContainer>
                            {displayedPlaces.map(place => (
                                <PlaceWrapper key={place.placename}
                                              onClick={() => handleGoInformation(place.placename)}>
                                    {placeImages[place.placename] ? (
                                        <Place src={placeImages[place.placename]} alt={place.placename}/>
                                    ) : (
                                        <p>Loading image...</p>
                                    )}
                                    <PlaceName1>{place.placename}</PlaceName1>
                                </PlaceWrapper>
                            ))}
                        </PlaceContainer>
                    </MbtiTitleContainer>
                </Container>
            </Wrapper>
        </>
    );
}
