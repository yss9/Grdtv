import { Reset } from "styled-reset";
import IamAgent from "../../components/Agent/AgentPerspective/IamAgent"
import Agent2 from "../../components/Agent/Agent2"
import AgentProfile from "../../public/Img/forprofile/AgentProfile.png"
import AgentProfile2 from "../../public/Img/forprofile/AgentProfile2.png"
import AgentProfile3 from "../../public/Img/forprofile/AgentProfile3.png"
import AgentProfile4 from "../../public/Img/forprofile/AgentProfile4.png"
import AgentProfile5 from "../../public/Img/forprofile/AgentProfile5.png"
import AgentProfile6 from "../../public/Img/forprofile/AgentProfile6.png"
import AgentNoProfile from "../../public/Img/forprofile/img_1.png"
import Maratang from "../../public/Img/maratang.png"
import {
    SubTitle,
    SubTitleWrapper,
    SearchBarWrapper,
    SearchBarContainer,
    Magnifier,
    Search,
    Icon,
    SubTitle2,
    AgentContainer,
    Agents,
    SelectContainer,
    Select,
    SelectWrapper,
    SeeAllBtn,
    Agents2,
    DownWrapper,
    Container,
    Wrapper, SubTitle3,
} from './agentperspectivestyle'
import React, { useState } from "react";
import TopBarComponent from "../../components/TopBar/TopBar";

const AgentData = [
    { author: '김여행자', introduce: '친절하고 꼼꼼한 여행 파트너!', hashtags: ['#친절', '#꼼꼼', '#여행전문'], spec: ['중국어 전문가', '중국 5년 거주'], image: AgentProfile, score: '4.7', number: '340', agentreview: '꼼꼼하게 챙겨주셔서 너무 좋았어요.', reviewImg:Maratang },
];

const Agent2Data = [
    { author: '김여행자', introduce: '친절하고 꼼꼼한 여행 파트너!', hashtags: ['#친절', '#꼼꼼', '#여행전문'], spec: ['중국어 전문가', '중국 5년 거주'], image: AgentProfile },
    { author: '나미 맛집 전문가', introduce: '현지 맛집을 잘 알아요!', hashtags: ['#일본맛집', '#현지정보', '#여행꿀팁'], spec: ['일본 8년 거주', 'JLPT N2', '유학 경험'], image: AgentProfile2 },
    { author: '프랑스 전문가', introduce: '프랑스 여행은 저에게 맡겨주세요!', hashtags: ['#프랑스여행', '#문화탐방', '#와인투어'], spec: ['프랑스 7년 거주', '프랑스어 능통'], image: AgentProfile3 },
    { author: '미국 길라잡이', introduce: '미국 전역 여행 안내합니다.', hashtags: ['#미국여행', '#로드트립', '#대자연'], spec: ['미국 10년 거주', '영어 능통'], image: AgentProfile4 },
    { author: '독일 전문가', introduce: '독일의 모든 것을 안내합니다.', hashtags: ['#독일여행', '#맥주투어', '#역사탐방'], spec: ['독일 6년 거주', '독일어 자격증'], image: AgentProfile5 },
    { author: '스페인 가이드', introduce: '스페인의 아름다움을 경험하세요.', hashtags: ['#스페인여행', '#예술투어', '#현지체험'], spec: ['스페인 5년 거주', '스페인어 능통'], image: AgentProfile6 },
    { author: '이탈리아 탐험가', introduce: '이탈리아의 숨은 매력을 알려드립니다.', hashtags: ['#이탈리아여행', '#와인투어', '#미식여행'], spec: ['이탈리아 8년 거주', '이탈리아어 능통'], image: AgentNoProfile },
    { author: '캐나다 전문가', introduce: '캐나다 자연 탐험의 진수를 보여드립니다.', hashtags: ['#캐나다여행', '#자연탐험', '#액티비티'], spec: ['캐나다 7년 거주', '영어 능통'], image: AgentNoProfile },
    { author: '호주 가이드', introduce: '호주의 다양한 매력을 안내합니다.', hashtags: ['#호주여행', '#해변', '#현지투어'], spec: ['호주 5년 거주', '영어 능통'], image: AgentNoProfile },
    { author: '영국 여행 전문가', introduce: '영국의 역사와 문화를 체험하세요.', hashtags: ['#영국여행', '#역사탐방', '#문화체험'], spec: ['영국 6년 거주', '영어 능통'], image: AgentNoProfile }
];

export default function ReservationPage() {

    const [selectedCountry, setSelectedCountry] = useState("");

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const visibleAgents2 = Agent2Data.slice(0, 6); // Adjust the number here as needed
    const name = AgentData[0];

    return (
        <>
            <Reset />
            <Container>
                <Wrapper>
                    <div style={{ height: '55px' }}></div>
                    <TopBarComponent/>
                    <SubTitleWrapper>
                        <SubTitle>검색을 통해 원하는 <p>글로플러</p>와 예약을 진행할 수 있어요.</SubTitle>
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
                        <SubTitle2>많은 여행자들에게 <p>{name.author}</p> 님의 프로필이 보여지고 있어요.</SubTitle2>
                    </SubTitleWrapper>
                    <AgentContainer>
                        <Agents>
                            {AgentData.map((review, index) => (
                                <IamAgent key={index} review={review} />
                            ))}
                        </Agents>
                    </AgentContainer>
                    <DownWrapper>
                        <SubTitleWrapper>
                            <SubTitle3>글로플러 찾아보기</SubTitle3>
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
            </Container>
        </>
    );
}
