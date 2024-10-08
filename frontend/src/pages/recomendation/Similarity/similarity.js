import { Reset } from 'styled-reset';
import React from 'react';
import {
    Age,
    Body,
    Container,
    Detail,
    Gender,
    Left,
    Mbti,
    Name,
    Profile,
    RecentContainer,
    RecomContainer,
    RouteName,
    SaveBtn,
    Subtitle,
    Routes,
    Subtitle2,
    SubtitleContainer,
    Top,
    User,
    Wrapper,
    Map,
    Left2,
    Place,
    SubtitleContainer2,
    PlaceName,
    PlaceWrapper,
    Triangle,
    Left3,
    Country,
    RightArrow,
    ProfileWrapper
} from "./similarityStlye";
import TopBarComponent from "../../../components/TopBar/TopBar";

export default function RecSimilarityPage() {
    return(
        <>
            <Reset/>
            <div style={{height: '55px'}}></div>
            <TopBarComponent/>
            <Container>
                <Wrapper>
                    <SubtitleContainer>
                        <Subtitle>운명의 여행 루트</Subtitle>
                        <Subtitle2>
                            성별, 나이, MBTI가 나와 유사한 여행자의 루트를 제공해요. <br />
                            운명의 여행 루트를 발견하고 마음에 드는 루트를 저장해 보세요.
                        </Subtitle2>
                    </SubtitleContainer>
                    <RecomContainer>
                        <Top>
                            <Left>
                                <Profile></Profile>
                                <User>
                                    <Name>여행꽁쥐 님</Name>
                                    <Detail>
                                        <Gender>여</Gender>ᆞ
                                        <Age>23 세</Age>ᆞ
                                        <Mbti>ENTP</Mbti>
                                    </Detail>
                                </User>
                            </Left>
                            <SaveBtn>저장하기</SaveBtn>
                        </Top>
                        <Body>
                            <Left2>
                                <RouteName>가성비 관광루트</RouteName>
                                <Routes>
                                    <PlaceWrapper>
                                        <Place></Place>
                                        <PlaceName>장소명</PlaceName>
                                    </PlaceWrapper>
                                    <Triangle/>
                                    <PlaceWrapper>
                                        <Place></Place>
                                        <PlaceName>장소명</PlaceName>
                                    </PlaceWrapper>
                                    <Triangle/>
                                    <PlaceWrapper>
                                        <Place></Place>
                                        <PlaceName>장소명</PlaceName>
                                    </PlaceWrapper>
                                    <Triangle/>
                                    <PlaceWrapper>
                                        <Place></Place>
                                        <PlaceName>장소명</PlaceName>
                                    </PlaceWrapper>
                                    <Triangle/>
                                    <PlaceWrapper>
                                        <Place></Place>
                                        <PlaceName>장소명</PlaceName>
                                    </PlaceWrapper>
                                    <Triangle/>
                                    <PlaceWrapper>
                                        <Place></Place>
                                        <PlaceName>장소명</PlaceName>
                                    </PlaceWrapper>
                                    <Triangle/>
                                    <PlaceWrapper>
                                        <Place></Place>
                                        <PlaceName>장소명</PlaceName>
                                    </PlaceWrapper>
                                </Routes>
                            </Left2>
                            <Map></Map>
                        </Body>
                    </RecomContainer>
                    <SubtitleContainer2>
                        <Subtitle>내가 만난 여행 루트</Subtitle>
                        <Subtitle2>
                            <p>그동안 만난 운명 여행 루트를 다시 볼 수 있어요.</p>
                        </Subtitle2>
                    </SubtitleContainer2>
                    <RecentContainer>
                        <Left3>
                            <ProfileWrapper>
                                <Profile></Profile>
                                <User>
                                    <Name><p>여행꽁쥐 님의</p> 가성비 관광 루트</Name>
                                    <Detail>
                                        <Gender>여</Gender>ᆞ
                                        <Age>23 세</Age>ᆞ
                                        <Mbti>ENTP</Mbti>
                                    </Detail>
                                </User>
                            </ProfileWrapper>
                            <Country>나라</Country>
                        </Left3>
                        <RightArrow>
                            <svg width="13" height="30" viewBox="0 0 16 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 2L14 15L2 28" stroke="#020202" stroke-width="4" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </RightArrow>
                    </RecentContainer>
                    <RecentContainer></RecentContainer>
                    <RecentContainer></RecentContainer>
                </Wrapper>
            </Container>
        </>
    );
}
