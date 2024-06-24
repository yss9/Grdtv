import React, { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';
import TopBarComponent from '../../../components/TopBar/TopBar';
import {
    ConsentContainer, Container, DetailInfoWrapper,
    PlaceImg, PlaceName, Wrapper, RightWrapper,
    DetailInfoTitle, DetailInfo, ReviewContainer,
    BtnContainer, BtnTitle, FindRouteBtn,
    RecomendationBtn, ReviewTitle, PlaceReviews,
    PlaceReivewContainer, GaugeBar, GaugeBarWrapper
} from "./informationstyle";
import PlaceReivew from "../../../components/PlaceReview/placeReview";
import {useNavigate, useParams} from 'react-router-dom';
import Osaka from '../../../public/Img/osaka.png';
import Paris from '../../../public/Img/paris.png';
import Sydney from '../../../public/Img/sydney.png';
import Kyoto from "../../../public/Img/kyoto.png";
import ApelTower from "../../../public/Img/apeltower.png";
import ThaiMarket from "../../../public/Img/thaimarket.png";
import Morein from "../../../public/Img/morein.png";
import Bbatong from "../../../public/Img/bbatong.png";
import Louis from "../../../public/Img/louis.png";
import Apls from "../../../public/Img/alps.png";

const PlaceReviewData = [
    { placename: '오사카', review: '오사카는 음식과 쇼핑이 정말 최고예요!' },
    { placename: '오사카', review: '도톤보리에서의 야경이 정말 멋졌습니다.' },
    { placename: '오사카', review: '유니버설 스튜디오 재팬에서 즐거운 시간을 보냈어요.' },
    { placename: '오사카', review: '오사카 성은 역사적인 명소로 꼭 가보세요.' },
    { placename: '오사카', review: '맛있는 타코야키와 오코노미야키를 먹을 수 있어요.' },
    { placename: '오사카', review: '친절한 사람들이 많은 도시입니다.' },
    { placename: '파리', review: '에펠탑에서 바라본 파리 시내가 아름다웠어요.' },
    { placename: '파리', review: '루브르 박물관은 예술 애호가들에게 천국입니다.' },
    { placename: '파리', review: '파리의 카페 문화가 정말 인상적이었어요.' },
    { placename: '파리', review: '세느 강에서의 유람선 투어가 기억에 남아요.' },
    { placename: '호주', review: '시드니 오페라 하우스는 정말 멋졌습니다.' },
    { placename: '호주', review: '그레이트 배리어 리프에서의 다이빙이 최고였어요.' },
    { placename: '호주', review: '쿼카를 직접 보니 너무 귀여웠습니다.' },
    { placename: '호주', review: '호주의 자연 경관이 정말 인상적입니다.' },
    { placename: '도초지', review: '도초지의 정원은 평화롭고 아름다웠어요.' },
    { placename: '도초지', review: '고즈넉한 사찰에서 힐링할 수 있었습니다.' },
    { placename: '도초지', review: '전통적인 일본 문화를 느낄 수 있는 곳입니다.' },
    { placename: '도초지', review: '맛있는 당고를 꼭 먹어보세요.' },
    { placename: '에펠탑', review: '에펠탑의 야경은 정말 환상적입니다.' },
    { placename: '에펠탑', review: '파리에서의 가장 멋진 순간은 에펠탑에서 보낸 시간이었어요.' },
    { placename: '에펠탑', review: '에펠탑 전망대에서의 경치가 정말 좋았습니다.' },
    { placename: '에펠탑', review: '에펠탑 근처에서 피크닉을 즐길 수 있어요.' },
    { placename: '수상시장', review: '태국 수상시장에서의 쇼핑이 재미있었어요.' },
    { placename: '수상시장', review: '팟타이와 똠얌꿍이 정말 맛있었습니다.' },
    { placename: '수상시장', review: '다양한 먹거리를 한자리에서 맛볼 수 있습니다.' },
    { placename: '수상시장', review: '활기찬 시장 분위기가 인상적입니다.' },
    { placename: '모레인 호수', review: '모레인 호수의 물빛이 정말 아름다웠어요.' },
    { placename: '모레인 호수', review: '하이킹 코스가 잘 정비되어 있어 좋았습니다.' },
    { placename: '빠통 비치', review: '빠통 비치에서의 일몰이 잊을 수 없어요.' },
    { placename: '빠통 비치', review: '다양한 해양 스포츠를 즐길 수 있습니다.' },
    { placename: '루이스 호수', review: '루이스 호수의 경치가 너무 아름다웠어요.' },
    { placename: '루이스 호수', review: '조용한 호숫가에서 여유로운 시간을 보낼 수 있습니다.' },
    { placename: '알프스 산맥', review: '알프스 산맥에서의 하이킹이 정말 인상적이었습니다.' },
    { placename: '알프스 산맥', review: '눈 덮인 알프스 산맥의 풍경이 정말 아름다워요.' }

];

const PlaceData = [
    { placename: '오사카', detail: '오사카는 일본의 대표적인 도시로, 현대적이면서도 전통적인 매력이 어우러진 곳입니다. 맛있는 음식과 다양한 쇼핑 명소가 가득하며, 오사카 성, 유니버설 스튜디오 재팬 등 유명 관광지가 있습니다.', image: Osaka },
    { placename: '파리', detail: '파리는 프랑스의 수도로, 세계적으로 유명한 랜드마크인 에펠탑과 루브르 박물관이 있습니다. 마카롱, 크로와상 등의 프랑스 디저트가 맛있으며, 예술과 문화의 중심지로 알려져 있습니다.', image: Paris },
    { placename: '호주', detail: '호주는 대자연의 경이로움을 느낄 수 있는 나라입니다. 특히 서호주에 있는 쿼카는 귀여운 외모로 유명합니다. 시드니 오페라 하우스와 그레이트 배리어 리프 등 다양한 자연 경관을 즐길 수 있습니다.', image: Sydney },
    { placename: '도초지', detail: '도초지는 일본 교토에 위치한 사찰로, 전통적인 일본의 아름다움을 느낄 수 있는 곳입니다. 이곳에서는 맛있는 당고를 즐길 수 있으며, 고즈넉한 분위기 속에서 힐링할 수 있습니다.', image: Kyoto },
    { placename: '에펠탑', detail: '에펠탑은 프랑스 파리에 위치한 랜드마크로, 전 세계적으로 유명한 관광지입니다. 파리의 아름다운 전경을 감상할 수 있는 최고의 장소로, 로맨틱한 분위기를 느낄 수 있습니다.', image: ApelTower },
    { placename: '수상시장', detail: '태국 방콕에 위치한 수상시장은 다양한 먹거리와 신기한 상품들을 파는 활기찬 시장입니다. 팟타이, 똠얌꿍 등 태국의 맛있는 음식을 즐길 수 있습니다.', image: ThaiMarket },
    { placename: '모레인 호수', detail: '모레인 호수는 캐나다 앨버타 주에 위치한 아름다운 호수로, 청록색 물빛과 웅장한 산맥이 어우러진 경관이 일품입니다. 하이킹과 카누 등의 액티비티를 즐길 수 있는 자연 명소입니다.', image: Morein },
    { placename: '빠통 비치', detail: '빠통 비치는 태국 푸켓에 위치한 해변으로, 맑은 바다와 아름다운 백사장이 특징입니다. 다양한 해양 스포츠와 활기찬 야경을 즐길 수 있는 여행지입니다.', image: Bbatong },
    { placename: '루이스 호수', detail: '루이스 호수는 캐나다 앨버타 주에 위치한 호수로, 맑고 푸른 물빛과 주변의 웅장한 산맥이 어우러져 아름다운 풍경을 자랑합니다. 자연 속에서 여유로운 시간을 보낼 수 있는 명소입니다.', image: Louis },
    { placename: '알프스 산맥', detail: '알프스 산맥은 유럽의 대표적인 산맥으로, 스위스, 프랑스, 이탈리아 등 여러 나라에 걸쳐 있습니다. 겨울 스포츠와 하이킹 등 다양한 야외 활동을 즐길 수 있는 곳입니다.', image: Apls }


];

export default function Information() {

    const { placename } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentPlace, setCurrentPlace] = useState({});
    const [filteredReviews, setFilteredReviews] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const place = PlaceData.find(place => place.placename === placename);
        if (place) {
            setCurrentPlace(place);
            setFilteredReviews(PlaceReviewData.filter(review => review.placename === placename));
            setActiveIndex(0); // Reset index when place changes
        }
    }, [placename]);

    const reviewsPerPage = 2;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(filteredReviews.length / reviewsPerPage);

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    const handleGoRouteRec = () => {
        navigate('/routeRec');
    };

    const handleGoRoutePage = () =>{
        navigate('/route');
    }

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Wrapper>
                <PlaceName>{currentPlace.placename}</PlaceName>
                <Container>
                    <ConsentContainer>
                        <PlaceImg src={currentPlace.image} />
                        <RightWrapper>
                            <DetailInfoWrapper>
                                <DetailInfoTitle>{currentPlace.placename}</DetailInfoTitle>
                                <DetailInfo>{currentPlace.detail}</DetailInfo>
                            </DetailInfoWrapper>
                            <ReviewContainer>
                                <ReviewTitle>리뷰</ReviewTitle>
                                <PlaceReivewContainer>
                                    <PlaceReviews>
                                        {visibleReviews.map((review, index) => (
                                            <PlaceReivew key={index} review={review.review} />
                                        ))}
                                    </PlaceReviews>
                                    <GaugeBarWrapper>
                                        <GaugeBar
                                            completion={(activeIndex + 1) / totalIndicators * 100}
                                            onClick={handleGaugeClick}
                                        />
                                    </GaugeBarWrapper>
                                </PlaceReivewContainer>
                            </ReviewContainer>
                        </RightWrapper>
                    </ConsentContainer>
                </Container>
                <BtnContainer>
                    <BtnTitle>해당 여행지를 포함한 여행이 궁금하다면?</BtnTitle>
                    <FindRouteBtn onClick={handleGoRoutePage}>루트 검색</FindRouteBtn>
                    <RecomendationBtn onClick={handleGoRouteRec}>루트 추천</RecomendationBtn>
                </BtnContainer>
            </Wrapper>
        </>
    )
}
