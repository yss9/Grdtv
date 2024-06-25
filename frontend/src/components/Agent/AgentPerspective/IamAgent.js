import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Modal from "./modal";

const BlogContainer = styled.div`
    width: 25rem;
    height: 30rem;
    background-color: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
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

const MProfile = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    //background-color: lightgoldenrodyellow;
    
`;
const MPImgContainer = styled.div`
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    overflow: hidden;
`;

const MPImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(50%);
`;

const SVGOverlay = styled.svg`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 27px;
    fill: white;
`;

const MPContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    margin-left: 10px;
`;

const MNameWrapper = styled.div`
    text-align: left;
   // background-color: lightpink;
    margin: 0 0 10px 0;
    p{
        color: #5f5f5f;
        font-family: Regular;
        font-size: 15px;
        margin: 5px;
    }
`;


const MPname = styled.input`
    width: 250px;
    height: 30px;
    font-size: 20px;
    font-family: Regular;
    border-radius: 10px;
    border: 1px solid #939393;
    color: black;
    
`;

const MHashTags = styled.div`
    text-align: left;
    //background-color: lightblue;
    p{
        color: #5f5f5f;
        font-family: Regular;
        font-size: 15px;
        margin: 5px;
    }
`;

const MHashTag = styled.input`
    width: 250px;
    height: 30px;
    font-size: 20px;
    font-family: Regular;
    border-radius: 10px;
    border: 1px solid #939393;
    color: black;
`;

const MRead = styled.div`
    width: 400px;
    //background-color: #61dafb;
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    font-size: 16px;
    text-align: left;
    font-family: "Regular";
    p {
        color: #5f5f5f;
        font-family: Regular;
        font-size: 15px;
        margin: 5px;
    }
`;

const MReadTitle = styled.textarea`
    font-size: 20px;
    border: 2px solid #ccc;
    border-radius: 5px;
    resize: none; /* 크기 조절 기능 제거 */
    width: 100%; /* 원하는 너비 설정 */
    height: 60px; /* 원하는 높이 설정 */
    box-sizing: border-box; /* 패딩과 테두리를 포함한 크기 계산 */
    font-family: "Regular";
    margin-top: 7px;
    //resize: none;
    color: #515151;
    font-weight: bold;
`;

const MSpecsContainer = styled.div`
    width: 400px;
    margin-top: 10px;
    font-size: 16px;
    text-align: left;
    font-family: "Regular";
    border-radius: 5px;
    p {
        color: #5f5f5f;
        font-family: Regular;
        font-size: 15px;
        margin: 5px;
    }
`;

const MSpecList = styled.ul`
    padding: 0;
    list-style: none;
    margin-top: 10px;
    background-color: #d9d9d9;
    border-radius: 10px;
`;

const MSpecItem = styled.li`
    position: relative;
    padding-left: 15px;
    margin-top: 0.6rem;
    display: flex;
    align-items: center;
    &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: #5f5f5f;
    }
`;

const MSpecInput = styled.input`
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin-top: 5px;
    flex: 1;
`;

const AddSpecInput = styled.input`
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    width: calc(100% - 1rem);
    box-sizing: border-box;
`;

const DeleteButton = styled.button`
    background-color: transparent;
    color: #4e53ed;
    border: none;
    width: 20px;
    height: 20px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 15px;
`;


