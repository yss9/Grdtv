import React, { useState } from 'react';
import styled from 'styled-components';
import Agent from "../Agent/Agent";
import {Agents} from "../../pages/reservation/reservationstyle";
import {Reset} from "styled-reset";

const SelectTitle = styled.div`
  width: 82rem;
  height: 2.5em;
  background-color: white;
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  background-color: ${props => (props.active ? '#d9d9d9' : 'white')};
  display: flex;
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
  margin-top: 1em;
  width:80rem;
  //background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AgentWrapper=styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  //background-color: palevioletred;
`

const AgentData=[
    { title: 'Review 1', content: 'This is the first blog', author: 'Author 1' },
    { title: 'Review 2', content: 'This is the second blog', author: 'Author 2' },
    { title: 'Review 3', content: 'This is the third blog', author: 'Author 3' },
];

export default function MyReservation() {
    const [activeTab, setActiveTab] = useState('myWrite');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [activeIndex] = useState(0);
    const reviewsPerPage = 2;
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
                        <p>진행도</p>
                    </Review>
                ) : (
                    <Review>
                        <AgentWrapper>
                            <Agents>
                                {visibleAgents.map((review, index) => (
                                    <Agent review={review} />
                                ))}
                            </Agents>
                        </AgentWrapper>
                    </Review>
                )}
            </ReviewWrapper>
        </>
    );
}
