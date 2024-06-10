import React from 'react';
import styled from 'styled-components';

const BlogContainer=styled.div`
  width: 19.5rem;
  height: 5.5rem;
  background-color: #d9d9d9;
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 10px 10px;
`
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  //background-color: #61dafb;
  border-radius: 15px 0 0 15px;
  // 스타일 정의
  align-items: center;
  justify-content: center;
  display: flex;
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
 // background-color: palevioletred;
`
const Profile=styled.image`
    width: 3rem;
  height: 3rem;
  background-color: gray;
  border-radius: 50%;
`

const PlaceReview = ({ review  }) => {
    return (
        <>
            <BlogContainer>
                <ContentWrapper>
                    <Profile></Profile>
                    <ReviewDetail>
                        <ReviewContent>{review.review}</ReviewContent>
                    </ReviewDetail>
                </ContentWrapper>
            </BlogContainer>
        </>
    );
};

export default PlaceReview;
