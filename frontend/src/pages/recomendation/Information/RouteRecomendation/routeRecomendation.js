import {
    BodyContainer,
    LeftWrapper, MapImg, PlaceName, Places,
    PlacesContainer,
    PlacesTitle, PlacesTitleWrapper,
    PlacesWrapper,
    PlacesWriter, PlaceWrapper, RefreshBtn, RefreshBtnWrapper, RightWrapper,
    SaveBtn,
    Title
} from './routeRecomendationstyle'
import { Reset } from 'styled-reset';
import TopBarComponent from '../../../../components/TopBar/TopBar';
import React from "react";
import Osaka from "../../../../public/Img/osaka.png";
import Paris from "../../../../public/Img/paris.png";
import Sydney from "../../../../public/Img/sydney.png";
import Kyoto from "../../../../public/Img/kyoto.png";
import Alps from "../../../../public/Img/alps.png";
import Louis from "../../../../public/Img/louis.png";
import Canada from "../../../../public/Img/canada.png";
import ApelTower from "../../../../public/Img/apeltower.png";
import Map from "../../../../public/Img/formap/map.png";
import Map2 from "../../../../public/Img/formap/map2.png";
import scroll from "../../../../public/Img/formap/scroll.png";


const PlaceRouteData = [
    {placename:'오사카', image: Osaka},
    {placename:'파리', image: Paris },
    {placename:'호주', image: Sydney },
    { placename: '도초지', image: Kyoto},
];

const PlaceRouteData2=[
    {placename:'알프스', image: Alps},
    {placename:'루이스', image: Louis },
    {placename:'에펠타워', image: ApelTower },
    { placename: '캐나다', image: Canada},
]
export default function RouteRecomendation() {
    return(
        <>
            <Reset />
            <TopBarComponent />
            <BodyContainer>
                <Title>BEST 리뷰의 추천 루트를 제공할게요.</Title>
                <RefreshBtnWrapper>
                    <RefreshBtn>
                        <p>추천 새로고침</p>
                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_484_188)">
                                <path d="M7 18.45C4.98 18.2 3.31 17.32 1.99 15.81C0.66 14.3 0 12.53 0 10.5C0 9.4 0.22 8.35 0.65 7.34C1.08 6.33 1.7 5.45 2.5 4.7L3.93 6.13C3.3 6.7 2.82 7.36 2.49 8.11C2.16 8.86 2 9.66 2 10.51C2 11.98 2.47 13.27 3.4 14.4C4.33 15.53 5.53 16.21 7 16.46V18.46V18.45ZM9 18.45V16.45C10.45 16.18 11.65 15.49 12.59 14.37C13.53 13.25 14 11.96 14 10.49C14 8.82 13.42 7.41 12.25 6.24C11.08 5.07 9.67 4.49 8 4.49H7.92L9.02 5.59L7.62 6.99L4.12 3.49L7.63 0L9.03 1.4L7.93 2.5H8.01C10.24 2.5 12.14 3.28 13.69 4.83C15.24 6.38 16.02 8.27 16.02 10.51C16.02 12.53 15.36 14.29 14.03 15.8C12.7 17.31 11.03 18.2 9.02 18.46L9 18.45Z" fill="#5F6368"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_484_188">
                                    <rect width="16" height="18.45" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </RefreshBtn>
                </RefreshBtnWrapper>
                <PlacesContainer>
                    <LeftWrapper>
                        <PlacesTitleWrapper>
                            <PlacesTitle>시간이 남아돌 때 가세요 루트</PlacesTitle>
                            <PlacesWriter>by 돈벌어서어따쓰냐</PlacesWriter>
                            <SaveBtn>저장하기</SaveBtn>
                        </PlacesTitleWrapper>
                        <PlacesWrapper>
                            {PlaceRouteData.map((place, index) => (
                                <React.Fragment key={place.placename}>
                                    {index > 0 && (
                                        <p>
                                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 9L0 17.6603V0.339745L15 9Z" fill="#5F5F5F" />
                                            </svg>
                                        </p>
                                    )}
                                    <PlaceWrapper>
                                        <Places src={place.image}></Places>
                                        <PlaceName>{place.placename}</PlaceName>
                                    </PlaceWrapper>
                                </React.Fragment>
                            ))}
                        </PlacesWrapper>
                    </LeftWrapper>
                    <RightWrapper>
                        <MapImg src={Map}></MapImg>
                    </RightWrapper>
                </PlacesContainer>
                <PlacesContainer>
                    <LeftWrapper>
                        <PlacesTitleWrapper>
                            <PlacesTitle>벼락부자의 여행 루트</PlacesTitle>
                            <PlacesWriter>by 도지</PlacesWriter>
                            <SaveBtn>저장하기</SaveBtn>
                        </PlacesTitleWrapper>
                        <PlacesWrapper>
                            {PlaceRouteData2.map((place, index) => (
                                <React.Fragment key={place.placename}>
                                    {index > 0 && (
                                        <p>
                                            <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 9L0 17.6603V0.339745L15 9Z" fill="#5F5F5F" />
                                            </svg>
                                        </p>
                                    )}
                                    <PlaceWrapper>
                                        <Places src={place.image}></Places>
                                        <PlaceName>{place.placename}</PlaceName>
                                    </PlaceWrapper>
                                </React.Fragment>
                            ))}
                        </PlacesWrapper>
                    </LeftWrapper>
                    <RightWrapper>
                        <MapImg src={Map2}></MapImg>
                    </RightWrapper>
                </PlacesContainer>
            </BodyContainer>
        </>

    )
}

