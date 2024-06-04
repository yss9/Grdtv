import TopBarComponent from "../../components/TopBar/TopBar";
import MyReview from "../../components/MyPageDetail/MyReview";
import MyReservation from "../../components/MyPageDetail/MyReservation";
import {Reset} from "styled-reset";
import {
    GloplerSettingBtn, Introduce, IntroduceWrapper,
    Mbti, MyPageDetailContainer, MyProfileContainer, NameWrapper, PointSettingBtn,
    ProfileImg, ProfileSettingBtn, SettingContainer, SettingWrapper, Content,
    Container, Highlight, SelectorContainer, SelectorItem, SelectorWrapper,
    SelectorItem2, Highlight2, SelectorWrapper2
} from './mypagestyle'
import React, {useEffect, useState} from "react";
export default function Mypage() {

    const [activeItem, setActiveItem] = useState('Left');
    const [highlightPosition, setHighlightPosition] = useState({left: 0, width: 0});

    useEffect(() => {
        const selectedElement = document.querySelector(`div[data-item="${activeItem}"]`);
        if (selectedElement) {
            const left = selectedElement.offsetLeft;
            const width = selectedElement.offsetWidth;
            setHighlightPosition({left, width});
        }
    }, [activeItem]);

    function selectItem(event) {
        const target = event.target;
        const item = target.dataset.item;

        if (item === '진행 목록' || item === 'Righ') {
            setActiveItem('Righ');
        } else if (item === '게시물 확인' || item === 'Left') {
            setActiveItem('Left');
        }
    }

    const ActiveTextStyle = {
        color: 'gray' // 원하는 색상으로 변경
    };

    const InactiveTextStyle = {
        color: '#efefef' // 기본 색상으로 변경
    };

    return (
            <>
                <Reset/>
                <TopBarComponent/>
                <MyProfileContainer>
                    <ProfileImg></ProfileImg>
                    <NameWrapper>이름</NameWrapper>
                    <IntroduceWrapper>
                        <Mbti>MBTI</Mbti>
                        <Introduce>간단 소개글 간단 소개글</Introduce>
                    </IntroduceWrapper>
                </MyProfileContainer>
                <SettingWrapper>
                    <SettingContainer>
                        <ProfileSettingBtn>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_497_850)">
                                    <path
                                        d="M7.3 20L6.9 16.8C6.68 16.72 6.48 16.62 6.29 16.5C6.1 16.38 5.91 16.26 5.73 16.12L2.75 17.37L0 12.63L2.58 10.68C2.56 10.56 2.55 10.45 2.55 10.34V9.66C2.55 9.55 2.55 9.44 2.58 9.32L0 7.37L2.75 2.63L5.73 3.88C5.91 3.75 6.11 3.62 6.31 3.5C6.51 3.38 6.71 3.28 6.91 3.2L7.31 0H12.81L13.21 3.2C13.43 3.28 13.63 3.38 13.82 3.5C14.01 3.62 14.2 3.74 14.38 3.88L17.36 2.63L20.11 7.38L17.53 9.33C17.55 9.45 17.56 9.56 17.56 9.67V10.35C17.56 10.46 17.54 10.57 17.51 10.69L20.09 12.64L17.34 17.39L14.39 16.14C14.21 16.27 14.01 16.4 13.81 16.52C13.61 16.64 13.41 16.74 13.21 16.82L12.81 20.02H7.31L7.3 20ZM9.05 18H11.03L11.38 15.35C11.9 15.22 12.38 15.02 12.82 14.76C13.26 14.5 13.67 14.19 14.03 13.82L16.51 14.85L17.49 13.15L15.34 11.52C15.42 11.29 15.48 11.04 15.52 10.78C15.56 10.52 15.57 10.26 15.57 9.99C15.57 9.72 15.55 9.46 15.52 9.2C15.49 8.94 15.43 8.7 15.34 8.46L17.49 6.83L16.51 5.13L14.03 6.18C13.66 5.8 13.26 5.48 12.82 5.22C12.38 4.96 11.9 4.77 11.38 4.63L11.05 1.98H9.07L8.72 4.63C8.2 4.76 7.72 4.96 7.28 5.22C6.84 5.48 6.43 5.79 6.07 6.16L3.59 5.13L2.61 6.83L4.76 8.43C4.68 8.68 4.62 8.93 4.58 9.18C4.54 9.43 4.53 9.7 4.53 9.98C4.53 10.25 4.55 10.51 4.58 10.76C4.61 11.01 4.67 11.26 4.76 11.51L2.61 13.14L3.59 14.84L6.07 13.79C6.44 14.17 6.84 14.49 7.28 14.75C7.72 15.01 8.2 15.2 8.72 15.34L9.05 17.99V18ZM10.1 13.5C11.07 13.5 11.89 13.16 12.58 12.47C13.27 11.78 13.61 10.96 13.61 9.99C13.61 9.02 13.27 8.2 12.58 7.51C11.89 6.82 11.07 6.48 10.1 6.48C9.13 6.48 8.29 6.82 7.61 7.51C6.93 8.2 6.6 9.02 6.6 9.99C6.6 10.96 6.94 11.78 7.61 12.47C8.28 13.16 9.11 13.5 10.1 13.5Z"
                                        fill="#5F6368"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_497_850">
                                        <rect width="20.1" height="20" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <p>프로필 관리</p>
                        </ProfileSettingBtn>
                        <GloplerSettingBtn>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_497_853)">
                                    <path
                                        d="M8 7.99998C6.9 7.99998 5.96 7.60998 5.17 6.81998C4.39 6.03998 3.99 5.08998 3.99 3.98998C3.99 2.88998 4.38 1.94998 5.17 1.15998C5.96 0.36998 6.9 -0.0200195 8 -0.0200195C9.1 -0.0200195 10.04 0.36998 10.83 1.15998C11.62 1.94998 12.01 2.88998 12.01 3.98998C12.01 5.08998 11.62 6.02998 10.83 6.81998C10.05 7.59998 9.1 7.99998 8 7.99998ZM0 16V13.2C0 12.63 0.15 12.11 0.44 11.64C0.73 11.17 1.12 10.8 1.6 10.55C2.63 10.03 3.68 9.64998 4.75 9.38998C5.82 9.12998 6.9 8.99998 8 8.99998C9.1 8.99998 10.18 9.12998 11.25 9.38998C12.32 9.64998 13.37 10.04 14.4 10.55C14.88 10.8 15.27 11.16 15.56 11.64C15.85 12.12 16 12.64 16 13.2V16H0ZM2 14H14V13.2C14 13.02 13.95 12.85 13.86 12.7C13.77 12.55 13.65 12.43 13.5 12.35C12.6 11.9 11.69 11.56 10.77 11.34C9.85 11.12 8.93 11 7.99 11C7.05 11 6.13 11.11 5.21 11.34C4.29 11.57 3.38 11.9 2.48 12.35C2.33 12.43 2.21 12.55 2.12 12.7C2.03 12.85 1.98 13.02 1.98 13.2V14H2ZM8 5.99998C8.55 5.99998 9.02 5.79998 9.41 5.40998C9.8 5.01998 10 4.54998 10 3.99998C10 3.44998 9.8 2.97998 9.41 2.58998C9.02 2.19998 8.55 1.99998 8 1.99998C7.45 1.99998 6.98 2.19998 6.59 2.58998C6.2 2.97998 6 3.44998 6 3.99998C6 4.54998 6.2 5.01998 6.59 5.40998C6.98 5.79998 7.45 5.99998 8 5.99998Z"
                                        fill="#5F6368"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_497_853">
                                        <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <p>글로플러 설정</p>
                        </GloplerSettingBtn>
                        <PointSettingBtn>
                            <svg width="28" height="28" viewBox="0 0 30 30" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_497_846)">
                                    <path
                                        d="M18.5002 14C18.9202 14 19.2702 13.85 19.5602 13.56C19.8502 13.27 20.0002 12.91 20.0002 12.5C20.0002 12.09 19.8502 11.73 19.5602 11.44C19.2702 11.15 18.9102 11 18.5002 11C18.0902 11 17.7302 11.15 17.4402 11.44C17.1502 11.73 17.0002 12.09 17.0002 12.5C17.0002 12.91 17.1502 13.27 17.4402 13.56C17.7302 13.85 18.0902 14 18.5002 14ZM11.5002 14C11.9202 14 12.2702 13.85 12.5602 13.56C12.8502 13.27 13.0002 12.91 13.0002 12.5C13.0002 12.09 12.8502 11.73 12.5602 11.44C12.2702 11.15 11.9102 11 11.5002 11C11.0902 11 10.7302 11.15 10.4402 11.44C10.1502 11.73 10.0002 12.09 10.0002 12.5C10.0002 12.91 10.1502 13.27 10.4402 13.56C10.7302 13.85 11.0902 14 11.5002 14ZM15.0002 20.5C16.1302 20.5 17.1602 20.18 18.0902 19.54C19.0202 18.9 19.6902 18.05 20.1002 17H18.4502C18.0802 17.62 17.6002 18.1 16.9902 18.46C16.3802 18.82 15.7202 19 15.0002 19C14.2802 19 13.6202 18.82 13.0102 18.46C12.4002 18.1 11.9102 17.61 11.5502 17H9.90023C10.3202 18.05 10.9902 18.9 11.9102 19.54C12.8302 20.18 13.8602 20.5 15.0002 20.5ZM15.0002 25C13.6202 25 12.3202 24.74 11.1002 24.21C9.88023 23.68 8.82023 22.97 7.92023 22.07C7.02023 21.17 6.31023 20.11 5.78023 18.89C5.25023 17.67 4.99023 16.37 4.99023 14.99C4.99023 13.61 5.25023 12.31 5.78023 11.09C6.31023 9.86998 7.02023 8.80998 7.92023 7.90998C8.82023 7.00998 9.88023 6.29998 11.1002 5.76998C12.3202 5.23998 13.6202 4.97998 15.0002 4.97998C16.3802 4.97998 17.6802 5.23998 18.9002 5.76998C20.1202 6.29998 21.1802 7.00998 22.0802 7.90998C22.9802 8.80998 23.6902 9.86998 24.2202 11.09C24.7502 12.31 25.0102 13.61 25.0102 14.99C25.0102 16.37 24.7502 17.67 24.2202 18.89C23.6902 20.11 22.9802 21.17 22.0802 22.07C21.1802 22.97 20.1202 23.68 18.9002 24.21C17.6802 24.74 16.3802 25 15.0002 25ZM15.0002 23C17.2302 23 19.1302 22.22 20.6802 20.67C22.2302 19.12 23.0102 17.23 23.0102 14.99C23.0102 12.75 22.2302 10.86 20.6802 9.30998C19.1302 7.75998 17.2402 6.97998 15.0002 6.97998C12.7602 6.97998 10.8702 7.75998 9.32023 9.30998C7.77023 10.86 6.99023 12.75 6.99023 14.99C6.99023 17.23 7.77023 19.12 9.32023 20.67C10.8702 22.22 12.7602 23 15.0002 23Z"
                                        fill="#5F6368"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_497_846">
                                        <rect width="20" height="20" fill="white" transform="translate(5 5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <p>포인트 관리</p>
                        </PointSettingBtn>
                    </SettingContainer>
                </SettingWrapper>
                <MyPageDetailContainer>
                    <Container>
                        <SelectorContainer>
                            <SelectorWrapper2>
                                <Highlight2/>
                                <SelectorItem2
                                    data-item="Left"
                                    onClick={selectItem}
                                    style={activeItem === 'Left' ? ActiveTextStyle : InactiveTextStyle}
                                >
                                    게시물 확인
                                </SelectorItem2>
                                <SelectorItem2
                                    data-item="Righ"
                                    onClick={selectItem}
                                    style={activeItem === 'Righ' ? ActiveTextStyle : InactiveTextStyle}
                                >
                                    진행 목록
                                </SelectorItem2>

                            </SelectorWrapper2>
                        </SelectorContainer>
                        <SelectorContainer>
                            <SelectorWrapper>
                                <Highlight left={highlightPosition.left} width={highlightPosition.width}/>
                                <SelectorItem active={activeItem === 'Left'} data-item="Left"
                                              onClick={selectItem}>Left</SelectorItem>
                                <SelectorItem active={activeItem === 'Righ'} data-item="Righ"
                                              onClick={selectItem}>Righ</SelectorItem>
                            </SelectorWrapper>
                        </SelectorContainer>
                        <Content>
                            {activeItem === 'Left' && <MyReview/>}
                            {activeItem === 'Righ' && <MyReservation/>}
                        </Content>
                    </Container>
                </MyPageDetailContainer>
            </>
        )
}
