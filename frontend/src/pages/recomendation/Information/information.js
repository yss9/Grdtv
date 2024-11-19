import React, { useState, useEffect } from 'react';
import { Reset } from 'styled-reset';
import TopBarComponent from '../../../components/TopBar/TopBar';
import {
    ConsentContainer, Container, DetailInfoWrapper,
    PlaceImg, PlaceName, Wrapper, RightWrapper,
    DetailInfoTitle, DetailInfo, ReviewContainer,
    BtnContainer, BtnTitle,
    RecomendationBtn, ReviewTitle, PlaceReviews,
    PlaceReivewContainer, GaugeBar, GaugeBarWrapper
} from "./informationstyle";
import PlaceReview from "../../../components/PlaceReview/placeReview";
import { useNavigate, useParams } from 'react-router-dom';
import MyProfile2 from "../../../public/Img/forprofile/img_1.png";

export default function Information() {
    const { placename } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentPlace, setCurrentPlace] = useState({});
    const [placeImage, setPlaceImage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isGoogleMapsScriptLoaded, setIsGoogleMapsScriptLoaded] = useState(false);

    const navigate = useNavigate();

    const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0';

    const loadGoogleMapsScript = () => {
        return new Promise((resolve) => {
            if (window.google && window.google.maps && window.google.maps.places) {
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.onload = () => {
                    resolve();
                };
                document.body.appendChild(script);
            }
        });
    };

    useEffect(() => {
        loadGoogleMapsScript().then(() => {
            setIsGoogleMapsScriptLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (isGoogleMapsScriptLoaded) {
            fetchPlaceDetails(placename);
        }
    }, [placename, isGoogleMapsScriptLoaded]);

    const fetchPlaceDetails = (placeName) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            query: placeName,
            fields: ['place_id']
        };

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
                const placeId = results[0].place_id;
                const detailsRequest = {
                    placeId: placeId,
                    fields: ['name', 'photos', 'formatted_address']
                };

                service.getDetails(detailsRequest, (placeDetails, detailsStatus) => {
                    if (detailsStatus === window.google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                        if (placeDetails.photos && placeDetails.photos.length > 0) {
                            const photoUrl = placeDetails.photos[0].getUrl({ maxWidth: 400 });
                            setPlaceImage(photoUrl);
                        }

                        setCurrentPlace({
                            name: placeDetails.name,
                            address: placeDetails.formatted_address || ""
                        });

                        fetchReviews(placeDetails.name);
                    } else {
                        console.error(`Could not fetch details for ${placeName}`);
                    }
                });
            } else {
                console.error(`Could not fetch place ID for ${placeName}`);
            }
        });
    };

    const fetchReviews = (placeName) => {
        fetch(`http://localhost:8080/api/posts/titles/${placeName}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                return response.json();
            })
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    };

    const reviewsPerPage = 2;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(reviews.length / reviewsPerPage);

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    const handleGoRouteRec = () => {
        navigate('/routeRec', { state: { placename: placename } });
    };

    return (
        <>
            <Reset />
            <div style={{ height: '55px' }}></div>
            <TopBarComponent />
            <Wrapper>
                <PlaceName>{placename}</PlaceName>
                <Container>
                    <ConsentContainer>
                        {placeImage ? (
                            <PlaceImg src={placeImage} alt={placename} />
                        ) : (
                            <p>Loading image...</p>
                        )}
                        <RightWrapper>
                            <DetailInfoWrapper>
                                <DetailInfoTitle>{currentPlace.name}</DetailInfoTitle>
                                <DetailInfo>{currentPlace.address}</DetailInfo>
                            </DetailInfoWrapper>
                            <ReviewContainer>
                                <ReviewTitle>리뷰</ReviewTitle>
                                <PlaceReivewContainer>
                                    <PlaceReviews>
                                        {visibleReviews.map((review) => (
                                            <PlaceReview
                                                boardID ={review.boardID}
                                                review={review.title}
                                                profilePicture={
                                                    review.profilePicture
                                                        ? `http://localhost:8080/${review.profilePicture.replace('static\\', '').replace(/\\/g, '/')}`
                                                        : MyProfile2
                                                }
                                            />
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
                    <RecomendationBtn onClick={handleGoRouteRec}>루트 추천</RecomendationBtn>
                </BtnContainer>
            </Wrapper>
        </>
    );
}
