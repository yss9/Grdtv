import React, { useState } from 'react';
import styled from 'styled-components';

const SelectTitle = styled.div`
  width: 82rem;
  height: 2.5em;
  background-color: white;
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  background-color: ${props => (props.active ? '#d9d9d9' : 'white')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ReviewWrapper = styled.div`
  padding: 1em;
`;

const Review = styled.div`
  margin-top: 1em;
`;

export default function MyReview() {
    const [activeTab, setActiveTab] = useState('myWrite');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <SelectTitle>
                <Tab active={activeTab === 'myWrite'} onClick={() => handleTabClick('myWrite')}>
                    작성한 리뷰
                </Tab>
                <Tab active={activeTab === 'joayo'} onClick={() => handleTabClick('joayo')}>
                    좋아요 한 게시물
                </Tab>
            </SelectTitle>
            <ReviewWrapper>
                {activeTab === 'myWrite' ? (
                    <Review>
                        <p>작성한 리뷰 내용</p>
                    </Review>
                ) : (
                    <Review>
                        <p>좋아요 한 게시물 내용</p>
                    </Review>
                )}
            </ReviewWrapper>
        </>
    );
}
