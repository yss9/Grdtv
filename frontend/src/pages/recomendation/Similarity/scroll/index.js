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
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Cutie from '../../../../images/blingbling.png'

const MAX_VISIBILITY = 3;
const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0';

const getAuthToken = () => {
    return Cookies.get('jwt');
};

const Card = ({ content }) => (
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

const generateRouteMap = (travelDestinations) => {
    const baseURL = `https://maps.googleapis.com/maps/api/staticmap?key=${GOOGLE_MAPS_API_KEY}`;
    const markers = travelDestinations
        .map((place, index) => `markers=label:${index + 1}|color:red|${place}`)
        .join('&');
    const path = travelDestinations.join('|');

    return `${baseURL}&size=600x300&${markers}&path=color:0x0000ff|weight:5|${path}`;
};

const Scroll = () => {
    const [active, setActive] = useState(1);
    const [placeImages, setPlaceImages] = useState({});
    const [userInfo, setUserInfo] = useState({ age: '', gender: '', mbti: '' });
    const [recommendations, setRecommendations] = useState([]);
    const [routeMap, setRouteMap] = useState('');
    const [nicknames, setNicknames] = useState([]);
    const [isGoogleMapsScriptLoaded, setIsGoogleMapsScriptLoaded] = useState(false);

    useEffect(() => {
        if (recommendations.length > 0) {
            const currentRoute = recommendations[active - 1].travelDestinations;
            setRouteMap(generateRouteMap(currentRoute));
        }
    }, [active, recommendations]);

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
                gender,
                mbti
            });

            const recommendationsData = recommendationResponse.data;

            // 닉네임 설정
            const generatedNicknames = recommendationsData.map(user => {
                return getNickname(user.age, user.gender, user.mbti);
            });
            setNicknames(generatedNicknames);
            setRecommendations(recommendationsData);
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



    const getNickname = (age, gender, mbti) => {
        if (!age || !gender || !mbti) return "익명의 여행자";

        const birthYear = parseInt(age.substring(0, 4));
        const isE = mbti.charAt(0) === 'E';
        const isF = gender === 'F';

        // 랜덤 닉네임 선택 함수
        const getRandomNickname = (nicknames) => {
            const randomIndex = Math.floor(Math.random() * nicknames.length);
            return nicknames[randomIndex];
        };

        if (birthYear >= 1984 && birthYear <= 1993) {
            // 1984-1993년생
            const nicknames = isF
                ? isE
                    ? [
                        "화려한 매력의 사교 여왕",
                        "반짝이는 파티의 주인공",
                        "에너지가 넘치는 여신",
                        "활발한 무대의 주인공"
                    ]
                    : [
                        "은은한 매력의 감성 여신",
                        "조용히 빛나는 내면의 여왕",
                        "평온한 분위기의 여신",
                        "고요한 바다의 여신"
                    ]
                : isE
                    ? [
                        "멋진 분위기 황제",
                        "유쾌한 리더",
                        "대담한 모험가",
                        "활력 넘치는 리더"
                    ]
                    : [
                        "든든한 따뜻한 왕자",
                        "신뢰받는 듬직한 친구",
                        "차분한 매력의 왕자",
                        "침착한 전략가"
                    ];
            return getRandomNickname(nicknames);
        } else if (birthYear >= 1994 && birthYear <= 2004) {
            // 1994-2004년생
            const nicknames = isF
                ? isE
                    ? [
                        "톡톡 분위기 메이커 매력 공주",
                        "활발한 에너지의 여왕",
                        "매혹적인 대화의 달인",
                        "웃음을 전파하는 무대의 여왕"
                    ]
                    : [
                        "매혹적인 신비로운 요정",
                        "차분하고 우아한 소녀",
                        "비밀스러운 매력을 가진 요정",
                        "고요한 달빛의 요정"
                    ]
                : isE
                    ? [
                        "활력 에너지 대마왕",
                        "모두를 웃게 하는 유머왕",
                        "에너지가 넘치는 모험가",
                        "무대를 휘어잡는 스타"
                    ]
                    : [
                        "로맨틱 감성 왕자",
                        "조용히 다가오는 매력의 신사",
                        "섬세한 감성을 가진 왕자",
                        "차분한 신비주의 왕자"
                    ];
            return getRandomNickname(nicknames);
        }

        return "익명의 여행자";
    };



    const saveRoute = async (userInfoId) => {
        try {
            const token = getAuthToken();
            if (!token) throw new Error('Token not found. Please log in.');

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const response = await axios.post('http://localhost:8080/api/save-route', {
                userId,
                userInfoId,
            });

            console.log("Route saved successfully:", response.data);
            alert('Route saved successfully!');
            window.location.reload();

        } catch (error) {
            console.error("Error saving route:", error);
            alert('Error saving route. Please try again.'); // 오류 메시지
        }
    };

    const calculateAge = (age) => {
        if (!age) return '정보 없음';
        const birthYear = parseInt(age.substring(0, 4));
        const birthMonth = parseInt(age.substring(4, 6));
        const birthDate = parseInt(age.substring(6, 8));

        const today = new Date();
        let age2 = today.getFullYear() - birthYear;
        if (today.getMonth() + 1 < birthMonth || (today.getMonth() + 1 === birthMonth && today.getDate() < birthDate)) {
            age2--;
        }

        return age2;
    };

    const getGenderText = (gender) => {
        return gender === 'F' ? '여성' : gender === 'M' ? '남성' : '정보 없음';
    };

    useEffect(() => {
        loadGoogleMapsScript().then(() => {
            fetchRecommendations();
        });
    }, []);

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
                                        <Profile src={Cutie}></Profile>
                                        <User>
                                            <Name>{nicknames[index]}</Name>
                                            <Detail>
                                                <Gender>{getGenderText(recommendation.gender)}</Gender>ᆞ
                                                <Age>{calculateAge(recommendation.age)}세</Age>ᆞ
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
                                        <RouteName>당신과 유사한 사용자의 루트</RouteName>
                                        <Routes>
                                            {recommendation.travelDestinations.map((place, index) => (
                                                <PlaceWrapper key={index}>
                                                    <Place src={placeImages[place] || ''} alt={place} />
                                                    <PlaceName>{place}</PlaceName>
                                                </PlaceWrapper>
                                            ))}
                                        </Routes>
                                    </Left2>
                                    <Mapp src={routeMap} alt="Travel Route"></Mapp>
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
