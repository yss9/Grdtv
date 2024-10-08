import React, { useState } from 'react';
import BestReview1 from '../../components/reviewPage/BestRivew1/BestReview1';
import Blog1 from '../../components/reviewPage/Blog1/Blog1';
import { Reset } from 'styled-reset';
import {useNavigate} from "react-router-dom";
import {
    Wrapper, BookMarked1, MyMenuWrapper, ButtonContainer, Blogs,
    BookMarkContainer, MyMenuContainer, BestReiviewer, SearchBarContainer, BestReviewTitle,
    SubTitle1, SubTitleContainer, BestReviews, SubTitle2, AutoCompleteList,
    MyWrites, GoWrite, BlogContainer, SearchBarWrapper, Pin, Magnifier, BestReviewContainer,
    IndicatorContainer, Indicator, SelectContainer, Select, GoTravelTitle, BlogWrapper,
    Profile, PContainer, Pname, PIntro, PImg, VirticalLine, BookMarkTitle, Search, BookMarked2, AutoCompleteListWrapper
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

const regionList = [
    "프랑스", "파리", "포르투갈", "리스본", "영국", "런던", "이탈리아", "로마", "피렌체", "베니스", "독일", "베를린",
    "스페인", "바르셀로나", "마드리드", "그리스", "아테네", "미국", "뉴욕", "로스앤젤레스", "샌프란시스코", "마이애미",
    "캐나다", "토론토", "밴쿠버", "멕시코", "칸쿤", "브라질", "리우데자네이루", "아르헨티나", "부에노스아이레스",
    "칠레", "산티아고", "일본", "도쿄", "오사카", "교토", "중국", "베이징", "상하이", "홍콩", "대한민국", "서울", "부산",
    "호주", "시드니", "멜버른", "뉴질랜드", "오클랜드", "남아프리카공화국", "케이프타운", "이집트", "카이로",
    "터키", "이스탄불", "러시아", "모스크바", "상트페테르부르크", "인도", "델리", "뭄바이", "태국", "방콕", "푸켓",
    "싱가포르", "베트남", "하노이", "호찌민", "말레이시아", "쿠알라룸푸르", "인도네시아", "발리", "필리핀", "마닐라",
    "두바이", "아부다비", "몰디브", "피지", "스리랑카", "콜롬보", "모로코", "마라케시", "페루", "마추픽추", "칠레",
    "이탈리아", "피렌체", "베네치아", "스위스", "취리히", "루체른", "오스트리아", "빈", "체코", "프라하",
    "헝가리", "부다페스트", "네덜란드", "암스테르담", "벨기에", "브뤼셀", "아이슬란드", "레이캬비크", "노르웨이", "오슬로",
    "핀란드", "헬싱키", "스웨덴", "스톡홀름", "덴마크", "코펜하겐", "폴란드", "바르샤바", "크로아티아", "두브로브니크",
    "슬로베니아", "류블랴나", "루마니아", "부쿠레슈티", "불가리아", "소피아"
];

export default function ReviewPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");  // 여기서 상태 정의
    const [filteredRegions, setFilteredRegions] = useState([]);
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

    const choSeong = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];

