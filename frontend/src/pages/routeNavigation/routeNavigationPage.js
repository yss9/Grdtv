import React, {useEffect, useState} from 'react';
import googleMapsApiLoader from 'google-maps-api-loader';
import Modal from 'react-modal';
import {DirectionsRenderer, GoogleMap, LoadScript, Marker, Polyline} from '@react-google-maps/api';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import './MapPage.css';
import {BottomButton, DestinationInput} from "./routeNavigationStyle";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {searchPlaceInCountry} from './apiService';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

// Google Places API 키
const apiKey = 'AIzaSyDHNaifEbMYJPv6_mg2QJLKuJT3AqxFc7Y';

const librariesPlace = 'places';
const initLocations = [
    { name: '오사카성', img: '/Img/osaka/img.png' },
    { name: '우메다 스카이빌딩 공중정원', img: '/Img/osaka/ENFJ.png' },
    { name: '가메스시', img: '/Img/osaka/ENFP.png' },
    { name: '우메다 한큐백화점', img: '/Img/osaka/ISTJ.png' },
    { name: '브루클린 로스팅 컴퍼니', img: '/Img/osaka/ISFJ.png' },
    { name: '야키니쿠엔 닝구', img: '/Img/osaka/INFP.png' },
    { name: '그랑 프론트 오사카', img: '/Img/osaka/ESTJ.png' },
    { name: '신세카이 혼도리 상점가', img: '/Img/osaka/INTJ.png' },
];


