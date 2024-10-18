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
                <div style={{height: '55px'}}></div>
                <TopBarComponent/>
                <Wrapper>
                    <SubTitleWrapper>
                        <SubTitle2>많은 여행자들에게 <p>{name.author}</p> 님의 프로필이 보여지고 있어요.</SubTitle2>
                    </SubTitleWrapper>
                    <AgentContainer>
                        <Agents>
                            {AgentData.map((review, index) => (
                                <IamAgent key={index} review={review}/>
                            ))}
                        </Agents>
                    </AgentContainer>
                </Wrapper>
            </Container>
        </>
    );
}
