/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import axios from 'axios';
import { Reset } from 'styled-reset';
import styled from 'styled-components';
import TopBarComponent from "../../../components/TopBar/TopBar";
import '../../../App.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Header = styled.h1`
    font-size: 28px;
    color: #4c4c4c;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SubHeader = styled.h2`
    font-size: 22px;
    color: #4c4c4c;
    margin-bottom: 10px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #4c4c4c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`;

const RecommendationsContainer = styled.div`
    width: 70%;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
`;

const RecommendationItem = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const UserInfoText = styled.div`
    margin-left: 10px;
`;

const TravelList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TravelItem = styled.li`
  margin-left: 20px;
  font-size: 16px;
`;

const NavigationButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #4c4c4c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const RecommendationCosine = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [mbti, setMbti] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAgeChange = (e) => setAge(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);
    const handleMbtiChange = (e) => setMbti(e.target.value);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/info-recommend', {
                age: parseInt(age),
                gender: gender,
                mbti: mbti
            });
            setRecommendations(response.data);
            setCurrentIndex(0);
        } catch (error) {
            console.error("Error during the request:", error);
            alert('요청 중 오류가 발생했습니다.');
        }
    };

    const handleNext = () => {
        if (currentIndex + 3 < recommendations.length) {
            setCurrentIndex(currentIndex + 3);
        }
    };

    const handlePrev = () => {
        if (currentIndex - 3 >= 0) {
            setCurrentIndex(currentIndex - 3);
        }
    };

    const displayedRecommendations = recommendations.slice(currentIndex, currentIndex + 3);

    return (
        <>
            <Reset/>
            <div style={{marginTop:"35px"}}></div>
            <TopBarComponent/>
            <Container>
                <Header>유사한 사용자 추천</Header>
                <InputContainer>
                    <Input
                        type="number"
                        placeholder="나이"
                        value={age}
                        onChange={handleAgeChange}
                    />
                    <Input
                        type="text"
                        placeholder="성별"
                        value={gender}
                        onChange={handleGenderChange}
                    />
                    <Input
                        type="text"
                        placeholder="MBTI"
                        value={mbti}
                        onChange={handleMbtiChange}
                    />
                    <Button onClick={handleSubmit}>추천 받기</Button>
                </InputContainer>

                {displayedRecommendations.length > 0 && (
                    <RecommendationsContainer>
                        <SubHeader>추천 결과</SubHeader>
                        {displayedRecommendations.map((user, index) => (
                            <RecommendationItem key={index}>
                                <UserInfo>
                                    <UserInfoText>
                                        <div>나이: {user.age}</div>
                                        <div>성별: {user.gender}</div>
                                        <div>MBTI: {user.mbti}</div>
                                    </UserInfoText>
                                </UserInfo>
                                <TravelList>
                                    <div>이런 여행지를 다녀왔어요:</div>
                                    {user.travelDestinations.map((place, idx) => (
                                        <TravelItem key={idx}>{place}</TravelItem>
                                    ))}
                                </TravelList>
                            </RecommendationItem>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <NavigationButton onClick={handlePrev} disabled={currentIndex === 0}>
                                이전
                            </NavigationButton>
                            <NavigationButton onClick={handleNext} disabled={currentIndex + 3 >= recommendations.length}>
                                다음
                            </NavigationButton>
                        </div>
                    </RecommendationsContainer>
                )}
            </Container>
        </>
    );
};

export default RecommendationCosine;