// 한글 음절을 초성으로 변환하는 함수
    const getChoSeong = (text) => {
        return text.split('').map(char => {
            const code = char.charCodeAt(0) - 44032; // 한글 유니코드 범위 시작: 44032
            if (code >= 0 && code <= 11171) { // 한글 음절 범위 내에 있을 때
                const cho = Math.floor(code / 588); // 초성 추출
                return choSeong[cho];
            }
            return char; // 한글이 아닌 문자는 그대로 반환
        }).join('');
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query !== "") {
            const filtered = regionList.filter(region => {
                // 초성 검색을 위해 입력값과 대상 문자열 모두 초성으로 변환
                const choSeongQuery = getChoSeong(query);
                const choSeongRegion = getChoSeong(region);

                // 1. 입력값이 한글 자음만 있는 경우 초성 검색을 수행
                if (choSeongQuery === query) {
                    return choSeongRegion.includes(choSeongQuery);
                }

                // 2. 그렇지 않으면, 완전한 단어 검색 수행
                return region.toLowerCase().includes(query.toLowerCase());
            });
            setFilteredRegions(filtered);
        } else {
            setFilteredRegions([]);
        }
    };


    const handleSelectRegion = (region) => {
        setSearchQuery(region);
        setFilteredRegions([]);
    };

    return (
        <>
            <Reset />
            <Wrapper>
                <div style={{height: '55px'}}></div>
                <TopBarComponent/>
                <SearchBarWrapper>
                <SearchBarContainer hasAutoComplete={filteredRegions.length > 0}>
                        <Pin>
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.8348 15.725C15.7138 15.725 14.6387 15.3167 13.8461 14.59C13.0534 13.8633 12.6081 12.8777 12.6081 11.85C12.6081 10.8223 13.0534 9.83666 13.8461 9.10996C14.6387 8.38326 15.7138 7.975 16.8348 7.975C17.9558 7.975 19.0309 8.38326 19.8236 9.10996C20.6162 9.83666 21.0615 10.8223 21.0615 11.85C21.0615 12.3589 20.9522 12.8628 20.7398 13.3329C20.5274 13.803 20.2161 14.2302 19.8236 14.59C19.4311 14.9499 18.9651 15.2353 18.4523 15.43C17.9395 15.6248 17.3899 15.725 16.8348 15.725ZM16.8348 1C13.696 1 10.6858 2.14312 8.46634 4.17789C6.24688 6.21266 5 8.9724 5 11.85C5 19.9875 16.8348 32 16.8348 32C16.8348 32 28.6696 19.9875 28.6696 11.85C28.6696 8.9724 27.4228 6.21266 25.2033 4.17789C22.9838 2.14312 19.9736 1 16.8348 1Z" fill="#4E53EE"/>
                            </svg>
                        </Pin>
                    <Search
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="지역을 입력하세요"
                    />
                        <Magnifier>
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.9 27L15.45 17.55C14.7 18.15 13.8375 18.625 12.8625 18.975C11.8875 19.325 10.85 19.5 9.75 19.5C7.025 19.5 4.719 18.556 2.832 16.668C0.945001 14.78 0.00100079 12.474 7.93651e-07 9.75C-0.000999206 7.026 0.943001 4.72 2.832 2.832C4.721 0.944 7.027 0 9.75 0C12.473 0 14.7795 0.944 16.6695 2.832C18.5595 4.72 19.503 7.026 19.5 9.75C19.5 10.85 19.325 11.8875 18.975 12.8625C18.625 13.8375 18.15 14.7 17.55 15.45L27 24.9L24.9 27ZM9.75 16.5C11.625 16.5 13.219 15.844 14.532 14.532C15.845 13.22 16.501 11.626 16.5 9.75C16.499 7.874 15.843 6.2805 14.532 4.9695C13.221 3.6585 11.627 3.002 9.75 3C7.873 2.998 6.2795 3.6545 4.9695 4.9695C3.6595 6.2845 3.003 7.878 3 9.75C2.997 11.622 3.6535 13.216 4.9695 14.532C6.2855 15.848 7.879 16.504 9.75 16.5Z" fill="#4E53EE"/>
                            </svg>
                        </Magnifier>
                    </SearchBarContainer>
                </SearchBarWrapper>
                <AutoCompleteListWrapper>
                    {filteredRegions.length > 0 && (
                        <AutoCompleteList>
                            {filteredRegions.map((region, index) => (
                                <li key={index} onClick={() => handleSelectRegion(region)}>
                                    {region}
                                </li>
                            ))}
                        </AutoCompleteList>
                    )}
                </AutoCompleteListWrapper>
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
