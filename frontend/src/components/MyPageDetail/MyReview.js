import React, { useState } from 'react';
import styled from 'styled-components';
import Myreviewcomponent from "./myreviewcomponent/myreviewcomponent";
import Mytagcomponent from "./myreviewcomponent/mytagcomponent";

const SelectTitle = styled.div`
  width: 82rem;
  height: 2.5em;
  background-color: white;
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  background-color: ${props => (props.active ? '#000000' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const ReviewWrapper = styled.div`
  padding: 1em;
  display: flex;
  justify-content: center;
`;

const Review = styled.div`
  margin-top: 1em;
  width: 80%;
`;
const Review2 = styled.div`
  margin-top: 1em;
  width: 96%;
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
                        <Myreviewcomponent/>
                    </Review>
                ) : (
                    <Review2>
                        <Mytagcomponent/>
                    </Review2>
                )}
            </ReviewWrapper>
        </>
    );
}
