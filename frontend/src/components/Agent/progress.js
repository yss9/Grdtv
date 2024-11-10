import React from 'react';
import styled from 'styled-components';
import AgentProfile from '../../images/도라에몽.jpeg';

const Wrapper = styled.div`
    display: flex;
    width: 800px;
    height: 200px;
    margin-bottom: 10px;
`;

const ProfileImgContainer = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileImg = styled.img`
    width: 150px;
    height: 150px;
    background-color: pink;
    border-radius: 100%;
`;

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 72%;
`;

const AgentName = styled.div`
    height: 40%;
    display: flex;
    align-items: flex-end;
    font-size: 27px;
    font-family: "Regular";
    font-weight: bold;
    color: #515151;
`;

const ProgressBarWrapper = styled.div`
    margin: 5px 0;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 40px;
    background-color: #d9d9d9;
    border-radius: 0 100px 100px 0;
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${props => props.completion}%;
        background-color: #ff9900;
        border-radius: 0 100px 100px 0;
        transition: width 0.5s ease;
    }
`;

const ProgressNameWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const ProgressName = styled.div`
    font-size: 17px;
    color: #515151;
    font-family: "Regular";
`;

// 각 단계별 완료 비율
const ProgressData = [
    { stage: 1, completion: 25 },
    { stage: 2, completion: 50 },
    { stage: 3, completion: 75 },
    { stage: 4, completion: 100 },
];

export default function Progress({ currentStage, agentName }) {
    const currentProgress = ProgressData.find(data => data.stage === currentStage)?.completion || 0;

    return (
        <Wrapper>
            <ProfileImgContainer>
                <ProfileImg src={AgentProfile} alt="Agent Profile" />
            </ProfileImgContainer>
            <ProgressContainer>
                <AgentName>{agentName}</AgentName>
                <ProgressBarWrapper>
                    <ProgressBar completion={currentProgress} />
                </ProgressBarWrapper>
                <ProgressNameWrapper>
                    <ProgressName>글로플러 매칭</ProgressName>
                    <ProgressName>대행 진행</ProgressName>
                    <ProgressName>입금 완료</ProgressName>
                    <ProgressName>여행 완료</ProgressName>
                </ProgressNameWrapper>
            </ProgressContainer>
        </Wrapper>
    );
}
