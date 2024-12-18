import { Reset } from 'styled-reset';
import React, { useEffect, useState } from 'react';
import {
    Age, Container, Detail, Gender,
    Mbti, Name, Profile, RecentContainer,
    Subtitle, Subtitle2, SubtitleContainer, User, Wrapper,
    SubtitleContainer2, Left3, ProfileWrapper, SavedRoute, Triangle2,
} from "./similarityStlye";
import TopBarComponent from "../../../components/TopBar/TopBar";
import Scroll from './scroll/index';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cutie from '../../../images/blingbling.png';

const getAuthToken = () => {
    return Cookies.get('jwt');
};

const getRandomNickname = (nicknames) => {
    const randomIndex = Math.floor(Math.random() * nicknames.length);
    return nicknames[randomIndex];
};

const getNickname = (age, gender, mbti) => {
    if (!age || !gender || !mbti) return "익명의 여행자";

    const birthYear = parseInt(age.substring(0, 4));
    const isE = mbti.charAt(0) === 'E';
    const isF = gender === 'F';

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

export default function RecSimilarityPage() {
    const [routes, setRoutes] = useState([]);
    const [userName, setUserName] = useState('');

    const fetchRoutes = async () => {
        try {
            const token = getAuthToken();
            if (!token) throw new Error('Token not found. Please log in.');

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id; // ID 추출

            const response = await axios.get(`http://localhost:8080/api/get-routes?userId=${userId}`);
            // 루트 데이터에 닉네임 추가
            const updatedRoutes = response.data.map(route => ({
                ...route,
                nickname: getNickname(route.age, route.gender, route.mbti),
            }));
            setRoutes(updatedRoutes); // 받은 데이터 상태에 저장
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    useEffect(() => {
        fetchRoutes(); // 컴포넌트가 마운트될 때 루트 정보 가져오기
    }, []);

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

    const handleSaveRoute = (newRoute) => {
        const nickname = getNickname(newRoute.age, newRoute.gender, newRoute.mbti);
        const updatedRoute = { ...newRoute, nickname }; // 닉네임 추가
        setRoutes([...routes, updatedRoute]); // 새로운 루트 저장
    };

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
                            운명의 여행 루트를 발견하고 마음에 드는 루트를 저장해 보세요.<br/>
                            <a>*모든 닉네임은 랜덤으로 지정된 것입니다.</a>
                        </Subtitle2>
                    </SubtitleContainer>
                    <Scroll />
                    <SubtitleContainer2>
                        <Subtitle>내가 저장한 여행 루트</Subtitle>
                        <Subtitle2>
                            <p>그동안 저장한 운명 여행 루트를 다시 볼 수 있어요.</p>
                        </Subtitle2>
                    </SubtitleContainer2>
                    {routes.map((route) => (
                        <RecentContainer key={route.id}>
                            <Left3>
                                <ProfileWrapper>
                                    <Profile src={Cutie}></Profile>
                                    <User>
                                        <Name>{route.nickname}</Name> {/* 닉네임 출력 */}
                                        <Detail>
                                            <Gender>{getGenderText(route.gender)}</Gender>ᆞ
                                            <Age>{calculateAge(route.age)} 세</Age>ᆞ
                                            <Mbti>{route.mbti}</Mbti>
                                        </Detail>
                                    </User>
                                </ProfileWrapper>
                            </Left3>
                            <SavedRoute>
                                {route.travelDestinations.map((destination, index) => (
                                    <>
                                        <p key={index}>{destination}</p>
                                        {index < route.travelDestinations.length - 1 && <Triangle2 />}
                                    </>
                                ))}
                            </SavedRoute>
                        </RecentContainer>
                    ))}
                </Wrapper>
            </Container>
        </>
    );
}
