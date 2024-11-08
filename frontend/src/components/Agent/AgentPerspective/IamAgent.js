import React from 'react';
import styled from 'styled-components';

const BlogContainer = styled.div`
    width: 25rem;
    height: 30rem;
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 40px 10px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const Content = styled.div`
    width: 92%;
    height: 95%;
`;

const Profile = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
`;

const PImg = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #7d7d7d;
    object-fit: cover;

`;

const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 15rem;
    height: 100%;
    margin-left: 10px;
`;

const Pname = styled.div`
    height: 35%;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: Title;
    margin-left: 3px;
    color: #515151;
`;

const Read = styled.div`
    width: 100%;
    height: 37%;
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    font-size: 16px;
    text-align: left;
    font-family: "Regular";
    p {
        font-weight: bold;
    }
`;

const ReadTitle = styled.div`
    width: 100%;
    height: 15%;
    font-size: 20px;
    color: #515151;
    margin: 0.8rem 0 0.4rem 0.8rem;
    font-weight: bold;
    background: linear-gradient(270deg, rgba(78, 83, 238, 0.2) -15.09%, rgba(78, 83, 238, 0.4) 11.32%, rgba(78, 83, 238, 0.379114) 21.37%, rgba(78, 83, 238, 0.6) 35.56%, rgba(78, 83, 238, 0.8) 59.12%, #4E53EE 90.24%), #000000;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const HashTags = styled.div`
    height: 15%;
    text-align: left;
`;

const HashTag = styled.text`
    margin: 7px;
    font-family: Regular;
    font-size: 15px;
    color: #9d9d9d;
`;

const GoChatBtnWrapper = styled.div`
    width: 100%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GoProfileModify = styled.button`
    width: 100%;
    height: 65%;
    font-weight: bold;
    justify-content: center;
    border-radius: 30px;
    align-items: center;
    font-size: 15px;
    color: white;
    background-color: #4e53ed;
    border: none;
    display: flex;
    cursor: pointer;
    p {
        margin-right: 0.5rem;
    }
`;

const NameWrapper = styled.div`
    height: 35%;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const Specs = styled.ul`
    margin: 0.5rem 0 0 1rem;
    font-size: 14px;
`;

const Spec = styled.li`
    list-style: inside;
    margin: 0 0 0.6rem 0;
    color: #5f5f5f;
`;

const ReviewWrapper = styled.div`
    height: 28%;
`;

const StarAvg = styled.div`
    display: flex;
    font-size: 17px;
    margin-left: 0.5rem;
    justify-content: center;
    align-items: center;
    p {
        margin-left: 3px;
        font-family: "Regular";
    }
`;

const SeeAllBtn = styled.button`
    display: flex;
    font-size: 17px;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    svg {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
    }
`;

const UserReview = styled.div`
    background-color: white;
    border: 1px solid #4e53ed;
    width: 100%;
    height: 80%;
    border-radius: 15px;
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const ReviewDetail = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 75%;
    text-align: left;
`;

const UserStar = styled.div`
    margin: 0.8rem 0 0 0.8rem;
    display: flex;
    flex-direction: column;
`;

const SubWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ReviewContent = styled.div`
    margin: 0.5rem 1rem 0 1rem;
    font-family: "Regular";
    font-size: 14px;
    color: #515151;
    line-height: 1.5;
`;

const ReviewPhoto = styled.img`
    width: 5rem;
    height: 5rem;
    background-color: #5F5F5F;
    object-fit: cover;
`;





const IamAgent = ({ review, openModal }) => {

    return (
        <>
            <BlogContainer>
                <ContentWrapper>
                    <Content>
                        <Profile>
                            <PImg src={review.image}></PImg>
                            <PContainer>
                                <NameWrapper>
                                    <Pname>{review.author}</Pname>
                                </NameWrapper>
                                <HashTags>
                                    {review.hashtags.map((tag, index) => (
                                        <HashTag key={index}>{tag}</HashTag>
                                    ))}
                                </HashTags>
                                <GoChatBtnWrapper>
                                    <GoProfileModify onClick={openModal}>프로필 수정</GoProfileModify>
                                </GoChatBtnWrapper>
                            </PContainer>
                        </Profile>
                        <Read>
                            <p>소개</p>
                            <ReadTitle>"{review.introduce}"</ReadTitle>
                            <Specs>
                                {review.spec.map((tag, index) => (
                                    <Spec key={index}>{tag}</Spec>
                                ))}
                            </Specs>
                        </Read>
                        <ReviewWrapper>
                            <SubWrapper>
                                <StarAvg style={{ marginBottom: "10px" }}>
                                    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.5 0L10.8482 5.57786L16.584 6.21885L12.2995 10.3071L13.4962 16.2812L8.5 13.23L3.50383 16.2812L4.70053 10.3071L0.416019 6.21885L6.1518 5.57786L8.5 0Z" fill="#FF9D2A" />
                                    </svg>
                                    <p>{review.score}({review.number})</p>
                                </StarAvg>
                                <SeeAllBtn>
                                    <p style={{ fontFamily: "SubTitle", marginBottom: "10px" }}>전체보기</p>
                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L9 8L1 15" stroke="black" strokeWidth="2" />
                                    </svg>
                                </SeeAllBtn>
                            </SubWrapper>
                            <UserReview>
                                <ReviewDetail>
                                    <UserStar>
                                        <svg width="87" height="18" viewBox="0 0 87 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 0L10.8482 5.57786L16.584 6.21885L12.2995 10.3071L13.4962 16.2812L8.5 13.23L3.50383 16.2812L4.70053 10.3071L0.416019 6.21885L6.1518 5.57786L8.5 0Z" fill="#FF9D2A" />
                                            <path d="M26 0L28.4863 5.57786L34.5595 6.21885L30.023 10.3071L31.2901 16.2812L26 13.23L20.7099 16.2812L21.977 10.3071L17.4405 6.21885L23.5137 5.57786L26 0Z" fill="#FF9D2A" />
                                            <path d="M43.5 0L45.8482 5.57786L51.584 6.21885L47.2995 10.3071L48.4962 16.2812L43.5 13.23L38.5038 16.2812L39.7005 10.3071L35.416 6.21885L41.1518 5.57786L43.5 0Z" fill="#FF9D2A" />
                                            <path d="M61 0L63.4863 5.57786L69.5595 6.21885L65.023 10.3071L66.2901 16.2812L61 13.23L55.7099 16.2812L56.977 10.3071L52.4405 6.21885L58.5137 5.57786L61 0Z" fill="#FF9D2A" />
                                            <path d="M78.5 0L80.8482 5.57786L86.584 6.21885L82.2995 10.3071L83.4962 16.2812L78.5 13.23L73.5038 16.2812L74.7005 10.3071L70.416 6.21885L76.1518 5.57786L78.5 0Z" fill="#FF9D2A" />
                                        </svg>
                                    </UserStar>
                                    <ReviewContent>{review.agentreview}</ReviewContent>
                                </ReviewDetail>
                                <ReviewPhoto src={review.reviewImg}></ReviewPhoto>
                            </UserReview>
                        </ReviewWrapper>
                    </Content>
                </ContentWrapper>
            </BlogContainer>

        </>
    );
};

export default IamAgent;