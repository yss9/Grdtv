import { Reset } from "styled-reset";
import {
    AgentProfileBox, AgentProfileContainer, ChatBtn, Container, Content,
    FirstLine, HashTags, Heart, Introduce, IntroduceBox,
    ProfileCountry, ProfileImg, ProfileName, Wrapper,
    In, TotalReservation, StarPoint, StatsContent,
    StatsTitle, Stats, HashTag, HorizonLine, ReservationCount, Point,
    ReviewContent, ReviewBox, UserProfile, UserName, Review,
    ProfileContent, Star, Date, ProfileContent2, SeeAllBtn
} from './agentDetailStyle'
import TopBarComponent from "../../components/TopBar/TopBar";
import React, { useState } from "react";
import AgentProfile from "../../public/Img/forprofile/AgentProfile2.png";
import Profile from "../../public/Img/forprofile/img.png";
import Profile2 from "../../public/Img/forprofile/myprofile.png";
import {useNavigate} from "react-router-dom";

const AgentData = [
    { author: '여행',
        country:'일본',
        hashtags: ['#일본', '#맛집중심', '#액티비티', '#빠른연락'],
        spec: ['일본 10년 거주', 'JLPT N1', '일본 유학 경험 보유'],
        image: AgentProfile,
        introduce: ['일본 맛집 리스트 보유 중 입니다.', '일본 현지 식당, 호텔, 체험 등 예약 대행 서비스를 진행합니다.'],
        num: 56,
        star:4.9,
        starnum:40
    }
]
const ReviewData=[
    {profile: Profile, author:'여행조아', star:5, date:'2024.03.27', review:'다양한 식당, 놀거리를 추천해 주셔서 일본 처음 가는 분들에게 추천해요.'},
    {profile: Profile2, author:'다람쥐', star:4, date:'2024.04.10', review:'채팅하는 동안 너무 친절하시고 축제 정보까지 알려주셔서 여행 계획 짜는 데에 큰 부담이 없었어요.'}
]
export default function ReservationPage() {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const toggleHeart = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const navigate = useNavigate();
    const onClickGoChat = () => {
        navigate('/chat');
    }

    return (
        <>
            <Reset />
            <Wrapper>
                <Container>
                    <div style={{ height: '55px' }}></div>
                    <TopBarComponent />
                    {AgentData.map((agent, index) => (
                    <Wrapper>
                        <AgentProfileBox>
                            <AgentProfileContainer>
                                <ProfileImg src={agent.image} />
                                <Content>
                                    <FirstLine>
                                        <ProfileName>{agent.author} 님</ProfileName>
                                        <ProfileCountry>{agent.country} 글로플러</ProfileCountry>
                                        <Heart onClick={toggleHeart}>
                                            {isHeartFilled ? (
                                                <svg width="38" height="38" viewBox="-3.3 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.985 26.9853L12.8144 25.0735C10.2994 22.8382 8.20359 20.9118 6.55689 19.2941C4.91018 17.6765 3.59281 16.2206 2.61976 14.9412C1.64671 13.6618 0.973054 12.4706 0.583832 11.3971C0.194611 10.3235 0 9.22059 0 8.08823C0 5.77941 0.793413 3.85294 2.36527 2.30882C3.93713 0.764706 5.8982 0 8.2485 0C9.5509 0 10.7784 0.264706 11.9611 0.808824C13.1437 1.35294 14.1467 2.10294 15 3.08824C15.8533 2.10294 16.8563 1.35294 18.0389 0.808824C19.2216 0.264706 20.4491 0 21.7515 0C24.1018 0 26.0629 0.779412 27.6347 2.32353C29.2066 3.86765 30 5.79412 30 8.10294C30 9.23529 29.8054 10.3382 29.4162 11.4118C29.0269 12.4853 28.3533 13.6765 27.3802 14.9559C26.4072 16.2353 25.0898 17.6912 23.4431 19.3088C21.7964 20.9265 19.7156 22.8529 17.1856 25.0882L15.015 27L14.985 26.9853Z" fill="#5F6368"/>
                                                </svg>
                                            ) : (
                                                <svg width="38" height="38" viewBox="0 8 38 38" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.985 34.9853L15.8144 33.0735C13.2994 30.8382 11.2036 28.9118 9.55689 27.2941C7.91018 25.6765 6.59281 24.2206 5.61976 22.9412C4.64671 21.6618 3.97305 20.4706 3.58383 19.3971C3.19461 18.3235 3 17.2206 3 16.0882C3 13.7794 3.79341 11.8529 5.36527 10.3088C6.93713 8.76471 8.8982 8 11.2485 8C12.5509 8 13.7784 8.26471 14.9611 8.80882C16.1437 9.35294 17.1467 10.1029 18 11.0882C18.8533 10.1029 19.8563 9.35294 21.0389 8.80882C22.2216 8.26471 23.4491 8 24.7515 8C27.1018 8 29.0629 8.77941 30.6347 10.3235C32.2066 11.8676 33 13.7941 33 16.1029C33 17.2353 32.8054 18.3382 32.4162 19.4118C32.0269 20.4853 31.3533 21.6765 30.3802 22.9559C29.4072 24.2353 28.0898 25.6912 26.4431 27.3088C24.7964 28.9265 22.7156 30.8529 20.1856 33.0882L18.015 35L17.985 34.9853ZM17.985 31.0147C20.3802 28.9118 22.3563 27.1029 23.8982 25.5882C25.4401 24.0735 26.6677 22.7647 27.5659 21.6471C28.4641 20.5294 29.0928 19.5441 29.4371 18.6618C29.7814 17.7794 29.9611 16.9265 29.9611 16.0735C29.9611 14.6029 29.4671 13.3824 28.4641 12.3971C27.4611 11.4118 26.2186 10.9265 24.7216 10.9265C23.5539 10.9265 22.4611 11.25 21.4581 11.8971C20.4551 12.5441 19.7665 13.3676 19.3922 14.3824H16.5479C16.1737 13.3824 15.485 12.5441 14.482 11.8971C13.479 11.25 12.4012 10.9265 11.2186 10.9265C9.72156 10.9265 8.47904 11.4118 7.47605 12.3971C6.47305 13.3824 5.97904 14.6029 5.97904 16.0735C5.97904 16.9265 6.15868 17.7941 6.50299 18.6618C6.84731 19.5294 7.47605 20.5294 8.37425 21.6471C9.27245 22.7647 10.5 24.0735 12.0419 25.5882C13.5838 27.1029 15.5599 28.8971 17.9551 31.0147H17.985Z"
                                                        fill="#5F6368"/>
                                                </svg>
                                            )}
                                        </Heart>
                                    </FirstLine>
                                    <HashTags>
                                        {agent.hashtags.map((hashtag, index) => (
                                            <HashTag key={index}
                                                     first={index === 0}>{hashtag}</HashTag>
                                        ))}
                                    </HashTags>
                                    <Introduce>
                                        {agent.introduce.map((intro, index) => (
                                            <p key={index}>{intro}</p>
                                        ))}
                                    </Introduce>
                                </Content>
                            </AgentProfileContainer>
                            <ChatBtn onClick={onClickGoChat}>채팅하기</ChatBtn>
                        </AgentProfileBox>
                        <IntroduceBox>
                            <p>소개</p>
                            {agent.spec.map((spec, index) => (
                                <In key={index}>{spec}</In>
                            ))}
                        </IntroduceBox>
                        <HorizonLine></HorizonLine>
                        <Stats>
                            <StatsTitle>통계</StatsTitle>
                            <StatsContent>
                                <TotalReservation>
                                    총 예약 대행 건
                                    <ReservationCount>{agent.num}건</ReservationCount>
                                </TotalReservation>
                                <StarPoint>
                                    별점
                                    <Point>
                                        <svg width="41" height="42" viewBox="0 0 41 42" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20.5 0L26.4396 14.1087L40.9477 15.73L30.1104 26.071L33.1374 41.1817L20.5 33.4641L7.86262 41.1817L10.8896 26.071L0.0522842 15.73L14.5604 14.1087L20.5 0Z"
                                                fill="#FF9D2A"/>
                                        </svg>
                                        <div>{agent.star}</div>
                                        <div>({agent.starnum})</div>
                                    </Point>
                                </StarPoint>
                            </StatsContent>
                        </Stats>
                        <HorizonLine></HorizonLine>
                        <Stats>
                            <StatsTitle>예약 후기</StatsTitle>
                            <SeeAllBtn>
                                <p>전체보기</p>
                                <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L9 8L1 15" stroke="black" strokeWidth="2" />
                                </svg>
                            </SeeAllBtn>
                            <ReviewContent>
                                {ReviewData.map((review, index) => (
                                <ReviewBox>
                                    <ProfileContent>
                                        <UserProfile src={review.profile}></UserProfile>
                                        <UserName>{review.author}</UserName>
                                    </ProfileContent>
                                    <ProfileContent2>
                                        <Star>
                                            {[...Array(review.star)].map((_, i) => (
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8.5 0L10.8482 5.57786L16.584 6.21885L12.2995 10.3071L13.4962 16.2812L8.5 13.23L3.50383 16.2812L4.70053 10.3071L0.416019 6.21885L6.1518 5.57786L8.5 0Z"
                                                        fill="#FF9D2A"/>
                                                </svg>
                                            ))}
                                        </Star>
                                        <Date>{review.date}</Date>
                                    </ProfileContent2>
                                    <Review>{review.review}</Review>
                                </ReviewBox>
                                ))}
                            </ReviewContent>
                        </Stats>
                    </Wrapper>
                    ))}
                </Container>
            </Wrapper>
        </>
    );
}
