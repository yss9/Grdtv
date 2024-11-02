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
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Cookies from "js-cookie";
const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0'; // 본인의 API 키로 교체하세요

const getAuthToken = () => {
    return Cookies.get('jwt');
};

export default function RecSimilarityPage() {
    const [recommendations, setRecommendations] = useState([]);
    const [placeImages, setPlaceImages] = useState({});
    const [userInfo, setUserInfo] = useState({ age: '', gender: '', mbti: '' });
    const [userName, setUserName] = useState('');
    const [isGoogleMapsScriptLoaded, setIsGoogleMapsScriptLoaded] = useState(false);

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

    const fetchRecommendations = async () => {
        try {
            const token = getAuthToken();
            if (!token) throw new Error('Token not found. Please log in.');

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            // 유저 정보 가져오기
            const userResponse = await axios.get(`http://localhost:8080/api/users/my-info?userId=${userId}`);
            const { dateOfBirth, gender, mbti } = userResponse.data;

            setUserInfo({ age: dateOfBirth, gender, mbti });

            // 추천 데이터 가져오기
            const recommendationResponse = await axios.post('/api/info-recommend', {
                age: dateOfBirth,
                gender: gender,
                mbti: mbti,
            });

            setRecommendations(recommendationResponse.data);

            const recommendation = recommendationResponse.data[0];
            setUserName(getNickname(recommendation.age, recommendation.gender, recommendation.mbti));

        } catch (error) {
            console.error("Error during the request:", error);
            alert('정보를 가져오는 중 오류가 발생했습니다.');
        }
    };

    const getNickname = (dateOfBirth, gender, mbti) => {
        const birthYear = parseInt(dateOfBirth.substring(0, 4));
        const isE = mbti.charAt(0) === 'E';
        const isF = gender === 'F';

        if (birthYear >= 1984 && birthYear <= 1993) {
            // 1984-1993년생
            if (isE) {
                return isF ? "화려한 매력의 사교 여왕" : "멋진 분위기 황제";
            } else {
                return isF ? "은은한 매력의 감성 여신" : "든든한 따뜻한 왕자";
            }
        } else if (birthYear >= 1994 && birthYear <= 2004) {
            // 1994-2004년생
            if (isE) {
                return isF ? "톡톡 분위기 메이커 매력 공주" : "활력 에너지 대마왕";
            } else {
                return isF ? "매혹적인 신비로운 요정" : "로맨틱 감성 왕자";
            }
        }
        return "익명의 여행자"; // 기본값
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
        loadGoogleMapsScript().then(() => {
            setIsGoogleMapsScriptLoaded(true);
        });
        fetchRecommendations();
    }, []);

    useEffect(() => {
        if (isGoogleMapsScriptLoaded && recommendations.length > 0) {
            // 추천 장소의 사진 가져오기
            recommendations[0].travelDestinations.forEach(place => {
                fetchPlacePhoto(place);
            });
        }
    }, [isGoogleMapsScriptLoaded, recommendations]);

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
                                    <Name>{userName}</Name>
                                    <Detail>
                                        <Gender>{recommendations[0]?.gender}</Gender>ᆞ
                                        <Age>{recommendations[0]?.age} 세</Age>ᆞ
                                        <Mbti>{recommendations[0]?.mbti}</Mbti>
                                    </Detail>
                                </User>
                            </Left>
                            <SaveBtn>저장하기</SaveBtn>
                        </Top>
                        <Body>
                            <Left2>
                                <RouteName>가성비 관광루트</RouteName>
                                <Routes>
                                    {recommendations[0]?.travelDestinations.map((place, index) => (
                                        <>
                                            <PlaceWrapper key={index}>
                                                <Place src={placeImages[place] || ''} alt={place} />
                                                <PlaceName>{place}</PlaceName>
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
                                        <Gender>{userInfo.gender}</Gender>ᆞ
                                        <Age>{userInfo.age} 세</Age>ᆞ
                                        <Mbti>{userInfo.mbti}</Mbti>
                                    </Detail>
                                </User>
                            </ProfileWrapper>
                            <Country>나라</Country>
                        </Left3>
                        <RightArrow></RightArrow>
                    </RecentContainer>
                    <RecentContainer></RecentContainer>
                    <RecentContainer></RecentContainer>
                </Wrapper>
            </Container>
        </>
    );
}
