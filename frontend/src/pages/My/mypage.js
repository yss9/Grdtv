    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import Cookies from "js-cookie";
    import {jwtDecode} from "jwt-decode";
    import TopBarComponent from "../../components/TopBar/TopBar";
    import MyReview from "../../components/MyPageDetail/MyReview";
    import MyReservation from "../../components/MyPageDetail/MyReservation";
    import MyProfile2 from '../../public/Img/forprofile/img.png'; // 임시 이미지
    import { Reset } from "styled-reset";
    
    import {
        GloplerSettingBtn, Introduce, IntroduceWrapper,
        Mbti, MyPageDetailContainer, MyProfileContainer, NameWrapper, PointSettingBtn,
        ProfileImg, ProfileSettingBtn, SettingContainer, SettingWrapper, Content,
        Container, Highlight, SelectorContainer, SelectorItem, SelectorWrapper,
        SelectorItem2, Highlight2, SelectorWrapper2
    } from './mypagestyle';
    
    // 사용자 인증 토큰을 가져오는 함수
    const getAuthToken = () => {
        return Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기
    };
    
    const Mypage = () => {
        const [activeItem, setActiveItem] = useState('Left');
        const [highlightPosition, setHighlightPosition] = useState({ left: 0, width: 0 });
        const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태
        const token = getAuthToken(); // JWT 토큰 가져오기
    
        useEffect(() => {
            const selectedElement = document.querySelector(`div[data-item="${activeItem}"]`);
            if (selectedElement) {
                const left = selectedElement.offsetLeft;
                const width = selectedElement.offsetWidth;
                setHighlightPosition({ left, width });
            }
        }, [activeItem]);
    
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    if (token) {
                        // 토큰에서 사용자 아이디 추출
                        const decodedToken = jwtDecode(token);
                        const userId = decodedToken.userId; // userId 필드가 있는지 확인하고 사용
    
                        const response = await axios.get(`http://localhost:8080/api/users/my-info?userId=${userId}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        setUserData(response.data);
                    } else {
                        console.error('No JWT token found in cookies');
                    }
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                }
            };
    
            fetchUserData();
        }, [token]);
    
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
                <Reset />
                <div style={{ height: '55px' }}></div>
                <TopBarComponent />
                {userData && (
                    <MyProfileContainer>
                        <ProfileImg
                            src={userData.profilePicture
                                ? `http://localhost:8080/${userData.profilePicture.replace('static/', '')}`
                                : MyProfile2}
                            alt="프로필 이미지"
                        />
                        <NameWrapper>{userData.nickname}</NameWrapper>
                        <IntroduceWrapper>
                            <Mbti>{userData.mbti}</Mbti>
                            <Introduce>{userData.introduce}</Introduce>
                        </IntroduceWrapper>
                    </MyProfileContainer>
                )}
                <SettingWrapper>
                    <SettingContainer>
                        <ProfileSettingBtn>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* SVG Path */}
                            </svg>
                            <p>프로필 관리</p>
                        </ProfileSettingBtn>
                        <GloplerSettingBtn>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* SVG Path */}
                            </svg>
                            <p>글로플러 설정</p>
                        </GloplerSettingBtn>
                        <PointSettingBtn>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* SVG Path */}
                            </svg>
                            <p>포인트 관리</p>
                        </PointSettingBtn>
                    </SettingContainer>
                </SettingWrapper>
                <MyPageDetailContainer>
                    <Container>
                        <SelectorContainer>
                            <SelectorWrapper2>
                                <Highlight2 />
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
                                <Highlight left={highlightPosition.left} width={highlightPosition.width} />
                                <SelectorItem active={activeItem === 'Left'} data-item="Left"
                                              onClick={selectItem}>Left</SelectorItem>
                                <SelectorItem active={activeItem === 'Righ'} data-item="Righ"
                                              onClick={selectItem}>Righ</SelectorItem>
                            </SelectorWrapper>
                        </SelectorContainer>
                        <Content>
                            {activeItem === 'Left' && <MyReview />}
                            {activeItem === 'Righ' && <MyReservation />}
                        </Content>
                    </Container>
                </MyPageDetailContainer>
            </>
        );
    };
    
    export default Mypage;
