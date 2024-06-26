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
    '역사', '건축', '문화', '백사장', '불꽃놀이',
    '산', '등산', '경치', '사찰', '중요성',
    '아름다움', '공원', '사계절', '한옥', '음식',
    '해안', '놀이공원', '레포츠', '해변', '활동',
    '야경', '쇼핑', '게이트', '산책로', '번화가',
    '네온사인', '축제', '정원', '평화', '성벽',
    '요새', '산책', '조각상', '현대', '도시',
    '판다', '파노라마', '고딕', '가치', '전망',
    '바다', '와인', '극장', '로마', '공학',
    '운하', '성당', '양식', '고대', '고고학',
    '조명', '엔터테인먼트', '영화', '사인', '건축물',
    '상징', '카지노', '리조트', '조각품', '녹지',
    '전망대', '거리', '세계유산', '지구', '폭포',
    '공연', '예술', '바위', '랜드마크', '산호초',
    '다이빙', '와이너리', '동상', '탐험', '호수',
    '휴식', '레크'
];


const KeywordSelection = () => {
    const navigate = useNavigate();
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [page, setPage] = useState(0);
    const [results, setResults] = useState([]);

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
        try {
            const response = await axios.post('/api/search', {
                keywords: selectedKeywords
            });
            setResults(response.data);
            alert('선택이 완료되었습니다.');
            navigate('/recomendation/personal', { state: { triggerButtonClick: true, results: response.data } });
        } catch (error) {
            console.error("Error during search:", error);
            alert('검색 중 오류가 발생했습니다.');
        }
    };


    const displayedKeywords = keywordsList.slice(page * 20, (page + 1) * 20);

    return (
        <>
            <Reset/>
            <Wrapper>
                <Background/>
                <Container>
                    <div style={{height: '55px'}}></div>
                    <TopBarComponent/>
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
                            <NavButton onClick={completeSelection}>완료</NavButton>
                        )}
                    </ButtonContainer>
                </Container>
            </Wrapper>

        </>
    );
};
export default KeywordSelection;