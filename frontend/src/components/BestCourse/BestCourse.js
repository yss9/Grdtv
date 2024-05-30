import React from 'react';
import styled from 'styled-components';

const BlogContainer=styled.div`
  width: 23.5%;
  height: 40vh;
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
