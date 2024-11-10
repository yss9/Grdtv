import { Reset } from 'styled-reset';
import React, { useEffect, useState, useCallback } from 'react';
import TopBarComponent from "../../../components/TopBar/TopBar";
import {
    HashTag, HashTagContaienr,
    KeywordBtn, KeywordContainer, Place, PlaceContainer, PlaceName1, PlaceWrapper, RefreshBtn,
    SubTitle, SubTitleWrapper, Title, TitleWrapper, Wrapper,
    BestCourseContainer,
    BestCourses, BestWrapper, Notice, GaugeBar, GaugeBarWrapper, Container
} from "./personalstyle";
import BestCourse from "../../../components/BestCourse/BestCourse";
import { useLocation, useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = 'AIzaSyCCkm0KlwV72tLvvEG9c4YuPHgo_j2_qz0';

const PersonalRecData = [];
const CourseData = [];



export default function PersonalRecPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [placeImages, setPlaceImages] = useState({});
    const [displayedPlaces, setDisplayedPlaces] = useState([]);
    const [isGoogleMapsScriptLoaded, setIsGoogleMapsScriptLoaded] = useState(false);
    const [isResultsLoaded, setIsResultsLoaded] = useState(false);

    const location = useLocation();
    const { results, KeywordData = [] } = location.state || {};
    console.log(results);
    const reviewsPerPage = 4;
    const startIndex = activeIndex * reviewsPerPage;
    const visibleAgents = CourseData.slice(startIndex, startIndex + reviewsPerPage);
    const totalIndicators = Math.ceil(CourseData.length / reviewsPerPage);
    const navigate = useNavigate();

    const loadGoogleMapsScript = useCallback(() => {
        return new Promise((resolve) => {
            if (window.google && window.google.maps && window.google.maps.places) {
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.onload = () => resolve();
                document.body.appendChild(script);
            }
        });
    }, []);

    useEffect(() => {
        loadGoogleMapsScript().then(() => {
            setIsGoogleMapsScriptLoaded(true);
        });
    }, [loadGoogleMapsScript]);

    useEffect(() => {
        if (!isResultsLoaded && results) {
            const updatedPersonalRecData = results.slice(0, 9).map(item => ({ placename: item.destName }));
            const updatedCourseData = results.slice(9, 21).map(item => ({ placename: item.destName }));

            setDisplayedPlaces(updatedPersonalRecData.slice(0, 3));
            PersonalRecData.push(...updatedPersonalRecData);
            CourseData.push(...updatedCourseData);
            setIsResultsLoaded(true);
        }

        if (!results || results.length === 0) {
            navigate('/keyword');
        }
    }, [results, isResultsLoaded, navigate]);

    const fetchPlacePhotos = useCallback((places) => {
        places.forEach((place) => {
            if (!placeImages[place.placename]) {
                fetchPlacePhoto(place.placename);
            }
        });
    }, [placeImages]);

    useEffect(() => {
        if (isGoogleMapsScriptLoaded && displayedPlaces.length > 0) {
            fetchPlacePhotos(displayedPlaces);
        }
    }, [displayedPlaces, isGoogleMapsScriptLoaded, fetchPlacePhotos]);

    useEffect(() => {
        if (isGoogleMapsScriptLoaded && visibleAgents.length > 0) {
            fetchPlacePhotos(visibleAgents);
        }
    }, [visibleAgents, isGoogleMapsScriptLoaded, fetchPlacePhotos]);

    const fetchPlacePhoto = (placeName) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            query: placeName,
            fields: ['place_id', 'photos']
        };

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
                const place = results[0];
                if (place.photos && place.photos.length > 0) {
                    const photoUrl = place.photos[0].getUrl({ maxWidth: 400 });
                    setPlaceImages(prevState => ({
                        ...prevState,
                        [placeName]: photoUrl
                    }));
                }
            } else {
                console.error(`Could not fetch place photo for ${placeName}`);
            }
        });
    };

    const refreshPlaces = () => {
        const shuffled = [...PersonalRecData].sort(() => 0.5 - Math.random());
        const newDisplayedPlaces = shuffled.slice(0, 3);
        setDisplayedPlaces(newDisplayedPlaces);
    };

    const handleGaugeClick = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - boundingRect.left;
        const completionPercentage = (clickX / boundingRect.width) * 100;
        const newIndex = Math.floor((completionPercentage / 100) * totalIndicators);
        setActiveIndex(newIndex);
    };

    const handleGoInformation = (placename) => {
        navigate(`/recomendation/information/${placename}`);
    };

    const handleGoKeywordSelection = () => {
        PersonalRecData.length = 0;
        CourseData.length = 0;
        setIsResultsLoaded(false);
        setDisplayedPlaces([]);
        navigate('/keyword');
    };


    return (
        <>
            <Reset />
            <div style={{ height: '55px' }}></div>
            <TopBarComponent />
            <Container>
                <Wrapper>
                    <TitleWrapper>
                        <Title>나만의 맞춤 여행지</Title>
                    </TitleWrapper>
                    <SubTitleWrapper>
                        <SubTitle>키워드 성향에 따른 맞춤형 여행지를 추천해 드려요.</SubTitle>
                        <RefreshBtn id="target-button-id" onClick={refreshPlaces}>
                            <p>추천 새로고침</p>

                        </RefreshBtn>
                    </SubTitleWrapper>
                    <PlaceContainer>
                        {displayedPlaces.map(place => (
                            <PlaceWrapper key={place.placename} onClick={() => handleGoInformation(place.placename)}>
                                {placeImages[place.placename] ? (
                                    <Place src={placeImages[place.placename]} alt={place.placename}/>
                                ) : (
                                    <p>Loading image...</p>
                                )}
                                <PlaceName1>{place.placename}</PlaceName1>
                            </PlaceWrapper>
                        ))}
                    </PlaceContainer>
                    <KeywordBtn onClick={handleGoKeywordSelection}>키워드 다시 선정하기</KeywordBtn>
                    <BestWrapper>
                        <KeywordContainer>
                            <HashTagContaienr>
                                {KeywordData.length > 0 ? (
                                    KeywordData.map((place, index) => (
                                        <HashTag key={index}>{place.keyword}</HashTag>
                                    ))
                                ) : (
                                    <p>키워드를 가져오지 못했습니다.</p>
                                )}
                                <Notice>
                                    <p>관심사와 어울리는</p>
                                    <p>여행지를 가져왔어요.</p>
                                </Notice>
                            </HashTagContaienr>
                            <BestCourseContainer>
                                <BestCourses>
                                    {visibleAgents.map((course, index) => (
                                        <BestCourse
                                            key={index}
                                            review={course}
                                            image={placeImages[course.placename]}
                                        />
                                    ))}
                                </BestCourses>
                            </BestCourseContainer>
                        </KeywordContainer>
                        <GaugeBarWrapper>
                            <GaugeBar
                                completion={(activeIndex + 1) / totalIndicators * 100}
                                onClick={handleGaugeClick}
                            />
                        </GaugeBarWrapper>
                    </BestWrapper>
                </Wrapper>
            </Container>
        </>
    );
}
