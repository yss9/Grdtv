/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import { Reset } from 'styled-reset';
import {
    StyledCarousel,
    StyledCard,
    StyledCardContainer,
    StyledNavRight,
    StyledApp,
    StyledNavLeft
} from './scrollPageStyle';
import Cookies from "js-cookie";
import {
    Age, Body, Detail, Gender, Left, Left2, Mapp,
    Mbti, Name, Place, PlaceName, PlaceWrapper,
    Profile, RouteName, Routes, SaveBtn, Top, Triangle, User
} from "../similarityStlye";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const MAX_VISIBILITY = 3;
const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0';

const getAuthToken = () => {
    return Cookies.get('jwt');
};
const Card = ({  content }) => (
    <StyledCard>
        <div>{content}</div>
    </StyledCard>
);

const Carousel = ({ children, active, setActive }) => {
    const count = children.length;

    const handlePrev = () => {
        setActive(active === 1 ? count : active - 1);
    };

    const handleNext = () => {
        setActive(active === count ? 1 : active + 1);
    };

    return (
        <>
            <Reset />
            <StyledNavLeft onClick={handlePrev}>
                <TiChevronLeftOutline />
            </StyledNavLeft>
            <StyledCarousel>
                {children.map((child, i) => (
                    <StyledCardContainer
                        key={i}
                        style={{
                            '--active': i + 1 === active ? 1 : 0,
                            '--offset': (active - (i + 1)) / 3,
                            '--direction': Math.sign(active - (i + 1)),
                            '--abs-offset': Math.abs(active - (i + 1)) / 3,
                            'pointer-events': active === i + 1 ? 'auto' : 'none',
                            opacity: Math.abs(active - (i + 1)) >= MAX_VISIBILITY ? '0' : '1',
                            display: Math.abs(active - (i + 1)) > MAX_VISIBILITY ? 'none' : 'block'
                        }}
                    >
                        {child}
                    </StyledCardContainer>
                ))}
            </StyledCarousel>
            <StyledNavRight onClick={handleNext}>
                <TiChevronRightOutline />
            </StyledNavRight>
        </>
    );
};

const Scroll = () => {
    const [active, setActive] = useState(1);
    const [placeImages, setPlaceImages] = useState({});
    const [userInfo, setUserInfo] = useState({ age: '', gender: '', mbti: '' });
    const [userName, setUserName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
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
            fetchRecommendations();
        });
    }, []);

    const fetchRecommendations = async () => {
        try {
            const token = getAuthToken();
            if (!token) throw new Error('Token not found. Please log in.');

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            // 사용자 정보 가져오기
            const userResponse = await axios.get(`http://localhost:8080/api/users/my-info?userId=${userId}`);
            const { dateOfBirth, gender, mbti } = userResponse.data;

            setUserInfo({ age: dateOfBirth, gender, mbti });

            // 추천 데이터 가져오기
            const recommendationResponse = await axios.post('/api/info-recommend', {
                age: dateOfBirth,
                gender: gender,
                mbti: mbti,
            });
            console.log("Recommendation Response:", recommendationResponse.data); // Log the response

            setRecommendations(recommendationResponse.data);

            // 추천 사용자의 이름 가져오기
            if (recommendationResponse.data.length > 0) {
                const recommendation = recommendationResponse.data[0];
                setUserName(getNickname(recommendation.age, recommendation.gender, recommendation.mbti));
            }

        } catch (error) {
            console.error("Error during the request:", error);
            alert('정보를 가져오는 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        if (isGoogleMapsScriptLoaded && recommendations.length > 0) {
            // 추천 장소의 사진 가져오기
            recommendations.forEach(recommendation => {
                recommendation.travelDestinations.forEach(place => {
                    fetchPlacePhoto(place);
                });
            });
        }
    }, [isGoogleMapsScriptLoaded, recommendations]);

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
    const saveRoute = async (userInfoId) => {
        try {
            const token = getAuthToken(); // 토큰 가져오기
            if (!token) throw new Error('Token not found. Please log in.'); // 토큰 확인

            const decodedToken = jwtDecode(token); // 토큰 디코딩
            const userId = decodedToken.id; // id 필드를 사용하여 사용자 ID 추출

            const response = await axios.post('http://localhost:8080/api/save-route', {
                userId, // 사용자 ID
                userInfoId, // 추천 배열의 ID
            });

            console.log("Route saved successfully:", response.data);
            alert('Route saved successfully!'); // 성공 메시지
            window.location.reload();

        } catch (error) {
            console.error("Error saving route:", error);
            alert('Error saving route. Please try again.'); // 오류 메시지
        }
    };

    return (
        <StyledApp>
            <Carousel active={active} setActive={setActive}>
                {recommendations.slice(0, 10).map((recommendation, index) => (
                    <Card
                        key={index}
                        content={
                            <>
                                <Top>
                                    <Left>
                                        <Profile></Profile>
                                        <User>
                                            <Name>{userName}</Name>
                                            <Detail>
                                                <Gender>{recommendation.gender}</Gender>ᆞ
                                                <Age>{recommendation.age}세</Age>ᆞ
                                                <Mbti>{recommendation.mbti}</Mbti>
                                            </Detail>
                                        </User>
                                    </Left>
                                    <SaveBtn onClick={() => saveRoute(recommendation.id)}>
                                        저장하기
                                    </SaveBtn>
                                </Top>
                                <Body>
                                    <Left2>
                                        <RouteName>가성비 관광루트</RouteName>
                                        <Routes>
                                            {recommendation.travelDestinations.map((place, index) => (
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
                                    <Mapp></Mapp>
                                </Body>
                            </>
                        }
                    />
                ))}
            </Carousel>
        </StyledApp>
    );
};
export default Scroll;
