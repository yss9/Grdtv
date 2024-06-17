/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import TopBarComponent from "../../../components/TopBar/TopBar";
import '../../../App.css';
import {useNavigate} from "react-router-dom";

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
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
    margin-top: 20px;  /* Adjust this to position buttons correctly */
    position: absolute;
    bottom: 300px;  /* Fixes the button position to the bottom */
`;

const NavButton = styled.button`
    padding: 10px 40px;
    border: none;
    background-color: black;
    margin-left: 350px;
    margin-right: 350px;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;


const keywordsList = [
    "자연 경관", "트레킹", "혼자 여행", "로컬 문화", "전통 음식",
    "숨겨진 명소", "평온함", "사진 촬영", "해변", "숲",
    "캠핑", "공원", "조용한 마을", "호수", "하이킹",
    "명상", "휴식", "친환경 여행", "별 관측", "체험 활동",
    "역사 탐방", "온천", "도시 탐험", "문화 체험", "미식 여행",
    "예술 탐방", "쇼핑", "야경", "음악 축제", "와인 투어",
    "사파리", "자전거 여행", "크루즈 여행", "윈드서핑", "스쿠버다이빙",
    "스키", "스노보드", "패러글라이딩", "동굴 탐험", "볼링",
    "클라이밍", "산책", "유람선", "박물관", "갤러리",
    "테마파크", "미술관", "시장", "테라피", "해양 스포츠",
    "낚시", "승마", "야외 요가", "트레일 러닝", "오프로드",
    "집라인", "카약", "스노클링", "세일링", "플라이 낚시",
    "골프", "테니스", "스파", "아로마테라피", "요리 교실",
    "도예 교실", "사진 워크숍", "작문 교실", "명상 교실", "음악 교실",
    "댄스 교실", "역사 투어", "건축 투어", "영화 촬영지", "전통 공예",
    "로컬 축제", "자연 보호 구역", "야생 동물 관찰", "천문 관측", "산악 자전거",
    "불꽃 놀이", "박물관"
];

const KeywordSelection = () => {
    const navigate = useNavigate();
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [page, setPage] = useState(0);

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

    const completeSelection = () => {
        alert('선택이 완료되었습니다.');
        navigate('/recomendation/personal',{ state: { triggerButtonClick: true } });
    };

    const displayedKeywords = keywordsList.slice(page * 20, (page + 1) * 20);

    return (
        <Container>
            <Background />
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
                    <NavButton onClick={completeSelection}>완료</NavButton>
                )}
            </ButtonContainer>
        </Container>
    );
};
export default KeywordSelection;