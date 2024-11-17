import React, {useState} from 'react';
import styled from 'styled-components';
import {SideBarHeaderWrapper} from "../chatPageStyle";

const SideBar = styled.aside`
    width: 12%;
    background-color: #4E53ED;
    border-right: 1px solid #ddd;
    overflow-y: auto;
    color: white;
    font-size: 14px;
    height: 100%;
`
const SideBarHeader = styled.div`
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const SideBarComponent = ({handleRecentChatting}) => {

    const [activeHeader, setActiveHeader] = useState(1);

    const handleHeaderClick = (headerIndex) => {
        setActiveHeader(headerIndex); // 클릭된 헤더의 인덱스 저장
    };

    return (
        <SideBar>
            <SideBarHeaderWrapper
                isActive={activeHeader === 1}
                onClick={() => {
                    handleHeaderClick(1);
                    handleRecentChatting(true);
                }}
            >
                <SideBarHeader>
                    최근 채팅
                </SideBarHeader>
            </SideBarHeaderWrapper>

            <SideBarHeaderWrapper
                isActive={activeHeader === 2}
                onClick={() => {
                    handleHeaderClick(2);
                    handleRecentChatting(false);
                }}
            >
                <SideBarHeader>
                    완료된 채팅
                </SideBarHeader>
            </SideBarHeaderWrapper>
        </SideBar>
    );
};

export default SideBarComponent;
