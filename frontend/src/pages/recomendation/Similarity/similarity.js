import { Reset } from 'styled-reset';
import React, { useEffect, useState } from 'react';
import {
    Age, Body, Container, Detail, Gender,
    Left, Mbti, Name, Profile, RecentContainer,
    RecomContainer, RouteName, SaveBtn, Subtitle, Routes,
    Subtitle2, SubtitleContainer, Top, User, Wrapper, Map,
    Left2, Place, SubtitleContainer2, PlaceName, PlaceWrapper,
    Triangle, Left3, Country, RightArrow, ProfileWrapper
} from "./similarityStlye";
import TopBarComponent from "../../../components/TopBar/TopBar";

const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0';

export default function RecSimilarityPage() {
    const [placeImages, setPlaceImages] = useState({});
    const [isGoogleMapsScriptLoaded, setIsGoogleMapsScriptLoaded] = useState(false);

    const places = [
        { name: "티엔미미" },
        { name: "비아톨레도" },
        { name: "하이디라오" },
        { name: "여의도" },
        { name: "동성로" },
        { name: "영남대학교" },
        { name: "경대병원" },
    ];

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
        if (isGoogleMapsScriptLoaded) {
            // Google Maps 스크립트가 로드되었을 때만 장소명에 대해 사진을 가져옵니다.
            places.forEach(place => {
                fetchPlacePhoto(place.name);
            });
        }
    }, [isGoogleMapsScriptLoaded]);

    return (
        <>
            <Reset />
            <div style={{ height: '55px' }}></div>
            <TopBarComponent />
            <Container>
                <Wrapper>
                    <SubtitleContainer>
                        <Subtitle>운명의 여행 루트</Subtitle>
                        <Subtitle2>
                            성별, 나이, MBTI가 나와 유사한 여행자의 루트를 제공해요. <br />
                            운명의 여행 루트를 발견하고 마음에 드는 루트를 저장해 보세요.
                        </Subtitle2>
                    </SubtitleContainer>
                    <RecomContainer>
                        <Top>
                            <Left>
                                <Profile></Profile>
                                <User>
                                    <Name>여행꽁쥐 님</Name>
                                    <Detail>
                                        <Gender>여</Gender>ᆞ
                                        <Age>23 세</Age>ᆞ
                                        <Mbti>ENTP</Mbti>
                                    </Detail>
                                </User>
                            </Left>
                            <SaveBtn>저장하기</SaveBtn>
                        </Top>
                        <Body>
                            <Left2>
                                <RouteName>가성비 관광루트</RouteName>
                                <Routes>
                                    {places.map((place, index) => (
                                        <>
                                            <PlaceWrapper key={index}>
                                                <Place src={placeImages[place.name] || ''} alt={place.name} />
                                                <PlaceName>{place.name}</PlaceName>
                                            </PlaceWrapper>
                                            <Triangle />
                                        </>
                                    ))}
                                </Routes>
                            </Left2>
                            <Map></Map>
                        </Body>
                    </RecomContainer>
                    <SubtitleContainer2>
                        <Subtitle>내가 만난 여행 루트</Subtitle>
                        <Subtitle2>
                            <p>그동안 만난 운명 여행 루트를 다시 볼 수 있어요.</p>
                        </Subtitle2>
                    </SubtitleContainer2>
                    <RecentContainer>
                        <Left3>
                            <ProfileWrapper>
                                <Profile></Profile>
                                <User>
                                    <Name><p>여행꽁쥐 님의</p> 가성비 관광 루트</Name>
                                    <Detail>
                                        <Gender>여</Gender>ᆞ
                                        <Age>23 세</Age>ᆞ
                                        <Mbti>ENTP</Mbti>
                                    </Detail>
                                </User>
                            </ProfileWrapper>
                            <Country>나라</Country>
                        </Left3>
                        <RightArrow>
                            <svg width="13" height="30" viewBox="0 0 16 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 2L14 15L2 28" stroke="#020202" stroke-width="4" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </RightArrow>
                    </RecentContainer>
                    <RecentContainer></RecentContainer>
                    <RecentContainer></RecentContainer>
                </Wrapper>
            </Container>
        </>
    );
}
