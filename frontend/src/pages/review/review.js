import React, { useState } from 'react';
import BestReview1 from '../../components/reviewPage/BestRivew1/BestReview1';
import Blog1 from '../../components/reviewPage/Blog1/Blog1';
import { Reset } from 'styled-reset';
import {useNavigate} from "react-router-dom";
import {
    Wrapper, BookMarked1, MyMenuWrapper, ButtonContainer, Blogs,
    BookMarkContainer, MyMenuContainer, BestReiviewer, SearchBarContainer, BestReviewTitle,
    SubTitle1, SubTitleContainer, BestReviews, SubTitle2,
    MyWrites, GoWrite, BlogContainer, SearchBarWrapper, Pin, Magnifier, BestReviewContainer,
    IndicatorContainer, Indicator, SelectContainer, Select, GoTravelTitle, BlogWrapper,
    Profile, PContainer, Pname, PIntro, PImg, VirticalLine, BookMarkTitle, Search,BookMarked2
} from './reviewstyle';
import TopBarComponent from "../../components/TopBar/TopBar";
import Ramen from "../../public/Img/ramen.png";
import Sushi from "../../public/Img/sushi.png";
import Canada from "../../public/Img/canada.png"
import Paris from "../../public/Img/paris.png"
import Sydney from "../../public/Img/sydney.png"
import Osaka from "../../public/Img/osaka.png"
import Agent from "../../public/Img/forprofile/AgentProfile.png"
import Agent2 from "../../public/Img/forprofile/AgentProfile2.png"
import Agent3 from "../../public/Img/forprofile/AgentProfile3.png"
import MyProfile from "../../public/Img/forprofile/AgentProfile4.png"
import MyProfile2 from '../../public/Img/forprofile/img.png'

const BestreviewsData = [
    { title: '라멘의 모든 것', author: '김라멘', image: Ramen },
    { title: '스시의 진수', author: '이초밥', image: Sushi },
    { title: '캐나다 여행기', author: '박캐나다', image: Canada },
    { title: '파리의 낭만', author: '최파리', image: Paris },
    { title: '시드니의 매력', author: '장시드니', image: Sydney },
    { title: '오사카 탐방기', author: '윤오사카', image: Osaka },
    { title: '뉴욕의 하루', author: '김뉴욕' },
    { title: '로마의 유적지', author: '이로마' },
    { title: '런던의 역사', author: '박런던' },
    { title: '베를린의 문화', author: '최베를린' },
    { title: '도쿄의 밤', author: '장도쿄' },
    { title: '방콕의 하루', author: '윤방콕' },
    { title: '하노이의 음식', author: '김하노이' },
    { title: '싱가포르의 랜드마크', author: '이싱가포르' },
    { title: '두바이의 럭셔리', author: '박두바이' }
];

const BlogData=[
    { title: '맛있는 라멘 이야기', content: '일본 라멘의 깊은 맛과 다양한 종류에 대해 알아봅니다.', author: '김라멘', blogImg:Ramen, authorImg:Agent},
    { title: '초밥의 예술', content: '신선한 재료와 정성으로 빚어낸 초밥의 세계를 탐험해보세요.', author: '이초밥', blogImg:Sushi, authorImg:Agent2 },
    { title: '캐나다 자연 탐방기', content: '캐나다의 아름다운 자연 경관과 여행 팁을 소개합니다.', author: '박캐나다', blogImg:Canada, authorImg:Agent3},
];

