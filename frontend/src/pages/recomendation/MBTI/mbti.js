import {Wrapper} from "../../review/reviewstyle";
import { Reset } from 'styled-reset';
import React from 'react';
import {
    Explain,
    Horizonalline,
    Mbti,
    MbtiContainer,
    MbtiSubTitle,
    MbtiTitle,
    MbtiTitleContainer, RecAgainBtn, RecAgainBtnWrapper,
    WriteMbtiBtn, WriteMbtiBtnWrapper
} from "./mbtistyle";
import TopBarComponent from "../../../components/TopBar/TopBar";

export default function RecMbtiPage() {

    return(
        <>
            <Reset/>
            <Wrapper>
                <TopBarComponent />
                <MbtiTitleContainer>
                    <MbtiTitle>MBTI 기반 추천</MbtiTitle>
                    <MbtiSubTitle>
                        <p>나와 비슷한 성격의 소유자들은 어떤 여행지를 선호하고 있을까요?</p>
                        <p>나의 MBTI와 나와 비슷한 성향의 사용자 데이터를 통해 맞춤형 여행 정보를 제공합니다. </p>
                    </MbtiSubTitle>
                    <WriteMbtiBtnWrapper>
                        <WriteMbtiBtn>
                            <p>MBTI를 다시 작성해야 할까요?</p>
                            <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L10 9L1 17" stroke="black" stroke-width="2"/>
                            </svg>
                        </WriteMbtiBtn>
                    </WriteMbtiBtnWrapper>
                    <Horizonalline></Horizonalline>
                    <MbtiContainer>
                        <Mbti>ISFP</Mbti>
                        <Explain>가 선호하는 여행지를 알려드릴게요.</Explain>
                    </MbtiContainer>
                    <RecAgainBtnWrapper>
                        <RecAgainBtn>
                            <p>추천 다시 받기</p>
                            <svg width="11" height="17" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L10 9L1 17" stroke="black" stroke-width="2"/>
                            </svg>
                        </RecAgainBtn>
                    </RecAgainBtnWrapper>
                </MbtiTitleContainer>
            </Wrapper>
        </>
    )
}