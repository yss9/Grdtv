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
    Profile, PContainer, Pname, PIntro, PImg, VirticalLine, BookMarkTitle
} from './reviewstyle';
import TopBarComponent from "../../components/TopBar/TopBar";

const BestreviewsData = [
    { title: 'Review 1', author: 'Author 1' },
    { title: 'Review 2', author: 'Author 2' },
    { title: 'Review 3', author: 'Author 3' },
    { title: 'Review 4', author: 'Author 4' },
    { title: 'Review 5', author: 'Author 5' },
    { title: 'Review 6', author: 'Author 6' },
    { title: 'Review 7', author: 'Author 7' },
    { title: 'Review 8', author: 'Author 8' },
    { title: 'Review 9', author: 'Author 9' },
    { title: 'Review 10',author: 'Author 10' },
    { title: 'Review 11',author: 'Author 11' },
    { title: 'Review 12',author: 'Author 12' },
    { title: 'Review 13',author: 'Author 13' },
    { title: 'Review 14',author: 'Author 14' },
    { title: 'Review 15',author: 'Author 15' },
];

const BlogData=[
    { title: 'Review 1', content: 'This is the first blog', author: 'Author 1' },
    { title: 'Review 2', content: 'This is the second blog', author: 'Author 2' },
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

    const handleGoWrite = (e)=>{
        navigate('/review/write')
    }


    return (
        <>
            <Reset />
            <Wrapper>
                <TopBarComponent />
                <SearchBarWrapper>
                    <SearchBarContainer>
                        <Pin>
                            <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.8348 14.725C10.7138 14.725 9.63874 14.3167 8.84608 13.59C8.05341 12.8633 7.6081 11.8777 7.6081 10.85C7.6081 9.82229 8.05341 8.83666 8.84608 8.10996C9.63874 7.38326 10.7138 6.975 11.8348 6.975C12.9558 6.975 14.0309 7.38326 14.8236 8.10996C15.6162 8.83666 16.0615 9.82229 16.0615 10.85C16.0615 11.3589 15.9522 11.8628 15.7398 12.3329C15.5274 12.803 15.2161 13.2302 14.8236 13.59C14.4311 13.9499 13.9651 14.2353 13.4523 14.43C12.9395 14.6248 12.3899 14.725 11.8348 14.725ZM11.8348 0C8.69603 0 5.6858 1.14312 3.46634 3.17789C1.24688 5.21266 0 7.9724 0 10.85C0 18.9875 11.8348 31 11.8348 31C11.8348 31 23.6696 18.9875 23.6696 10.85C23.6696 7.9724 22.4228 5.21266 20.2033 3.17789C17.9838 1.14312 14.9736 0 11.8348 0Z" fill="#D9D9D9"/>
                            </svg>
                        </Pin>
                        <Magnifier>
                            <svg width="37" height="35" viewBox="-3 -5 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.7352 35L20.9321 22.75C19.916 23.5278 18.7474 24.1435 17.4265 24.5972C16.1055 25.0509 14.6999 25.2778 13.2096 25.2778C9.51767 25.2778 6.39343 24.0541 3.83687 21.6067C1.28031 19.1593 0.0013559 16.17 1.07526e-06 12.6389C-0.00135375 9.10778 1.2776 6.11852 3.83687 3.67111C6.39614 1.2237 9.52038 0 13.2096 0C16.8988 0 20.0237 1.2237 22.5843 3.67111C25.1449 6.11852 26.4232 9.10778 26.4191 12.6389C26.4191 14.0648 26.1821 15.4097 25.7079 16.6736C25.2337 17.9375 24.5901 19.0556 23.7772 20.0278L36.5804 32.2778L33.7352 35ZM13.2096 21.3889C15.7499 21.3889 17.9095 20.5385 19.6884 18.8378C21.4673 17.137 22.356 15.0707 22.3547 12.6389C22.3533 10.207 21.4645 8.14139 19.6884 6.44194C17.9122 4.7425 15.7526 3.89148 13.2096 3.88889C10.6666 3.8863 8.50764 4.73732 6.73282 6.44194C4.95799 8.14657 4.06855 10.2122 4.06449 12.6389C4.06042 15.0656 4.94987 17.1319 6.73282 18.8378C8.51577 20.5437 10.6747 21.3941 13.2096 21.3889Z" fill="#D9D9D9"/>
                            </svg>
                        </Magnifier>
                    </SearchBarContainer>
                </SearchBarWrapper>
                <SubTitleContainer>
                    <SubTitle1>
                        <BestReviewTitle>오늘의 BEST 리뷰어 </BestReviewTitle>
                        <BestReiviewer>> 누구누구</BestReiviewer>
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
                    <BestReviews>
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
                                    <PImg></PImg>
                                    <PContainer>
                                        <Pname>사용자 이름</Pname>
                                        <PIntro>사용자 자기소개</PIntro>
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
                                    <BookMarked1></BookMarked1>
                                </BookMarkContainer>
                            </MyMenuContainer>
                        </MyMenuWrapper>
                    </BlogContainer>
                </BlogWrapper>
            </Wrapper>
        </>
    );
}
