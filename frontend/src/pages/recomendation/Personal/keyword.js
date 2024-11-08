/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import TopBarComponent from "../../../components/TopBar/TopBar";
import '../../../App.css';
import {useNavigate} from "react-router-dom";
import { Reset } from 'styled-reset';
import axios from 'axios';


const Background = styled.div`
    margin-top: 13px;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 60%; /* 배경 이미지의 투명도 설정 */
    background:
            linear-gradient(
                    rgba(255, 255, 255, 1),
                    rgba(0, 0, 0, 0),
                    rgba(0, 0, 0, 0.2)
            ), url('/keywordBackground.png') no-repeat center center;
    background-size: cover;
`;

const Container = styled.div`
    width: 1500px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 98vh;
`;

const Header = styled.h1`
    font-size: 24px;
    font-family: Title;
    margin-top: 50px;
    color: rgba(131, 135, 255, 1);
`;

const Ptag = styled.p`
    padding-bottom: 20px;
    font-size: 15px;
    font-family: Regular;
    color: #333;
`;

const KeywordsContainer = styled.div`
    width: 1000px;
    height: 300px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-family: Regular;
    gap: 10px;
    margin-top: 20px;
`;

const KeywordButton = styled.button`
    padding: 16px 30px;
    height: 60px;
    margin: 8px;
    border: 1px solid rgba(131, 135, 255, 1);
    border-radius: 30px;
    font-family: SubTitle;
    font-size: 20px;
    background-color: ${props => (props.selected ? '#d0d0ff' : '#fff')};
    color: #333;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 70px;  /* Adjust this to position buttons correctly */
    //background-color: #61dafb;
`;

const NavButton = styled.button`
    width: 250px;
    height: 60px;
    border: none;
    background-color: black;
    margin-left: 320px;
    margin-right: 320px;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
const Wrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


const keywordsList = [
    "해안", "수영", "조각", "사원", "문화", "역사", "건축", "산", "등산", "호수",
    "폭포", "사막", "박물관", "미술관", "자연", "경치", "도시", "해변", "섬",
    "온천", "다이빙", "트레킹", "동물", "사파리", "야경", "시장", "열기구",
    "불교", "기차", "성당", "성", "원숭이", "온천욕", "탐험", "보트", "운하",
    "와인", "카누", "바다", "스노클링", "다문화", "협곡", "지열", "동굴",
    "사찰", "모스크", "탑", "성벽", "화산", "빙하", "설산", "캠핑", "하이킹",
    "스포츠", "레크리에이션", "축제", "음식", "전통", "공연", "예술", "유적",
    "랜드마크", "식물원", "미로", "정원", "유네스코", "해양", "아치",
    "호랑이", "철새", "낙타", "열대우림", "바위", "서핑", "산호", "빙벽",
    "하늘", "설경", "강", "대성당", "불상", "기념물", "전망대", "국립공원",
    "야생동물", "보트 투어", "역사적인 장소", "하이킹 코스", "전통 마을",
    "고대 유적", "야외 활동", "휴양지", "역사적 건축", "철도 여행"
];



const KeywordSelection = () => {
    const navigate = useNavigate();
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [page, setPage] = useState(0);
    const [results, setResults] = useState([]);
    const [navigated, setNavigated] = useState(false); // 새로운 상태 추가

    const toggleKeyword = (keyword) => {
        setSelectedKeywords(prev =>
            prev.includes(keyword)
                ? prev.filter(kw => kw !== keyword)
                : [...prev, keyword]
        );
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    const completeSelection = async () => {
        if (navigated) return;
        setNavigated(true);

        try {
            const response = await axios.post('/api/search', {
                keywords: selectedKeywords
            });

            const randomKeywords = selectedKeywords
                .sort(() => Math.random() - Math.random())
                .slice(0, 3)
                .map(keyword => ({ keyword: `#${keyword}` }));

            navigate('/recomendation/personal', {
                state: {
                    triggerButtonClick: true,
                    results: response.data,
                    KeywordData: randomKeywords,
                }
            });
        } catch (error) {
            console.error("검색 중 오류:", error);
            setNavigated(false);
        }
    };

    const displayedKeywords = keywordsList.slice(page * 20, (page + 1) * 20);

    return (
        <>
            <Reset />
            <Wrapper>
                <Background />
                <Container>
                    <div style={{ height: '55px' }}></div>
                    <TopBarComponent />
                    <Header>여행 키워드를 선정해 주세요.</Header>
                    <Ptag>자신의 취향에 맞는 키워드를 고른 후, 맞춤형 추천을 제공해 줄게요.</Ptag>
                    <KeywordsContainer>
                        {displayedKeywords.map((keyword, index) => (
                            <KeywordButton
                                key={index}
                                selected={selectedKeywords.includes(keyword)}
                                onClick={() => toggleKeyword(keyword)}
                            >
                                {keyword}
                            </KeywordButton>
                        ))}
                    </KeywordsContainer>
                    <ButtonContainer>
                        {page > 0 && <NavButton onClick={prevPage}>이전</NavButton>}
                        {page < Math.floor(keywordsList.length / 20) && (
                            <NavButton onClick={nextPage}>다음</NavButton>
                        )}
                        {page === Math.floor(keywordsList.length / 20) && (
                            <NavButton onClick={completeSelection} disabled={navigated}>완료</NavButton>
                        )}
                    </ButtonContainer>
                </Container>
            </Wrapper>
        </>
    );
};
export default KeywordSelection;