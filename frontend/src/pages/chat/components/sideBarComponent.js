import React from 'react';
import styled from 'styled-components';

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
`

const SideBarComponent = () => {
    return (

        <SideBar>
            <div style={{ width: '100%', height: '45px', backgroundColor: "rgba(255, 255, 255, 0.6)", margin: '20px 0 20px 0', color: 'black' }}>
                <SideBarHeader>
                        최근 채팅
                </SideBarHeader>
            </div>
            <div>
                <SideBarHeader style={{ display: "flex", justifyContent: "center", margin: '0 0 10px 0' }}>
                        완료된 채팅
                </SideBarHeader>
            </div>
            <br />
            <hr style={{ margin: '0 7px' }} />
            <br />
            <div style={{ display: "flex", justifyContent: "center", margin: '10px 0 0 0' }}>
                도쿄 예약 대행<br /><br /><br />○○ 예약 대행
            </div>
        </SideBar>
    );
};

export default SideBarComponent;
