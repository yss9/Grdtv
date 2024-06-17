import React, { useState } from 'react';
import styled from 'styled-components';
import Agent from "../Agent/Agent";
import {Reset} from "styled-reset";
import Progress from "../Agent/progress";

const SelectTitle = styled.div`
  width: 82rem;
  height: 2.5em;
  background-color: white;
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  background-color: ${props => (props.active ? '#000000' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
`;

const ReviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 // background-color: #61dafb;
  //padding: 1em;
`;

const Review = styled.div`
  margin-top: 4em;
  width:80rem;
  //background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    margin-top: 1em;

  }
`;

const AgentWrapper=styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  //background-color: palevioletred;
`
const Agents=styled.div`
  width: 100%;
  height: 32rem;
  //background-color: gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AgentData=[ //백엔드 데이터 요청 부분
    { author: '김여행', introduce: '친절하고 꼼꼼한 여행 파트너!', hashtags: ['#친절', '#꼼꼼', '#여행전문'], spec: ['중국어 전문가', '중국 5년 거주'] },
    { author: '나미 맛집 전문가', introduce: '현지 맛집을 잘 알아요!', hashtags: ['#일본맛집', '#현지정보', '#여행꿀팁'], spec: ['일본 8년 거주', 'JLPT N2', '유학 경험'] },
    { author: '프랑스 전문가', introduce: '프랑스 여행은 저에게 맡겨주세요!', hashtags: ['#프랑스여행', '#문화탐방', '#와인투어'], spec: ['프랑스 7년 거주', '프랑스어 능통'] }
];

export default function MyReservation() {
    const [activeTab, setActiveTab] = useState('myWrite');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [activeIndex] = useState(0);
    const reviewsPerPage = 3;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleAgents = AgentData.slice(startIndex, startIndex + reviewsPerPage);

    return (
        <>
            <Reset/>
            <SelectTitle>
                <Tab active={activeTab === 'myWrite'} onClick={() => handleTabClick('myWrite')}>
                    진행도
                </Tab>
                <Tab active={activeTab === 'joayo'} onClick={() => handleTabClick('joayo')}>
                    글로플러 즐겨찾기
                </Tab>
            </SelectTitle>
            <ReviewWrapper>
                {activeTab === 'myWrite' ? (
                    <Review>
                        <Progress/>
                    </Review>
                ) : (
                    <Review>
                        <AgentWrapper>
                            <Agents>
                                {visibleAgents.map((review, index) => (
                                    <Agent key={index} review={review} pageType={1}/>// 페이지 타입 1이면 하트 채워져있음
                                ))}
                            </Agents>
                        </AgentWrapper>
                    </Review>
                )}
            </ReviewWrapper>
        </>
    );
}
