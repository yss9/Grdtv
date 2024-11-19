import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BlogContainer=styled.div`
  width: 20rem;
  height: 6.2rem;
  background-color: #d9d9d9;
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 10px 10px;
  border-radius: 15px;
    cursor: pointer;

`
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F4F6F8;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 15px;
`;

const ReviewDetail=styled.div`
    display: flex;
  flex-direction: column;
 // background-color: red;
  height: 100%;
  width: 84%;
  text-align: left;
  justify-content: center;
`
const ReviewContent=styled.div`
    padding: 10px;
  //background-color: palevioletred;
`
const Profile=styled.img`
    width: 3.7rem;
  height: 3.7rem;
  background-color: white;
  border-radius: 50%;
    object-fit: cover;
`
const ProfileContainer=styled.div`
    //background-color: palegoldenrod;
  margin-left: 0.3rem;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PlaceReview = ({ review, profilePicture, boardID  }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/board/${boardID}`);
    };

    return (
        <>
            <BlogContainer onClick={handleClick}>
                <ContentWrapper>
                    <ProfileContainer>
                        <Profile src={profilePicture}></Profile>
                    </ProfileContainer>
                    <ReviewDetail>
                        <ReviewContent>{review}</ReviewContent>
                    </ReviewDetail>
                </ContentWrapper>
            </BlogContainer>
        </>
    );
};

export default PlaceReview;
