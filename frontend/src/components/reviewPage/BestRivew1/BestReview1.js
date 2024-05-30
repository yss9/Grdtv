// BestReview1.js
import React from 'react';
import styled from 'styled-components';

const ReviewContainer = styled.div`
  width: 32%;
  height: 42vh;
  background-color: #d9d9d9;
  border-radius: 15px;
  position: relative
`;
const InformContainer=styled.div`
  width: 100%;
  height: 35%;
  background-color: #8e8e8e;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 15px 15px;
`;
const Inform=styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 10px 10px 15px;
`
const Title =styled.text`
  color: #ffffff;
  font-size: 23px;
`
const Author=styled.text`
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  bottom: 35px;
`
const Icons=styled.div`
    display: flex;
  position: absolute;
  bottom: 10px;
  width: 50%;
`
const Like =styled.div`
  color: #515151;
  font-size: 17px;
  display: flex;
`
const LikeIcon =styled.div`
 width: 2.5vh;
  height: 100%;
  background-color: #b4b4b4;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Comment=styled.div`
  color: #515151;
  font-size: 17px;
  display: flex;
  margin-left: 10px;
`
const CommentIcon =styled.div`
 width: 2.5vh;
  height: 100%;
  background-color: #b4b4b4;
  display: flex;
  align-items: center;
  justify-content: center;
`
const BestReview1 = ({ review }) => {
    return (
        <ReviewContainer>
            <InformContainer>
                <Inform>
                    <Title>{review.title}</Title>
                    <Author>{review.author}</Author>
                    <Icons>
                        <Like>
                            <LikeIcon>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 13L5.5575 12.0649C2.21 8.7564 0 6.5673 0 3.89646C0 1.70736 1.573 0 3.575 0C4.706 0 5.7915 0.573842 6.5 1.47357C7.2085 0.573842 8.294 0 9.425 0C11.427 0 13 1.70736 13 3.89646C13 6.5673 10.79 8.7564 7.4425 12.0649L6.5 13Z" fill="#515151"/>
                                </svg>
                            </LikeIcon>
                            공감+999</Like>
                        <Comment>
                            <CommentIcon>
                                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1.56891V8.74154C0 9.60772 0.734238 10.3104 1.64072 10.3104H9.03235L11.6298 13V10.3102H13.3593C14.2653 10.3102 15 9.60748 15 8.7413V1.56891C14.9998 0.702482 14.2653 0 13.3593 0H1.64072C0.734238 0 0 0.702482 0 1.56891ZM10.4483 5.15498C10.4483 4.59815 10.9203 4.14652 11.5031 4.14652C12.0858 4.14652 12.5578 4.59815 12.5578 5.15498C12.5578 5.7123 12.0858 6.16369 11.5031 6.16369C10.9203 6.16369 10.4483 5.71254 10.4483 5.15498ZM6.44514 5.15498C6.44514 4.59815 6.91763 4.14652 7.49988 4.14652C8.08212 4.14652 8.55461 4.59815 8.55461 5.15498C8.55461 5.7123 8.08212 6.16369 7.49988 6.16369C6.91763 6.16369 6.44514 5.71254 6.44514 5.15498ZM2.44221 5.15498C2.44221 4.59815 2.9147 4.14652 3.49694 4.14652C4.07968 4.14652 4.55167 4.59815 4.55167 5.15498C4.55167 5.7123 4.07968 6.16369 3.49694 6.16369C2.91445 6.16393 2.44221 5.71254 2.44221 5.15498Z" fill="black"/>
                                </svg>
                            </CommentIcon>
                            댓글 10</Comment>
                    </Icons>
                </Inform>
            </InformContainer>
        </ReviewContainer>
    );
};

export default BestReview1;
