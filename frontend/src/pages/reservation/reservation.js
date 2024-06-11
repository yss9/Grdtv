import { Reset } from "styled-reset";
import Agent from "../../components/Agent/Agent"
import Agent2 from "../../components/Agent/Agent2"
import { Wrapper } from "../review/reviewstyle";
import {
    SubTitle, SubTitleWrapper, SearchBarWrapper,
    SearchBarContainer, Magnifier, Search, Icon,
    SubTitle2, AgentContainer, Agents, GaugeBar, GaugeBarWrapper,
    SelectContainer, Select, SelectWrapper, SeeAllBtn, Agents2
} from './reservationstyle'
import React, { useState } from "react";
import TopBarComponent from "../../components/TopBar/TopBar";

const AgentData = [ //백엔드 데이터 가져오기
    { author: 'Author 1', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec', 'This is the first user spec2'] },
    { author: 'Author 2', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'] },
    { author: 'Author 3', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'] },
    { author: 'Author 4', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec'] },
    { author: 'Author 5', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'] },
    { author: 'Author 6', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'] },
    { author: 'Author 7', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec', 'This is the first user spec2'] },
    { author: 'Author 8', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'] },
    { author: 'Author 9', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'] },
    { author: 'Author 10', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec'] },
];

const Agent2Data = [//백엔드 데이터 가져오기
    { author: 'Author 1', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec', 'This is the first user spec2'] },
    { author: 'Author 2', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'] },
    { author: 'Author 3', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'] },
    { author: 'Author 4', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec'] },
    { author: 'Author 5', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'] },
    { author: 'Author 6', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'] },
    { author: 'Author 7', introduce: '한마디', hashtags: ['#tag1', '#tag2', '#tag3'], spec: ['This is the first user spec', 'This is the first user spec2'] },
    { author: 'Author 8', introduce: '한마디 2', hashtags: ['#2tag1', '#2tag2', '#2tag3'], spec: ['This is the second user spec', 'This is the second user spec2'] },
    { author: 'Author 9', introduce: '한마디 3', hashtags: ['#3tag1', '#3tag2', '#3tag3'], spec: ['This is the third user spec', 'This is the third user spec2'] },
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
                            <svg width="37" height="35" viewBox="-3 -5 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.7352 35L20.9321 22.75C19.916 23.5278 18.7474 24.1435 17.4265 24.5972C16.1055 25.0509 14.6999 25.2778 13.2096 25.2778C9.51767 25.2778 6.39343 24.0541 3.83687 21.6067C1.28031 19.1593 0.0013559 16.17 1.07526e-06 12.6389C-0.00135375 9.10778 1.2776 6.11852 3.83687 3.67111C6.39614 1.2237 9.52038 0 13.2096 0C16.8988 0 20.0237 1.2237 22.5843 3.67111C25.1449 6.11852 26.4232 9.10778 26.4191 12.6389C26.4191 14.0648 26.1821 15.4097 25.7079 16.6736C25.2337 17.9375 24.5901 19.0556 23.7772 20.0278L36.5804 32.2778L33.7352 35ZM13.2096 21.3889C15.7499 21.3889 17.9095 20.5385 19.6884 18.8378C21.4673 17.137 22.356 15.0707 22.3547 12.6389C22.3533 10.207 21.4645 8.14139 19.6884 6.44194C17.9122 4.7425 15.7526 3.89148 13.2096 3.88889C10.6666 3.8863 8.50764 4.73732 6.73282 6.44194C4.95799 8.14657 4.06855 10.2122 4.06449 12.6389C4.06042 15.0656 4.94987 17.1319 6.73282 18.8378C8.51577 20.5437 10.6747 21.3941 13.2096 21.3889Z" fill="#D9D9D9" />
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
            </Wrapper>
        </>
    );
}
