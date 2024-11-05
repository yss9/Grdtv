import { Reset } from 'styled-reset';
import React, { useEffect, useState } from 'react';
import {
    Age, Container, Detail, Gender,
    Mbti, Name, Profile, RecentContainer,
    Subtitle, Subtitle2, SubtitleContainer,  User, Wrapper,
    SubtitleContainer2, Left3, RightArrow, ProfileWrapper,
} from "./similarityStlye";
import TopBarComponent from "../../../components/TopBar/TopBar";
import Scroll from './scroll/index';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const getAuthToken = () => {
    return Cookies.get('jwt');
};

export default function RecSimilarityPage() {
    const [routes, setRoutes] = useState([]);

    const fetchRoutes = async () => {
        try {
            const token = getAuthToken();
            if (!token) throw new Error('Token not found. Please log in.');

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id; // ID 추출

            const response = await axios.get(`http://localhost:8080/api/get-routes?userId=${userId}`);
            setRoutes(response.data); // 받은 데이터 상태에 저장
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    useEffect(() => {
        fetchRoutes(); // 컴포넌트가 마운트될 때 루트 정보 가져오기
    }, []);

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
                    <Scroll />
                    <SubtitleContainer2>
                        <Subtitle>내가 만난 여행 루트</Subtitle>
                        <Subtitle2>
                            <p>그동안 만난 운명 여행 루트를 다시 볼 수 있어요.</p>
                        </Subtitle2>
                    </SubtitleContainer2>
                    {routes.map((route) => (
                        <RecentContainer key={route.id}>
                            <Left3>
                                <ProfileWrapper>
                                    <Profile></Profile>
                                    <User>
                                        <Name>{`${route.age}세, ${route.gender} - ${route.mbti}`}</Name>
                                        <Detail>
                                            <Gender>{route.gender}</Gender>ᆞ
                                            <Age>{route.age}세</Age>ᆞ
                                            <Mbti>{route.mbti}</Mbti>
                                        </Detail>
                                    </User>
                                </ProfileWrapper>
                                <RightArrow></RightArrow>
                            </Left3>
                            <div>
                                {route.travelDestinations.map((destination, index) => (
                                    <p key={index}>{destination}</p>
                                ))}
                            </div>
                        </RecentContainer>
                    ))}
                </Wrapper>
            </Container>
        </>
    );
}
