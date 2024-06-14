import { Reset } from "styled-reset";
import Agent from "../../components/Agent/Agent"
import Agent2 from "../../components/Agent/Agent2"
import { Wrapper } from "../review/reviewstyle";
import AgentProfile from "../../public/Img/forprofile/AgentProfile.png"
import AgentProfile2 from "../../public/Img/forprofile/AgentProfile2.png"
import AgentProfile3 from "../../public/Img/forprofile/AgentProfile3.png"
import AgentProfile4 from "../../public/Img/forprofile/AgentProfile4.png"
import AgentProfile5 from "../../public/Img/forprofile/AgentProfile5.png"
import AgentProfile6 from "../../public/Img/forprofile/AgentProfile6.png"
import AgentNoProfile from "../../public/Img/forprofile/img_1.png"
import {
    SubTitle, SubTitleWrapper, SearchBarWrapper,
    SearchBarContainer, Magnifier, Search, Icon,
    SubTitle2, AgentContainer, Agents, GaugeBar, GaugeBarWrapper,
    SelectContainer, Select, SelectWrapper, SeeAllBtn, Agents2, DownWrapper
} from './reservationstyle'
import React, { useState } from "react";
import TopBarComponent from "../../components/TopBar/TopBar";

const AgentData = [
    { author: 'Author 1', introduce: ' 친절하게 진행합니다 ^^* ', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['상하이 6년 거주', '중국어 자격증'], image:AgentProfile, score:'4.8', number:'580', agentreview:'원하는 식당의 예약이 불가하면 다른 식당을 추천해 주셔서 좋았어요 ' },
    { author: 'Author 2', introduce: ' 일본 맛집 리스트 보유 중 ', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['일본 10년 거주', 'JLPT N1', '일본 유학 경험 보유'], image: AgentProfile2, score:'4.9', number:'270', agentreview:'다양한 식당, 놀거리를 추천해 주셔서 일본 처음 가는 분들에게 추천해요.' },
    { author: 'Author 3', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'], image: AgentNoProfile },
    { author: 'Author 4', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec'], image: AgentNoProfile },
    { author: 'Author 5', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'], image: AgentNoProfile },
    { author: 'Author 6', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'], image: AgentNoProfile },
    { author: 'Author 7', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec', 'This is the first user spec2'], image: AgentNoProfile },
    { author: 'Author 8', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'],image: AgentNoProfile },
    { author: 'Author 9', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'], image: AgentNoProfile },
    { author: 'Author 10', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec'], image: AgentNoProfile },
];

const Agent2Data = [
    { author: 'Author 1', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec', 'This is the first user spec2'], image:AgentProfile3 },
    { author: 'Author 2', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'],image:AgentProfile4 },
    { author: 'Author 3', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'],image:AgentNoProfile },
    { author: 'Author 4', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec'],image:AgentNoProfile },
    { author: 'Author 5', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'],image:AgentProfile5 },
    { author: 'Author 6', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'],image:AgentProfile6 },
    { author: 'Author 7', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec', 'This is the first user spec2'],image:AgentNoProfile },
    { author: 'Author 8', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'],image:AgentNoProfile },
    { author: 'Author 9', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'],image:AgentNoProfile },
    { author: 'Author 10', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec'] },
];

export default function ReservationPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState("");

    const reviewsPerPage = 2;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleAgents = AgentData.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(AgentData.length / reviewsPerPage);

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const visibleAgents2 = Agent2Data.slice(0, 6); // Adjust the number here as needed

    return (
        <>
            <Reset />
            <Wrapper>
                <TopBarComponent />
                <SubTitleWrapper>
                    <SubTitle>검색을 통해 원하는 글로플러와 예약을 진행할 수 있어요.</SubTitle>
                </SubTitleWrapper>
                <SearchBarWrapper>
                    <Icon>
                        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_74_14)">
                                <path d="M14.2222 32V21.3333H17.7778V24.8889H32V28.4444H17.7778V32H14.2222ZM0 28.4444V24.8889H10.6667V28.4444H0ZM7.11111 21.3333V17.7778H0V14.2222H7.11111V10.6667H10.6667V21.3333H7.11111ZM14.2222 17.7778V14.2222H32V17.7778H14.2222ZM21.3333 10.6667V0H24.8889V3.55556H32V7.11111H24.8889V10.6667H21.3333ZM0 7.11111V3.55556H17.7778V7.11111H0Z" fill="#5F6368" />
                            </g>
                            <defs>
                                <clipPath id="clip0_74_14">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Icon>
                    <SearchBarContainer>
                        <Search placeholder="여행 관련 키워드를 검색해보세요." />
                        <Magnifier>
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.9 27L15.45 17.55C14.7 18.15 13.8375 18.625 12.8625 18.975C11.8875 19.325 10.85 19.5 9.75 19.5C7.025 19.5 4.719 18.556 2.832 16.668C0.945001 14.78 0.00100079 12.474 7.93651e-07 9.75C-0.000999206 7.026 0.943001 4.72 2.832 2.832C4.721 0.944 7.027 0 9.75 0C12.473 0 14.7795 0.944 16.6695 2.832C18.5595 4.72 19.503 7.026 19.5 9.75C19.5 10.85 19.325 11.8875 18.975 12.8625C18.625 13.8375 18.15 14.7 17.55 15.45L27 24.9L24.9 27ZM9.75 16.5C11.625 16.5 13.219 15.844 14.532 14.532C15.845 13.22 16.501 11.626 16.5 9.75C16.499 7.874 15.843 6.2805 14.532 4.9695C13.221 3.6585 11.627 3.002 9.75 3C7.873 2.998 6.2795 3.6545 4.9695 4.9695C3.6595 6.2845 3.003 7.878 3 9.75C2.997 11.622 3.6535 13.216 4.9695 14.532C6.2855 15.848 7.879 16.504 9.75 16.5Z" fill="#4E53EE"/>
                            </svg>
                        </Magnifier>
                    </SearchBarContainer>
                </SearchBarWrapper>
                <SubTitleWrapper>
                    <SubTitle2>최근 이용자 수가 증가한 대행자 리스트예요.</SubTitle2>
                </SubTitleWrapper>
                <AgentContainer>
                    <Agents>
                        {visibleAgents.map((review, index) => (
                            <Agent key={index} review={review} />
                        ))}
                    </Agents>
                    <GaugeBarWrapper>
                        <GaugeBar completion={(activeIndex + 1) / totalIndicators * 100} onClick={handleGaugeClick} />
                    </GaugeBarWrapper>
                </AgentContainer>
                <DownWrapper>
                    <SubTitleWrapper>
                        <SubTitle2>예약 대행자 찾아보기</SubTitle2>
                    </SubTitleWrapper>
                    <SelectWrapper>
                        <SelectContainer>
                            <Select value={selectedCountry} onChange={handleCountryChange}>
                                <option value="">국가 선택</option>
                                <optgroup label="America">
                                    <option value="usa">USA</option>
                                    <option value="canada">Canada</option>
                                </optgroup>
                                <optgroup label="Europe">
                                    <option value="uk">UK</option>
                                    <option value="italy">Italy</option>
                                    <option value="france">France</option>
                                </optgroup>
                                <optgroup label="Asia">
                                    <option value="japan">Japan</option>
                                    <option value="china">China</option>
                                </optgroup>
                            </Select>
                            <SeeAllBtn>
                                <p>전체보기</p>
                                <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L9 8L1 15" stroke="black" strokeWidth="2" />
                                </svg>
                            </SeeAllBtn>
                        </SelectContainer>
                    </SelectWrapper>
                    <AgentContainer>
                        <Agents2>
                            {visibleAgents2.slice(0, 3).map((review, index) => (
                                <Agent2 key={index} review={review} />
                            ))}
                        </Agents2>
                        <Agents2>
                            {visibleAgents2.slice(3, 6).map((review, index) => (
                                <Agent2 key={index} review={review} />
                            ))}
                        </Agents2>
                    </AgentContainer>
                </DownWrapper>
            </Wrapper>
        </>
    );
}
