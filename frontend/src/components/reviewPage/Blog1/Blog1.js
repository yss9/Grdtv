import React from 'react';
import styled from 'styled-components';

const BlogContainer=styled.div`
  height: 18rem;
  background-color: white;
  margin-bottom: 40px;
  border-radius: 15px;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
`
const ContentWrapper = styled.div`
  width: 62%;
  height: 100%;
  //background-color: #61dafb;
  border-radius: 15px 0 0 15px;
  // 스타일 정의
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Content=styled.div`
    width: 92%;
  height: 90%;
  //background-color: palevioletred;
`
const Profile=styled.div`
 width: 60%;
 height: 30%;
 //background-color: green;
  display: flex;
  align-items: center;
`;
const PImg=styled.img`
    width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #7d7d7d;
    object-fit: cover; /* 이미지를 가득 채우도록 설정 */

`;
const PContainer=styled.div`
    display: flex;
  flex-direction: column;
  width: 27vh;
  height: 100%;
  margin-left: 10px;
`;
const Pname=styled.div`
    width: 100%;
  height: 55%;
  //background-color: orchid;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #515151;
`;
const Pdate=styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  color: #9d9d9d;
`;
const Read=styled.div`
    width: 100%;
  height: 70%;
 // background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
`;
const ReadTitle=styled.div`
    width: 100%;
  height: 20%;
  //background-color: coral;
  font-size: 23px;
  color: #515151;
`
const ReadContent=styled.div`
    width: 100%;
  height: 62%;
 // background-color: #b4b4b4;
  font-size: 17px;
  padding: 7px;
  color: #515151;
`
const Icons=styled.div`
    width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
`
const Like =styled.div`
  color: #515151;
  font-size: 13px;
  display: flex;
`
const LikeIcon =styled.div`
 width: 2vh;
  height: 2vh;
 // background-color: #b4b4b4;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Comment=styled.div`
  color: #515151;
  font-size: 13px;
  display: flex;
  margin-left: 10px;
`
const CommentIcon =styled.div`
 width: 2vh;
  height: 2vh;
 // background-color: #b4b4b4;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BPicWrapper=styled.div`
 width: 30%;
 height: 100%;
 //background-color: palegoldenrod;
 border-radius: 0 15px 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BPic=styled.img`
    width: 12.5rem;
  height: 14.5rem;
  background-color: #8e8e8e;
  border: none;
  border-radius: 5px;
    object-fit: cover; /* 이미지를 가득 채우도록 설정 */
`;


const Blog1 = ({ review }) => {
    return (
        <>
            <BlogContainer>
                <ContentWrapper>
                    <Content>
                        <Profile>
                            <PImg src={review.authorImg}></PImg>
                            <PContainer>
                                <Pname>{review.author}</Pname>
                                <Pdate>2024</Pdate>
                            </PContainer>
                        </Profile>
                        <Read>
                            <ReadTitle>{review.title}</ReadTitle>
                            <ReadContent>{review.content}</ReadContent>
                            <Icons>
                                <Like>
                                    <LikeIcon>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 14L6.5575 13.0649C3.21 9.7564 1 7.5673 1 4.89646C1 2.70736 2.573 1 4.575 1C5.706 1 6.7915 1.57384 7.5 2.47357C8.2085 1.57384 9.294 1 10.425 1C12.427 1 14 2.70736 14 4.89646C14 7.5673 11.79 9.7564 8.4425 13.0649L7.5 14Z" fill="#DD3F3F"/>
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
                        </Read>
                    </Content>
                </ContentWrapper>
                <BPicWrapper>
                    <BPic src={review.blogImg}></BPic>
                </BPicWrapper>
            </BlogContainer>
        </>
    );
};

export default Blog1;
