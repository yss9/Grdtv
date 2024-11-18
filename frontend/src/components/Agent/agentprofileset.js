import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import MyProfile2 from "../../public/Img/forprofile/img_1.png";
const getAuthToken = () => {
    return Cookies.get('jwt');
};
const BlogContainer = styled.div`
    width: 800px;
    height: 380px;
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 40px 10px;
`;

const ContentWrapper = styled.div`
    width:400px;
    height: 380px;
    border-radius: 15px 0 0 15px;
    align-items: center;
    justify-content: center;
    display: flex;
`;
const ContentWrapper2 = styled.div`
    width:400px;
    height: 380px;
    background-color: #f0f0f0;
    flex-direction: column;
    border-radius: 15px 15px 15px 15px;
    align-items: center;
    justify-content: space-around;
    display: flex;
`;

const Content = styled.div`
    width: 92%;
    height: 95%;
`;

const Profile = styled.div`
    width: 100%;
    height: 35%;
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
    height: 50%;
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
    font-style: normal;
    line-height: 25px;
    background: linear-gradient(
            270deg,
            rgba(78, 83, 238, 0.2) -15.09%,
            rgba(78, 83, 238, 0.4) 11.32%,
            rgba(78, 83, 238, 0.379114) 21.37%,
            rgba(78, 83, 238, 0.6) 35.56%,
            rgba(78, 83, 238, 0.8) 59.12%,
            #4e53ee 90.24%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const HashTags = styled.div`
    height: 15%;
    text-align: left;
`;

const HashTag = styled.span`
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

const GoChatBtn = styled.button`
    width: 100%;
    height: 65%;
    justify-content: center;
    border-radius: 30px;
    align-items: center;
    font-size: 15px;
    color: white;
    background-color: #4e53ed;
    border: none;
    display: flex;
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

// 새로운 입력 필드 스타일
const Input = styled.input`
    width: 300px;
    padding: 5px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const CompleteButton = styled.button`
  width: 360px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #4e53ed;
  color: white;
  font-size: 16px;
  margin-top: 10px;
`;
const Index=styled.div`
    font-family: Regular;
    font-size: 16px;
    text-align: left;
    width: 300px;
    margin-top: 20px;
`
const Info=styled.div`
    font-family: Title;
    font-size: 20px;
    text-align: left;
    width: 360px;
`

const Agentprofileset = ({ name, setName, hashtags, setHashtags, specs, setSpecs }) => {
    const [newName, setNewName] = useState("");
    const [newHashtags, setNewHashtags] = useState("");
    const [newSpecs, setNewSpecs] = useState("");

    const token = getAuthToken(); // JWT 토큰 가져오기
    const [userData, setUserData] = useState(null);


    const handleComplete = () => {
        setName(newName || name);
        setHashtags(newHashtags.split(",").map((tag) => `#${tag.trim()}`));
        setSpecs(newSpecs.split(",").map((spec) => spec.trim()));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (token) {
                    // 토큰에서 사용자 아이디 추출
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;

                    const response = await axios.get(`http://localhost:8080/api/users/my-info?userId=${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserData(response.data);
                } else {
                    console.error('No JWT token found in cookies');
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, [token]);

    const processProfilePicture = (profilePicture) => {
        if (profilePicture) {
            return `http://localhost:8080/${profilePicture.replace('static\\', '').replace(/\\/g, '/')}`;
        } else {
            return MyProfile2;
        }
    };

    return (
        <BlogContainer>
            <ContentWrapper>
                <Content>
                    {userData && (
                        <Profile>
                            <PImg
                                src={processProfilePicture(userData.profilePicture)}
                            />
                            <PContainer>
                                <NameWrapper>
                                    <Pname>{userData.nickname}</Pname>
                                </NameWrapper>
                                <HashTags>
                                    {hashtags.map((tag, index) => (
                                        <HashTag key={index}>{tag}</HashTag>
                                    ))}
                                </HashTags>
                                <GoChatBtnWrapper>
                                    <GoChatBtn>
                                        <p>채팅하기</p>
                                    </GoChatBtn>
                                </GoChatBtnWrapper>
                            </PContainer>
                        </Profile>
                    )}

                    <Read>
                        <p>소개</p>
                        <ReadTitle>"{name}"</ReadTitle>
                        <Specs>
                            {specs.map((spec, index) => (
                                <Spec key={index}>{spec}</Spec>
                            ))}
                        </Specs>
                    </Read>
                </Content>
            </ContentWrapper>
            <ContentWrapper2>
                <Info>정보를 입력하시면 왼쪽 프로필이 완성됩니다.</Info>
                <div>
                    <Index>해시태그 (쉼표로 구분. '#' 입력x)</Index>
                    <Input
                        placeholder="해시태그 입력 (쉼표로 구분)"
                        value={newHashtags}
                        onChange={(e) => setNewHashtags(e.target.value)}
                    />
                    <Index>소개</Index>
                    <Input
                        placeholder="소개 입력"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <Index>스펙 입력 (쉼표로 구분)</Index>
                    <Input
                        placeholder="스펙 입력 (쉼표로 구분)"
                        value={newSpecs}
                        onChange={(e) => setNewSpecs(e.target.value)}
                    />
                </div>
                <CompleteButton onClick={handleComplete}>완료</CompleteButton>
            </ContentWrapper2>
        </BlogContainer>
    );
};

export default Agentprofileset;
