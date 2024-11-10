import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Agent from "../Agent/Agent";
import { Reset } from "styled-reset";
import Progress from "../Agent/progress";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Profile from '../../images/도라에몽.jpeg';

const SelectTitle = styled.div`
    width: 82rem;
    height: 2.5em;
    background-color: white;
    display: flex;
`;

const Tab = styled.div`
    width: 50%;
    background-color: ${props => (props.active ? '#000000' : 'white')};
    color: ${props => (props.active ? 'white' : 'black')};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ReviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Review = styled.div`
    margin-top: 30px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        margin-top: 1em;
    }
`;

const AgentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Agents = styled.div`
    width: 100%;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default function MyReservation() {
    const [activeTab, setActiveTab] = useState('myWrite');
    const [favoriteAgents, setFavoriteAgents] = useState([]);
    const [progressData, setProgressData] = useState([]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const processProfilePicture = (profilePicture) => {
        if (profilePicture) {
            return `http://localhost:8080/${profilePicture.replace('static\\', '').replace(/\\/g, '/')}`;
        } else {
            return Profile;
        }
    };

    useEffect(() => {
        const fetchFavoriteAgents = async () => {
            const token = Cookies.get('jwt');
            if (!token) return;

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            try {
                const response = await axios.get(`http://localhost:8080/api/follow/followed-agents?userId=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFavoriteAgents(response.data.map(agent => ({
                    author: agent.agentDetails.nickname,
                    introduce: agent.agentDetails.introduction,
                    hashtags: agent.agentDetails.hashtags,
                    spec: agent.agentDetails.specIntroduction,
                    image: processProfilePicture(agent.agentDetails.profilePicture)|| Profile,
                    score: agent.agentDetails.averageReviewRating,
                    number: 0,
                })));
            } catch (error) {
                console.error('Failed to fetch favorite agents:', error);
            }
        };

        const fetchProgressData = async () => {
            const token = Cookies.get('jwt');
            if (!token) return;

            const decodedToken = jwtDecode(token);
            const nickname = decodedToken.nickname;

            try {
                const response = await axios.get(`http://localhost:8080/api/booking/all-progress?nickname=${nickname}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProgressData(response.data);
            } catch (error) {
                console.error('Failed to fetch progress data:', error);
            }
        };

        if (activeTab === 'myWrite') {
            fetchProgressData();
        } else if (activeTab === 'joayo') {
            fetchFavoriteAgents();
        }
    }, [activeTab]);

    return (
        <>
            <Reset />
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
                        {progressData.map((progress, index) => (
                            <Progress key={index} currentStage={progress.progress} agentName={progress.agentNickname} />
                        ))}
                    </Review>
                ) : (
                    <Review>
                        <AgentWrapper>
                            <Agents>
                                {favoriteAgents.map((agent, index) => (
                                    <Agent key={index} review={agent} pageType={1} />
                                ))}
                            </Agents>
                        </AgentWrapper>
                    </Review>
                )}
            </ReviewWrapper>
        </>
    );
}
