import {
    BodyContainer,
    LeftWrapper, MapContainer, PlaceName, Places,
    PlacesContainer,
    PlacesTitle, PlacesTitleWrapper,
    PlacesWriter, PlaceWrapper, RefreshBtn, RefreshBtnWrapper, RightWrapper, ContextWrapper,
    GoBtn,
    Title
} from './routeRecomendationstyle';
import { Reset } from 'styled-reset';
import TopBarComponent from '../../../../components/TopBar/TopBar';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import MapComponent from './MapComponent';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie"; // Import the MapComponent

export default function RouteRecomendation() {
    const [recommendations, setRecommendations] = useState([]); // 여러 추천 경로를 저장하는 배열
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 초기화
    const { placename } = location.state || {};


    // User 닉네임 가져옴
    const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기
    const [nicknames, setNicknames] = useState([]);
    const [username, setUsername] = useState('');

    // 데이터 가져오기
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/addresses/${placename}`);
            const postData = response.data;

            console.log('Fetched data:', postData); // 가져온 데이터 로그

            // postData가 추천 객체들의 배열이라고 가정
            const processedRecommendations = postData.map(post => {
                const cleanedAddresses = post.addresses.map(address => {
                    const cleanedAddress = address.address.replace(/[\[\]"]/g, '').trim();
                    return {
                        ...address,
                        address: cleanedAddress
                    };
                });

                return {
                    boardID: post.boardID, // 게시물 ID 추가
                    title: post.addressTitle,
                    image: post.image,
                    addresses: cleanedAddresses
                };
            });

            console.log('Processed recommendations:', processedRecommendations); // 처리된 추천 데이터 로그
            setRecommendations(processedRecommendations);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response && error.response.status === 404) {
                // '추천되는 게시물 없음' 처리
                setRecommendations([]);
            }
        }
    };

    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/nicknames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNicknames(response.data);
                // console.log('nicknames:',response.data);

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                // console.log("userPayload:", userPayload);
                const extractedUsername = userPayload.nickname;
                setUsername(extractedUsername);
                // console.log("extractedUsername", extractedUsername);
            } catch (error) {
                console.error('Failed to fetch nicknames', error);
            }
        };

        fetchNicknames();
    }, [token]);


    useEffect(() => {
        fetchData(); // 컴포넌트 마운트 시 데이터 가져오기
    }, [placename]);

    // 게시물 상세 페이지로 이동하는 함수
    const handleGoToPost = (boardID) => {
        navigate(`/board/${boardID}`);
        console.log(boardID)
    };

    return (
        <>
            <Reset />
            <div style={{ height: '55px' }}></div>
            <TopBarComponent />
            <BodyContainer>
                <Title>리뷰의 추천 루트를 제공할게요 <p>{placename}</p> </Title>
                <RefreshBtnWrapper>
                    <RefreshBtn onClick={fetchData}> {/* 새로고침 버튼 */}
                        <p>추천 새로고침</p>
                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_484_188)">
                                <path d="M7 18.45C4.98 18.2 3.31 17.32 1.99 15.81C0.66 14.3 0 12.53 0 10.5C0 9.4 0.22 8.35 0.65 7.34C1.08 6.33 1.7 5.45 2.5 4.7L3.93 6.13C3.3 6.7 2.82 7.36 2.49 8.11C2.16 8.86 2 9.66 2 10.51C2 11.98 2.47 13.27 3.4 14.4C4.33 15.53 5.53 16.21 7 16.46V18.46V18.45ZM9 18.45V16.45C10.45 16.18 11.65 15.49 12.59 14.37C13.53 13.25 14 11.96 14 10.49C14 8.82 13.42 7.41 12.25 6.24C11.08 5.07 9.67 4.49 8 4.49H7.92L9.02 5.59L7.62 6.99L4.12 3.49L7.63 0L9.03 1.4L7.93 2.5H8.01C10.24 2.5 12.14 3.28 13.69 4.83C15.24 6.38 16.02 8.27 16.02 10.51C16.02 12.53 15.36 14.29 14.03 15.8C12.7 17.31 11.03 18.2 9.02 18.46L9 18.45Z" fill="#5F6368"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_484_188">
                                    <rect width="16" height="18.45" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </RefreshBtn>
                </RefreshBtnWrapper>

                {recommendations.map((recommendation, index) => (
                    <PlacesContainer key={index}> {/* 각 추천 루트에 대한 고유한 PlacesContainer */}
                        <LeftWrapper>
                            <PlacesTitleWrapper>
                                <PlacesTitle>{recommendation.title}</PlacesTitle>
                                <PlacesWriter>by {nicknames}</PlacesWriter>
                                <GoBtn onClick={() => handleGoToPost(recommendation.boardID)}>루트 만들기</GoBtn> {/* 바로가기 버튼에 클릭 핸들러 추가 */}
                            </PlacesTitleWrapper>
                            <PlaceWrapper>
                                {recommendation.addresses.map((place, index) => (
                                    <React.Fragment key={place.address}>
                                        {index > 0 && (
                                            <p>
                                                <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15 9L0 17.6603V0.339745L15 9Z" fill="#5F5F5F" />
                                                </svg>
                                            </p>
                                        )}
                                        <ContextWrapper>
                                            <Places src={recommendation.image}></Places>
                                            <PlaceName>{place.address}</PlaceName>
                                        </ContextWrapper>
                                    </React.Fragment>
                                ))}
                            </PlaceWrapper>
                        </LeftWrapper>
                        <RightWrapper>
                            <MapContainer>
                                <MapComponent addresses={recommendation.addresses}/> {/* 이 추천의 주소만 전달 */}
                            </MapContainer>
                        </RightWrapper>
                    </PlacesContainer>
                ))}
            </BodyContainer>
        </>
    );
}
