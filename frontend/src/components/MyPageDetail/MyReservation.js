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
    { author: 'Author 1', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec:['This is the first user spec','This is the first user spec2']},
    { author: 'Author 2', introduce: '한마디 2',  hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec:['This is the second user spec','This is the second user spec2']},
    { author: 'Author 3',  introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'],spec:['This is the third user spec','This is the third user spec2'] },
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
