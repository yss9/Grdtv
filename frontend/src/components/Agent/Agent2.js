import React, {useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

const BlogContainer=styled.div`
  width: 19rem;
  //width: 30%;
  height: 19rem;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 40px 10px;
`
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  //background-color: #61dafb;
  border-radius: 15px 0 0 15px;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Content=styled.div`
    width: 92%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: palevioletred;
`
const Profile=styled.div`
 width: 100%;
 height: 55%;
  flex-direction: column;
//background-color: green;
  display: flex;
  align-items: center;
`;
const PImg=styled.img`
    width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #7d7d7d;
`;
const PContainer=styled.div`
    display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
  height: 0.5rem;
  //background-color: palevioletred;
`;
const Pname=styled.div`
  height: 15%;
  //background-color: orchid;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-top: 0.4rem;
  margin-left: 3px;
  color: black;
  font-family: "Regular";

`;

const Read=styled.div`
    width: 100%;
  height: 20%;
 // background-color: greenyellow;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  font-size: 25px;
  text-align: left;
`;

const GoChatBtnWrapper=styled.div`
    width: 95%;
  height: 20%;
   //background-color: #61dafb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const GoChatBtn=styled.button`
  width: 48%;
  height: 80%;
  justify-content: center;
  border-radius: 15px;
  align-items: center;
  font-size: 17px;
  color: #e8e8e8;
    background-color: black;
  border: none;
  display: flex;
  cursor: pointer;
  p{
    margin-right: 0.5rem;
    font-family: "Regular";
  }
`
const NameWrapper=styled.div`
 // background-color: orchid;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: right;
`
const Heart=styled.div`
    
`
const Specs=styled.ul`
    //background-color: red;
  margin: 0 0 0 1rem;
  font-size: 15px;
  font-family: "Regular";

`
const Spec=styled.li`
    list-style: inside;
  margin: 0 0 0.4rem 0 ;
`
const DetailPageBtn=styled.button`
  width: 48%;
  height: 80%;
  justify-content: center;
  border-radius: 15px;
  align-items: center;
  font-size: 17px;
  color: black;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid black;
  display: flex;
  font-family: "Regular";

`


const Agent = ({ review, pageType }) => {

    const navigate = useNavigate();
    const [isHeartFilled, setIsHeartFilled] = useState(pageType === 1);

    const toggleHeart = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    const onClickDetailPageBtn = () => {
        navigate('/gloplerDetail');
    }

    return (
        <>
            <BlogContainer>
                <ContentWrapper>
                    <Content>
                        <Profile>
                            <PContainer>
                                <NameWrapper>
                                    <Heart onClick={toggleHeart}>
                                        {isHeartFilled ? (
                                            <svg width="38" height="38" viewBox="-3.3 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.985 26.9853L12.8144 25.0735C10.2994 22.8382 8.20359 20.9118 6.55689 19.2941C4.91018 17.6765 3.59281 16.2206 2.61976 14.9412C1.64671 13.6618 0.973054 12.4706 0.583832 11.3971C0.194611 10.3235 0 9.22059 0 8.08823C0 5.77941 0.793413 3.85294 2.36527 2.30882C3.93713 0.764706 5.8982 0 8.2485 0C9.5509 0 10.7784 0.264706 11.9611 0.808824C13.1437 1.35294 14.1467 2.10294 15 3.08824C15.8533 2.10294 16.8563 1.35294 18.0389 0.808824C19.2216 0.264706 20.4491 0 21.7515 0C24.1018 0 26.0629 0.779412 27.6347 2.32353C29.2066 3.86765 30 5.79412 30 8.10294C30 9.23529 29.8054 10.3382 29.4162 11.4118C29.0269 12.4853 28.3533 13.6765 27.3802 14.9559C26.4072 16.2353 25.0898 17.6912 23.4431 19.3088C21.7964 20.9265 19.7156 22.8529 17.1856 25.0882L15.015 27L14.985 26.9853Z" fill="#5F6368"/>
                                            </svg>
                                        ) : (
                                            <svg width="38" height="38" viewBox="0 8 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.985 34.9853L15.8144 33.0735C13.2994 30.8382 11.2036 28.9118 9.55689 27.2941C7.91018 25.6765 6.59281 24.2206 5.61976 22.9412C4.64671 21.6618 3.97305 20.4706 3.58383 19.3971C3.19461 18.3235 3 17.2206 3 16.0882C3 13.7794 3.79341 11.8529 5.36527 10.3088C6.93713 8.76471 8.8982 8 11.2485 8C12.5509 8 13.7784 8.26471 14.9611 8.80882C16.1437 9.35294 17.1467 10.1029 18 11.0882C18.8533 10.1029 19.8563 9.35294 21.0389 8.80882C22.2216 8.26471 23.4491 8 24.7515 8C27.1018 8 29.0629 8.77941 30.6347 10.3235C32.2066 11.8676 33 13.7941 33 16.1029C33 17.2353 32.8054 18.3382 32.4162 19.4118C32.0269 20.4853 31.3533 21.6765 30.3802 22.9559C29.4072 24.2353 28.0898 25.6912 26.4431 27.3088C24.7964 28.9265 22.7156 30.8529 20.1856 33.0882L18.015 35L17.985 34.9853ZM17.985 31.0147C20.3802 28.9118 22.3563 27.1029 23.8982 25.5882C25.4401 24.0735 26.6677 22.7647 27.5659 21.6471C28.4641 20.5294 29.0928 19.5441 29.4371 18.6618C29.7814 17.7794 29.9611 16.9265 29.9611 16.0735C29.9611 14.6029 29.4671 13.3824 28.4641 12.3971C27.4611 11.4118 26.2186 10.9265 24.7216 10.9265C23.5539 10.9265 22.4611 11.25 21.4581 11.8971C20.4551 12.5441 19.7665 13.3676 19.3922 14.3824H16.5479C16.1737 13.3824 15.485 12.5441 14.482 11.8971C13.479 11.25 12.4012 10.9265 11.2186 10.9265C9.72156 10.9265 8.47904 11.4118 7.47605 12.3971C6.47305 13.3824 5.97904 14.6029 5.97904 16.0735C5.97904 16.9265 6.15868 17.7941 6.50299 18.6618C6.84731 19.5294 7.47605 20.5294 8.37425 21.6471C9.27245 22.7647 10.5 24.0735 12.0419 25.5882C13.5838 27.1029 15.5599 28.8971 17.9551 31.0147H17.985Z" fill="#5F6368"/>
                                            </svg>
                                        )}
                                    </Heart>
                                </NameWrapper>
                            </PContainer>
                            <PImg src={review.image}></PImg>
                            <Pname>{review.author}</Pname>
                        </Profile>
                        <Read>
                            <Specs>
                                {review.spec.map((tag, index) => (
                                    <Spec key={index}>{tag}</Spec>
                                ))}
                            </Specs>
                        </Read>
                        <GoChatBtnWrapper>
                            <DetailPageBtn onClick={onClickDetailPageBtn}>상세 페이지</DetailPageBtn>
                            <GoChatBtn>
                                <p>채팅하기</p>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.8 14.4C1.305 14.4 0.882 14.22 0.531 13.869C0.18 13.518 0 13.095 0 12.6V1.8C0 1.305 0.18 0.882 0.531 0.531C0.882 0.18 1.305 0 1.8 0H16.2C16.695 0 17.118 0.18 17.469 0.531C17.82 0.882 18 1.305 18 1.8V18L14.4 14.4H1.8Z" fill="#E8E8E8"/>
                                </svg>
                            </GoChatBtn>
                        </GoChatBtnWrapper>
                    </Content>
                </ContentWrapper>
            </BlogContainer>
        </>
    );
};

export default Agent;
