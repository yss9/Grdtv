import { Reset } from 'styled-reset';
import React, {useEffect, useState} from 'react';
import TopBarComponent from "../../../components/TopBar/TopBar";
import ApelTower from "../../../public/Img/apeltower.png"
import Kyoto from "../../../public/Img/kyoto.png"
import ThaiMarket from "../../../public/Img/thaimarket.png"
import Apls from "../../../public/Img/alps.png"
import Louis from "../../../public/Img/louis.png"
import Bbatong from "../../../public/Img/bbatong.png"
import Morein from "../../../public/Img/morein.png"
import {
    HashTag,
    HashTagContaienr,
    KeywordBtn, KeywordContainer, Place, PlaceContainer, PlaceName1, PlaceWrapper, RefreshBtn,
    SubTitle, SubTitleWrapper, Title, TitleWrapper, Wrapper,
    BestCourseContainer,
    BestCourses,
    BestWrapper, Notice, GaugeBar, GaugeBarWrapper
} from "./personalstyle";

import BestCourse from "../../../components/BestCourse/BestCourse";
import {useLocation, useNavigate} from "react-router-dom";
import Osaka from "../../../public/Img/osaka.png";
import Paris from "../../../public/Img/paris.png";
import Sydney from "../../../public/Img/sydney.png";

const PersonalRecData=[
    { placename: '도초지', image: Kyoto},
    { placename: '에펠탑', image: ApelTower},
    { placename: '수상시장', image: ThaiMarket},
    {placename:'오사카', image: Osaka},
    {placename:'파리', image: Paris },
    {placename:'호주', image: Sydney }
];

const CourseData=[
    { placename: '모레인 호수', image: Morein },
    { placename: '빠통 비치', image: Bbatong },
    { placename: '루이스 호수', image: Louis },
    { placename: '알프스 산맥', image: Apls },
    { placename: 'Course 5', image: '' },
    { placename: 'Course 6',  image: '' },
    { placename: 'Course 7', image: '' },
    { placename: 'Course 8', image: '' },
    { placename: 'Course 9', image: ''},
    { placename: 'Course 10', image: '' },
    { placename: 'Course 11', image: '' },
    { placename: 'Course 12', image: '' },
];
const KeywordData=[
    {keyword:'#휴식'},{keyword:'#호수'},{keyword:'#전통음식'}
]
export default function MainPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewsPerPage = 4;

    const startIndex = activeIndex * reviewsPerPage;

    const visibleAgents = CourseData.slice(startIndex, startIndex + reviewsPerPage);

    const totalIndicators = Math.ceil(CourseData.length / reviewsPerPage);
    const navigate = useNavigate();

    const [displayedPlaces, setDisplayedPlaces] = useState([]);

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    const location = useLocation();

    useEffect(() => {
        if (location.state?.triggerButtonClick) {
            const button = document.getElementById('target-button-id');
            if (button) {
                button.click();
            }
        }
    }, [location.state]);

    const handleGoInformation = (placename) => {
        navigate(`/recomendation/information/${placename}`); // URL에 선택된 장소 이름을 추가하여 전달
    };

    const handleGoKeywordSelection = () =>{
        navigate('/keyword');
    }

    useEffect(() => {
        refreshPlaces();
    }, []);
    const refreshPlaces = () => {
        const shuffled = [...PersonalRecData].sort(() => 0.5 - Math.random());
        setDisplayedPlaces(shuffled.slice(0, 3));
    };

    return(
        <>
            <Reset/>
            <TopBarComponent />
            <Wrapper>
                <TitleWrapper>
                    <Title>나만의 맞춤 여행지</Title>
                </TitleWrapper>
                <SubTitleWrapper>
                    <SubTitle>키워드 성향에 따른 맞춤형 여행지를 추천해 드려요.</SubTitle>
                    <RefreshBtn id="target-buttion-id" onClick={refreshPlaces}>
                        <p>추천 새로고침</p>
                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_484_188)">
                                <path d="M7 18.45C4.98 18.2 3.31 17.32 1.99 15.81C0.66 14.3 0 12.53 0 10.5C0 9.4 0.22 8.35 0.65 7.34C1.08 6.33 1.7 5.45 2.5 4.7L3.93 6.13C3.3 6.7 2.82 7.36 2.49 8.11C2.16 8.86 2 9.66 2 10.51C2 11.98 2.47 13.27 3.4 14.4C4.33 15.53 5.53 16.21 7 16.46V18.46V18.45ZM9 18.45V16.45C10.45 16.18 11.65 15.49 12.59 14.37C13.53 13.25 14 11.96 14 10.49C14 8.82 13.42 7.41 12.25 6.24C11.08 5.07 9.67 4.49 8 4.49H7.92L9.02 5.59L7.62 6.99L4.12 3.49L7.63 0L9.03 1.4L7.93 2.5H8.01C10.24 2.5 12.14 3.28 13.69 4.83C15.24 6.38 16.02 8.27 16.02 10.51C16.02 12.53 15.36 14.29 14.03 15.8C12.7 17.31 11.03 18.2 9.02 18.46L9 18.45Z" fill="#5F6368"/>
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
                        <PlaceWrapper key={place.placename} onClick={() => handleGoInformation(place.placename)}>
                            <Place src={place.image}/>
                            <PlaceName1>{place.placename}</PlaceName1>
                        </PlaceWrapper>
                    ))}
                </PlaceContainer>
                <KeywordBtn onClick={handleGoKeywordSelection}>키워드 다시 선정하기</KeywordBtn>
                <BestWrapper>
                    <KeywordContainer>
                        <HashTagContaienr>
                            {KeywordData.map(place => (
                                <HashTag>{place.keyword}</HashTag>
                            ))}
                            <Notice>
                                <p>관심사와 어울리는</p>
                                <p>여행지를 가져왔어요.</p>
                            </Notice>
                        </HashTagContaienr>
                        <BestCourseContainer>
                            <BestCourses>
                                {visibleAgents.map((course, index) => (
                                    <BestCourse key={index} review={course} />
                                ))}
                            </BestCourses>
                        </BestCourseContainer>
                    </KeywordContainer>
                    <GaugeBarWrapper>
                        <GaugeBar completion={(activeIndex + 1) / totalIndicators * 100} onClick={handleGaugeClick} />
                    </GaugeBarWrapper>
                </BestWrapper>
            </Wrapper>
        </>
    )
}