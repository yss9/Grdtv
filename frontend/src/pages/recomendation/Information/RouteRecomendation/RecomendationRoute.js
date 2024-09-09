// RecommendationRoute.js
import React from 'react';
import {
    PlacesTitleWrapper,
    PlacesTitle,
    PlacesWriter,
    SaveBtn,
    PlacesWrapper,
    PlaceWrapper,
    Places,
    PlaceName
} from './routeRecomendationstyle';



function RecommendationRoute({ recommendation }) {
    return (
        <div>
            <PlacesTitleWrapper>
                <PlacesTitle>{recommendation.title}</PlacesTitle>
                <PlacesWriter>by 사용자 닉네임</PlacesWriter>
                <SaveBtn>저장하기</SaveBtn>
            </PlacesTitleWrapper>
            <PlacesWrapper>
                {recommendation.addresses.map((place, index) => (
                    <React.Fragment key={place.address}>
                        {index > 0 && (
                            <p>
                                <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 9L0 17.6603V0.339745L15 9Z" fill="#5F5F5F" />
                                </svg>
                            </p>
                        )}
                        <PlaceWrapper>
                            <Places src={recommendation.image} />
                            <PlaceName>{place.address}</PlaceName>
                        </PlaceWrapper>
                    </React.Fragment>
                ))}
            </PlacesWrapper>
        </div>
    );
}

export default RecommendationRoute;