export default function ReviewPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const reviewsPerPage = 3;

    const startIndex = activeIndex * reviewsPerPage;
    const visibleReviews = BestreviewsData.slice(startIndex, startIndex + reviewsPerPage);

    const [selectedCountry, setSelectedCountry] = useState("");

    const navigate = useNavigate();
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleGoWrite = ( )=>{
        navigate('/board/new')
    }

    const handleGoBoard = () =>{
        navigate('/exboard');
    }

    return (
        <>
            <Reset />
            <Wrapper>
                <div style={{height: '55px'}}></div>
                <TopBarComponent/>
                <SearchBarWrapper>
                <SearchBarContainer>
                        <Pin>
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.8348 15.725C15.7138 15.725 14.6387 15.3167 13.8461 14.59C13.0534 13.8633 12.6081 12.8777 12.6081 11.85C12.6081 10.8223 13.0534 9.83666 13.8461 9.10996C14.6387 8.38326 15.7138 7.975 16.8348 7.975C17.9558 7.975 19.0309 8.38326 19.8236 9.10996C20.6162 9.83666 21.0615 10.8223 21.0615 11.85C21.0615 12.3589 20.9522 12.8628 20.7398 13.3329C20.5274 13.803 20.2161 14.2302 19.8236 14.59C19.4311 14.9499 18.9651 15.2353 18.4523 15.43C17.9395 15.6248 17.3899 15.725 16.8348 15.725ZM16.8348 1C13.696 1 10.6858 2.14312 8.46634 4.17789C6.24688 6.21266 5 8.9724 5 11.85C5 19.9875 16.8348 32 16.8348 32C16.8348 32 28.6696 19.9875 28.6696 11.85C28.6696 8.9724 27.4228 6.21266 25.2033 4.17789C22.9838 2.14312 19.9736 1 16.8348 1Z" fill="#4E53EE"/>
                            </svg>
                        </Pin>
                        <Search></Search>
                        <Magnifier>
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.9 27L15.45 17.55C14.7 18.15 13.8375 18.625 12.8625 18.975C11.8875 19.325 10.85 19.5 9.75 19.5C7.025 19.5 4.719 18.556 2.832 16.668C0.945001 14.78 0.00100079 12.474 7.93651e-07 9.75C-0.000999206 7.026 0.943001 4.72 2.832 2.832C4.721 0.944 7.027 0 9.75 0C12.473 0 14.7795 0.944 16.6695 2.832C18.5595 4.72 19.503 7.026 19.5 9.75C19.5 10.85 19.325 11.8875 18.975 12.8625C18.625 13.8375 18.15 14.7 17.55 15.45L27 24.9L24.9 27ZM9.75 16.5C11.625 16.5 13.219 15.844 14.532 14.532C15.845 13.22 16.501 11.626 16.5 9.75C16.499 7.874 15.843 6.2805 14.532 4.9695C13.221 3.6585 11.627 3.002 9.75 3C7.873 2.998 6.2795 3.6545 4.9695 4.9695C3.6595 6.2845 3.003 7.878 3 9.75C2.997 11.622 3.6535 13.216 4.9695 14.532C6.2855 15.848 7.879 16.504 9.75 16.5Z" fill="#4E53EE"/>
                            </svg>
                        </Magnifier>
                    </SearchBarContainer>
                </SearchBarWrapper>
                <SubTitleContainer>
                    <SubTitle1>
                        <BestReviewTitle>오늘의 BEST 리뷰어 </BestReviewTitle>
                        <BestReiviewer>> 김라멘 님</BestReiviewer>
                        <IndicatorContainer>
                            {Array.from({ length: Math.ceil(BestreviewsData.length / reviewsPerPage) }).map((_, index) => (
                                <Indicator
                                    key={index}
                                    className={index === activeIndex ? 'active' : ''}
                                    onClick={() => setActiveIndex(index)}
                                />
                            ))}
                        </IndicatorContainer>
                    </SubTitle1>
                </SubTitleContainer>
                <BestReviewContainer>
                    <BestReviews onClick={handleGoBoard}>
                        {visibleReviews.map((review, index) => (
                            <BestReview1 key={index} review={review} />
                        ))}
                    </BestReviews>
                </BestReviewContainer>
                <SubTitleContainer>
                    <SubTitle2>
                        <GoTravelTitle>우리 함께 여행을 떠나요!</GoTravelTitle>
                        <SelectContainer>
                            <Select value={selectedCountry} onChange={handleCountryChange}>
                                <option value="">Select a country</option>
                                <optgroup label="America">
                                    <option value="usa">USA</option>
                                    <option value="cananda">Canada</option>
                                </optgroup>
                                <optgroup label="Europe">
                                    <option value="uk">UK</option>
                                    <option value="italy">Italy</option>
                                    <option value="france">France</option>
                                </optgroup>
                                <optgroup label="Asia">
                                    <option value="japan">Japan</option>
                                    <option value="china">China</option>
                                </optgroup>
                            </Select>
                        </SelectContainer>
                    </SubTitle2>
                </SubTitleContainer>
                <BlogWrapper>
                    <BlogContainer>
                        <Blogs>
                            {BlogData.map((blog, index) => (
                                <Blog1 key={index} review={blog} />
                            ))}
                        </Blogs>
                        <MyMenuWrapper>
                            <MyMenuContainer>
                                <Profile>
                                    <PImg src={MyProfile2}></PImg>
                                    <PContainer>
                                        <Pname>문경서</Pname>
                                        <PIntro>나는 여행을 즐기는 20대</PIntro>
                                    </PContainer>
                                </Profile>
                                <ButtonContainer>
                                    <MyWrites>나의 글</MyWrites>
                                    <VirticalLine/>
                                    <GoWrite onClick={handleGoWrite}>글쓰기</GoWrite>
                                </ButtonContainer>
                                <BookMarkContainer>
                                    <BookMarkTitle>즐겨찾기</BookMarkTitle>
                                    <BookMarked1></BookMarked1>
                                    <BookMarked2></BookMarked2>
                                </BookMarkContainer>
                            </MyMenuContainer>
                        </MyMenuWrapper>
                    </BlogContainer>
                </BlogWrapper>
            </Wrapper>
        </>
    );
}