const MapPage = () => {

    // User 닉네임 가져옴
    const token = Cookies.get('jwt'); // 쿠키에서 JWT 토큰 가져오기
    const [nicknames, setNicknames] = useState([]);
    const [username, setUsername] = useState('');


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [route, setRoute] = useState({
        출발지: '',
        경유지: [],
        도착지: '',
    });
    const [markers, setMarkers] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const [searchLocations, setSearchLocations] = useState(initLocations);

    // 검색용
    const [query, setQuery] = useState('');
    const [isSearched, setIsSearched] = useState(false);
    const [placesData, setPlacesData] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState([]); // 선택된 장소들을 저장할 상태 변수

    const [directions, setDirections] = useState(null);

    const initLocationsInfo = {
        '오사카성': { lat: 35.8338393, lng: 128.7457322 },
        '우메다 스카이빌딩 공중정원': { lat: 34.7055, lng: 135.4892 },
        '가메스시': { lat: 37.53564069999999, lng: 126.8956608 },
        '우메다 한큐백화점': { lat: 34.7033, lng: 135.5009 },
        '브루클린 로스팅 컴퍼니': { lat: 34.6765, lng: 135.5038 },
        '야키니쿠엔 닝구': { lat: 34.6731, lng: 135.4970 },
        '그랑 프론트 오사카': { lat: 34.7051, lng: 135.4959 },
        '신세카이 혼도리 상점가': { lat: 34.6525, lng: 135.5060 },
    };

    const [additionalPlacesInfo, setAdditionalPlacesInfo] = useState({'':{lat:'', lang:''}});

    const openModal = (field, index = null) => {
        setSelectedField(field);
        setEditIndex(index);
        setSelectedLocation(index !== null && field === '경유지' ? route.경유지[index] : route[field]);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSelectComplete = () => {
        const newRoute = { ...route };
        if (selectedField === '경유지') {
            if (editIndex !== null) {
                newRoute.경유지[editIndex] = selectedLocation;
            } else {
                newRoute.경유지.push(selectedLocation);
            }
        } else {
            newRoute[selectedField] = selectedLocation;
        }
        setRoute(newRoute);
        updateMarkers(newRoute);
        closeModal();
    };

    const updateMarkers = (newRoute) => {
        const allLocationsInfo = { ...initLocationsInfo, ...additionalPlacesInfo };

        const newMarkers = [
            newRoute.출발지 && allLocationsInfo[newRoute.출발지],
            ...newRoute.경유지.map(loc => allLocationsInfo[loc]),
            newRoute.도착지 && allLocationsInfo[newRoute.도착지]
        ].filter(Boolean);

        setMarkers(newMarkers);
        console.log('뉴마커',newMarkers)

    };


    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        const newRoute = { ...route };
        const items = Array.from([
            newRoute.출발지,
            ...newRoute.경유지,
            newRoute.도착지
        ]);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        newRoute.출발지 = items[0];
        newRoute.경유지 = items.slice(1, items.length - 1);
        newRoute.도착지 = items[items.length - 1];

        setRoute(newRoute);
        updateMarkers(newRoute);
    };

    const sendPlace = () => {
        const combinedLocations = [
            route.출발지,
            ...route.경유지,
            route.도착지
        ].filter(location => location !== '');
        console.log('combinedLocations:', combinedLocations);
        if (combinedLocations.length < 2) {
            alert("여행지를 2개 이상 선택해 주세요.")
        }
        else {
            axios.post('http://localhost:8080/api/navigations', combinedLocations)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                    alert("경로 저장에 실패했습니다. 다시 시도해주세요.");
                });
        }
    }

    const handleGoMain=() =>{
        navigate('/');
    }

    const handleGoReservation=() =>{
        navigate('/reservation');
    }

    const onChangeSearchQuery = (event) => {
        setSearchQuery(event.target.value)
    }

    // 검색한 장소를 클릭
    const onClickAdd = (placeName) => {
        const selectedPlace = placesData[placeName];
        if (selectedPlace) {
            const newPlace = {
                name: placeName,
                lat: selectedPlace.lat,
                lng: selectedPlace.lng
            };
            setAdditionalPlacesInfo({[placeName]:{lat:selectedPlace.lat, lng:selectedPlace.lng}})
            console.log('선택한 장소:',{[placeName]:{lat:selectedPlace.lat, lng:selectedPlace.lng}})
        }

        //버튼 누르면 실행되는 코드 가져옴
        const newRoute = { ...route };
        if (selectedField === '경유지') {
            if (editIndex !== null) {
                newRoute.경유지[editIndex] = placeName;
            } else {
                newRoute.경유지.push(placeName);
            }
        } else {
            newRoute[selectedField] = placeName;
        }
        setRoute(newRoute);
        updateMarkers(newRoute);
        closeModal();
    };

    const handleSearch = () => {
        if (!query) return;

        const service = new window.google.maps.places.PlacesService(
            document.createElement('div')
        );

        const request = {
            query: query,
            fields: ['name', 'geometry'],
            location: new window.google.maps.LatLng(35.6895, 139.6917), // 도쿄를 중심으로 검색 (예시)
            radius: 50000 // 반경 50km 내에서 검색 (필요에 따라 조정 가능)
        };

        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // 최대 10개의 검색 결과만 처리하여 객체로 변환
                const newPlacesData = results.slice(0, 10).reduce((acc, result) => {
                    acc[result.name] = {
                        lat: result.geometry.location.lat(),
                        lng: result.geometry.location.lng(),
                    };
                    return acc;
                }, {});

                setPlacesData(newPlacesData); // 상태로 placesData를 업데이트

                // 디버깅용으로 객체의 키와 값을 출력
                Object.entries(newPlacesData).forEach(([name, coords]) => {
                    console.log(`Name: ${name}, Lat: ${coords.lat}, Lng: ${coords.lng}`);
                });

                setIsSearched(true); // 검색 완료 상태 업데이트
            } else {
                console.error('Place search failed:', status);
            }
        });
    };





    // 닉네임 가져옴
    useEffect(() => {
        const fetchNicknames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/nicknames', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNicknames(response.data);

                // 토큰에서 내 닉네임 가져오기
                const userPayload = jwtDecode(token);
                const extractedUsername = userPayload.nickname;
                setUsername(extractedUsername);
            } catch (error) {
                console.error('Failed to fetch nicknames', error);
            }
        };

        fetchNicknames();
    }, [token]);

    // 지도 로드
    const calculateRoute = () => {
        if (route.출발지 && route.도착지) {
            const waypoints = route.경유지.map(waypoint => ({
                location: waypoint,
                stopover: true
            }));

            const service = new window.google.maps.DirectionsService();
            service.route(
                {
                    origin: route.출발지,
                    destination: route.도착지,
                    waypoints: waypoints,
                    travelMode: window.google.maps.TravelMode.WALKING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`Error fetching directions ${status}`);
                    }
                }
            );
        }
    };

    useEffect(() => {
        if (route.출발지 && route.도착지) {
            calculateRoute();
        }
    }, [route]);


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="map-page">
                <div className="sidebar">
                    <img style={{width: '200px', cursor:'pointer'}} src='/Img/Logo1.png' onClick={handleGoMain}></img>
                    <h1 style={{marginTop: "20%", marginBottom: "20%"}}>오직 {username}님을 위한 경로</h1>
                    <div><br/></div>
                    <Droppable droppableId="travelLocations">
                        {(provided) => (
                            <div style={{fontSize: "20px"}} {...provided.droppableProps} ref={provided.innerRef}>

                                {/*출발지*/}
                                <Draggable key="출발지" draggableId="출발지" index={0}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="dropdown"
                                        >
                                            <label className="location-label">1</label>
                                            <div style={{fontSize: "15px"}}
                                                 className="location-input"
                                                 onClick={() => openModal('출발지')}
                                            >{route.출발지 || '출발지'}</div>
                                        </div>
                                    )}
                                </Draggable>
                                <div className="arrow">▼</div>

                                {/*경유지*/}
                                {route.경유지.map((waypoint, index) => (
                                    <React.Fragment key={`fragment-${index}`}>
                                        <Draggable key={`경유지-${index}`} draggableId={`경유지-${index}`} index={index + 1}>
                                            {(provided) => (
                                                <div style={{fontSize: "15px"}}
                                                     ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                     className="dropdown"
                                                >
                                                    <label className="location-label">{index + 2}</label>
                                                    <div style={{fontSize: "15px"}}
                                                         className="location-input"
                                                         onClick={() => openModal('경유지', index)}
                                                    >{waypoint || `경유지 ${index + 1}`}</div>
                                                </div>
                                            )}
                                        </Draggable>
                                        <div className="arrow">▼</div>
                                    </React.Fragment>
                                ))}
                                {provided.placeholder}

                                {/*도착지*/}
                                <Draggable key="도착지" draggableId="도착지" index={route.경유지.length + 1}>
                                    {(provided) => (
                                        <div style={{fontSize: "15px"}}
                                             ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             className="dropdown"
                                        >
                                            <label className="location-label">{route.경유지.length + 2}</label>
                                            <div style={{fontSize: "15px"}}
                                                 className="location-input"
                                                 onClick={() => openModal('도착지')}
                                            >{route.도착지 || '도착지'}</div>
                                        </div>
                                    )}
                                </Draggable>
                                <button
                                    className="black-button"
                                    style={{
                                        margin: '40px 0 20px 30px',
                                        fontFamily: "Regular",
                                        width: '200px',
                                        borderRadius: '10px',
                                    }}
                                    onClick={() => openModal('경유지')}
                                >경유지 추가
                                </button>
                                <BottomButton onClick={handleGoMain}>나가기</BottomButton>

                                {/*아래 두 줄은 DB 저장 코드*/}
                                {/*<button onClick={() => searchPlaceInCountry('고메스시', apiKey)}>검색</button>*/}
                                {/*<button onClick={sendPlace}>경로 저장 (DB 저장)</button>*/}

                                <BottomButton onClick={handleGoReservation} style={{left: "26%"}}>
                                    예약 대행 신청하러 가기
                                </BottomButton>
                            </div>

                        )}
                    </Droppable>


                </div>
                <div className="map-container">
                    <LoadScript googleMapsApiKey={apiKey} libraries={[librariesPlace]}>
                        <GoogleMap
                            mapContainerStyle={{width: '100%', height: '100%'}}
                            center={{lat: 34.6937, lng: 135.5023}} // 오사카 위치
                            zoom={13}
                            onLoad={() => console.log('Map Loaded')}
                            onError={(e) => console.error('Error loading map', e)}
                        >
                            {markers.map((marker, index) => (
                                <Marker key={index} position={marker} label={`${index + 1}`} />
                            ))}

                            {/*네비게이션 출력*/}
                            {directions && (
                                <DirectionsRenderer
                                    directions={directions}
                                    options={{
                                        polylineOptions: {
                                            strokeColor: '#FF0000',
                                            strokeOpacity: 1.0,
                                            strokeWeight: 2,
                                        },
                                    }}
                                />
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Select Location Modal"
                >

                    {/*검색 모달*/}
                    <div className="modal-content">
                        <h2>{selectedField}를 선택해 주세요.</h2>
                        <DestinationInput
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value); // 상태 업데이트
                                handleSearch();          // handleSearch 함수 호출
                            }}
                            type="text"
                            placeholder={`${selectedField}를 선택해 주세요.`}/>
                        <div className="location-list">
                            {(isSearched && query) ? (
                                <div>
                                    {placesData && Object.keys(placesData).length > 0 ? (
                                        Object.keys(placesData).map((placeName) => (
                                            <div key={placeName} className="location-item"
                                                 onClick={() => onClickAdd(placeName)}>
                                                <span>{placeName}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No places found</p>
                                    )}
                                </div>

                            ) : (
                                <div>
                                    {searchLocations.map((location) => (
                                        <div
                                            key={location.name}
                                            className={`location-item ${selectedLocation === location.name ? 'selected' : ''}`}
                                            onClick={() => setSelectedLocation(location.name)}
                                        >
                                            <span>{location.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="black-button" style={{borderRadius:'20px'}} onClick={handleSelectComplete}>선택 완료</button>
                    </div>
                </Modal>
            </div>

        </DragDropContext>
    );
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
    },
};


export default MapPage;
