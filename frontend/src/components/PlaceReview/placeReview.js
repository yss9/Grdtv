import React from 'react';
import styled from 'styled-components';

const BlogContainer=styled.div`
  width: 20rem;
  height: 6.2rem;
  background-color: #d9d9d9;
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 10px 10px;
  border-radius: 15px;

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
const Profile=styled.image`
    width: 3.7rem;
  height: 3.7rem;
  background-color: #4e53ed;
  border-radius: 50%;
`
const ProfileContainer=styled.div`
    //background-color: palegoldenrod;
  margin-left: 0.3rem;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PlaceReview = ({ review  }) => {
    return (
        <>
            <BlogContainer>
                <ContentWrapper>
                    <ProfileContainer>
                        <Profile></Profile>
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
