import styled from 'styled-components';
import React from "react";
import AgentProfile from "../../public/Img/forprofile/AgentProfile.png"

const ProgressData = [
    { stage: 'matching', completion: 25 },
    { stage: 'progressing', completion: 50 },
    { stage: 'deposit', completion: 75 },
    { stage: 'complete', completion: 100 }
];

const Wrapper = styled.div`
  display: flex;
  width: 80rem;
  height: 16rem;
`;

const ProfileImgContainer = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 14rem;
  height: 14rem;
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
  font-size: 30px;
  font-family: "Regular";
  font-weight: bold;
  color: #515151;
`;

const ProgressBarWrapper = styled.div`
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4rem;
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
    background-color: #4e53ed;
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
  font-size: 20px;
  color: #515151;
  font-family: "Regular";
`;

export default function Progress() {
    const currentStage = 'deposit'; //여기상태가 변하면 프로그레스바 변화한다. 백엔드에서 추출!!
    const currentProgress = ProgressData.find(data => data.stage === currentStage).completion;

    return (
        <Wrapper>
            <ProfileImgContainer>
                <ProfileImg src={AgentProfile} />
            </ProfileImgContainer>
            <ProgressContainer>
                <AgentName>여행님</AgentName>
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
