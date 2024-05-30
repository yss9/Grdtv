import React from 'react';
import styled from 'styled-components';

const BlogContainer=styled.div`
  width: 30%;
  height: 38vh;
  background-color: #d9d9d9;
  margin-bottom: 40px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
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
const Content=styled.div`
    width: 92%;
  height: 90%;
  //background-color: palevioletred;
`
const Profile=styled.div`
 width: 100%;
 height: 45%;
 //background-color: green;
  display: flex;
  align-items: center;
`;
const PImg=styled.img`
    width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #7d7d7d;
`;
const PContainer=styled.div`
    display: flex;
  flex-direction: column;
  width: 11vh;
  height: 100%;
  margin-left: 10px;
`;
const Pname=styled.div`
    width: 100%;
  height: 55%;
  //background-color: orchid;
  display: flex;
  align-items: center;
  font-size: 19px;
  color: #515151;
`;

const Read=styled.div`
    width: 100%;
  height: 40%;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const ReadTitle=styled.div`
    width: 100%;
  height: 20%;
  font-size: 18px;
  color: #515151;
`

const Blog1 = ({ review }) => {
    return (
        <>
            <BlogContainer>
                <ContentWrapper>
                    <Content>
                        <Profile>
                            <PImg></PImg>
                            <PContainer>
                                <Pname>{review.author}</Pname>
                            </PContainer>
                        </Profile>
                        <Read>
                            <ReadTitle>{review.title}</ReadTitle>
                        </Read>
                    </Content>
                </ContentWrapper>
            </BlogContainer>
        </>
    );
};

export default Blog1;
