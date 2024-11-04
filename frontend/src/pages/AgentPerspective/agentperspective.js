import { Reset } from "styled-reset";
import IamAgent from "../../components/Agent/AgentPerspective/IamAgent"
import AgentProfile from "../../public/Img/forprofile/AgentProfile.png"

import Maratang from "../../public/Img/maratang.png"
import {
    SubTitleWrapper,
    SubTitle2,
    AgentContainer,
    Agents,
    Container,
    Wrapper,
} from './agentperspectivestyle'
import React, { useState } from "react";
import TopBarComponent from "../../components/TopBar/TopBar";

const AgentData = [
    { author: '김여행자', introduce: '친절하고 꼼꼼한 여행 파트너!', hashtags: ['#친절', '#꼼꼼', '#여행전문'], spec: ['중국어 전문가', '중국 5년 거주'], image: AgentProfile, score: '4.7', number: '340', agentreview: '꼼꼼하게 챙겨주셔서 너무 좋았어요.', reviewImg:Maratang },
];


export default function ReservationPage() {

    const [selectedCountry, setSelectedCountry] = useState("");

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

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