const IamAgent = ({ review }) => {

    const [authorName, setAuthorName] = useState(review.author);
    const [hashTags, setHashTags] = useState(review.hashtags.join(' '));
    const [Introduce, setIntroduce] = useState(review.introduce);

    const handleInputChange = (event) => {
        setAuthorName(event.target.value);
    };
    const handleHashTagChange = (event) => {
        setHashTags(event.target.value);
    };
    const handleIntroduceChange = (event) => {
        setIntroduce(event.target.value);
    };

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [specs, setSpecs] = useState(review.spec);
    const [newSpec, setNewSpec] = useState('');

    const handleSpecChange = (index, event) => {
        const newSpecs = [...specs];
        newSpecs[index] = event.target.value;
        setSpecs(newSpecs);
    };

    const handleNewSpecChange = (event) => {
        setNewSpec(event.target.value);
    };

    const handleAddSpec = (event) => {
        if (event.key === 'Enter' && newSpec.trim() !== '') {
            event.preventDefault();
            setSpecs([...specs, newSpec]);
            setNewSpec('');
        }
    };
    const handleDeleteSpec = (index) => {
        const updatedSpecs = specs.filter((_, i) => i !== index);
        setSpecs(updatedSpecs);
    };



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
            <Modal showModal={showModal} closeModal={closeModal}>
                <MProfile>
                    <MPImgContainer>
                        <MPImg src={review.image}/>
                        <SVGOverlay viewBox="0 0 35 32">
                            <svg width="35" height="32" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.5 25.7778C19.6875 25.7778 21.5425 24.9956 23.0825 23.4489C24.6225 21.9022 25.375 20 25.375 17.7778C25.375 15.5556 24.605 13.6711 23.0825 12.1067C21.56 10.5422 19.6875 9.77778 17.5 9.77778C15.3125 9.77778 13.4575 10.56 11.9175 12.1067C10.3775 13.6533 9.625 15.5556 9.625 17.7778C9.625 20 10.395 21.8844 11.9175 23.4489C13.44 25.0133 15.3125 25.7778 17.5 25.7778ZM17.5 22.2222C16.275 22.2222 15.2425 21.7956 14.385 20.9244C13.5275 20.0533 13.1075 19.0044 13.1075 17.76C13.1075 16.5156 13.5275 15.4667 14.385 14.5956C15.225 13.7422 16.275 13.2978 17.5 13.2978C18.725 13.2978 19.7575 13.7244 20.615 14.5956C21.455 15.4489 21.8925 16.5156 21.8925 17.76C21.8925 19.0044 21.4725 20.0533 20.615 20.9244C19.7575 21.7956 18.725 22.2222 17.5 22.2222ZM3.5 32C2.5375 32 1.715 31.6444 1.0325 30.9511C0.35 30.2578 0 29.4222 0 28.4444V7.11111C0 6.13333 0.35 5.29778 1.0325 4.60444C1.715 3.91111 2.5375 3.55556 3.5 3.55556H9.0125L12.25 0H22.75L25.9875 3.55556H31.5C32.4625 3.55556 33.285 3.91111 33.9675 4.60444C34.65 5.29778 35 6.13333 35 7.11111V28.4444C35 29.4222 34.65 30.2578 33.9675 30.9511C33.285 31.6444 32.4625 32 31.5 32H3.5ZM3.5 28.4444H31.5V7.11111H24.4125L21.21 3.55556H13.7725L10.57 7.11111H3.5V28.4444Z"
                                    fill="white"/>
                            </svg>
                        </SVGOverlay>
                    </MPImgContainer>
                    <MPContainer>
                        <MNameWrapper>
                            <p>닉네임</p>
                            <MPname
                                type="text"
                                value={authorName}
                                onChange={handleInputChange}
                            />
                        </MNameWrapper>
                        <MHashTags>
                            <p>해시태그</p>
                            <MHashTag
                                type="text"
                                value={hashTags}
                                onChange={handleHashTagChange}
                            />
                        </MHashTags>
                    </MPContainer>
                </MProfile>
                <MRead>
                    <p>한마디</p>
                    <MReadTitle
                        type="text"
                        value={Introduce}
                        onChange={handleIntroduceChange}
                    />
                    <MSpecsContainer>
                        <p>스펙</p>
                        <MSpecList>
                            {specs.map((spec, index) => (
                                <MSpecItem key={index}>
                                    <MSpecInput
                                        type="text"
                                        value={spec}
                                        onChange={(e) => handleSpecChange(index, e)}
                                    />
                                    <DeleteButton onClick={() => handleDeleteSpec(index)}>
                                        X
                                    </DeleteButton>
                                </MSpecItem>
                            ))}
                            <MSpecItem>
                                <AddSpecInput
                                    type="text"
                                    value={newSpec}
                                    onChange={handleNewSpecChange}
                                    onKeyPress={handleAddSpec}
                                    placeholder="스펙을 추가하려면 엔터를 누르세요"
                                />
                            </MSpecItem>
                        </MSpecList>
                    </MSpecsContainer>
                </MRead>
            </Modal>
        </>
    );
};

export default IamAgent;
