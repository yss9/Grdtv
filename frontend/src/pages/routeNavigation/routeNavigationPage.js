import React, { useState } from 'react';
import Modal from 'react-modal';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './MapPage.css';
import {DestinationInput} from "./routeNavigationStyle";
const osakaLocations = [
    { name: '오사카성', img: '/Img/osaka/img.png' },
    { name: '우메다 스카이빌딩 공중정원', img: '/Img/osaka/img_3.png' },
    { name: '가메스시', img: '/Img/osaka/img_4.png' },
    { name: '우메다 한큐백화점', img: '/Img/osaka/img_5.png' },
    { name: '브루클린 로스팅 컴퍼니', img: '/Img/osaka/img_6.png' },
    { name: '야키니쿠엔 닝구', img: '/Img/osaka/img_2.png' },
    { name: '그랑 프론트 오사카', img: '/Img/osaka/img_7.png' },
    { name: '신세카이 혼도리 상점가', img: '/Img/osaka/img_1.png' },
];
const MapPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [locations, setLocations] = useState({
        출발지: '',
        경유지: [],
        도착지: '',
    });
    const [markers, setMarkers] = useState([]);

    const openModal = (field, index = null) => {
        setSelectedField(field);
        setEditIndex(index);
        setSelectedLocation(index !== null && field === '경유지' ? locations.경유지[index] : locations[field]);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
    };

    const handleSelectComplete = () => {
        const newLocations = { ...locations };
        if (selectedField === '경유지') {
            if (editIndex !== null) {
                newLocations.경유지[editIndex] = selectedLocation;
            } else {
                newLocations.경유지.push(selectedLocation);
            }
        } else {
            newLocations[selectedField] = selectedLocation;
        }
        setLocations(newLocations);
        updateMarkers(newLocations);
        closeModal();
    };

    const updateMarkers = (newLocations) => {
        const locationCoords = {
            '오사카성': { lat: 34.6873, lng: 135.5259 },
            '우메다 스카이빌딩 공중정원': { lat: 34.7055, lng: 135.4892 },
            '가메스시': { lat: 34.6985, lng: 135.4941 },
            '우메다 한큐백화점': { lat: 34.7033, lng: 135.5009 },
            '브루클린 로스팅 컴퍼니': { lat: 34.6765, lng: 135.5038 },
            '야키니쿠엔 닝구': { lat: 34.6731, lng: 135.4970 },
            '그랑 프론트 오사카': { lat: 34.7051, lng: 135.4959 },
            '신세카이 혼도리 상점가': { lat: 34.6525, lng: 135.5060 },
        };
        const newMarkers = [
            newLocations.출발지 && locationCoords[newLocations.출발지],
            ...newLocations.경유지.map(loc => locationCoords[loc]),
            newLocations.도착지 && locationCoords[newLocations.도착지]
        ].filter(Boolean);
        setMarkers(newMarkers);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        const newLocations = { ...locations };
        const items = Array.from([
            newLocations.출발지,
            ...newLocations.경유지,
            newLocations.도착지
        ]);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        newLocations.출발지 = items[0];
        newLocations.경유지 = items.slice(1, items.length - 1);
        newLocations.도착지 = items[items.length - 1];

        setLocations(newLocations);
        updateMarkers(newLocations);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="map-page">
                <div className="sidebar">
                    <img style={{width: '100px'}} src='/Img/로고.png'></img>
                    <h1>OO님을 위한 경로 추천</h1>
                    <div><br/></div>
                    <Droppable droppableId="travelLocations">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <Draggable key="출발지" draggableId="출발지" index={0}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="dropdown"
                                        >
                                            <label className="location-label">1</label>
                                            <div
                                                className="location-input"
                                                onClick={() => openModal('출발지')}
                                            >{locations.출발지 || '출발지'}</div>
                                        </div>
                                    )}
                                </Draggable>
                                <div className="arrow">▼</div>
                                {locations.경유지.map((waypoint, index) => (
                                    <React.Fragment key={`fragment-${index}`}>
                                        <Draggable key={`경유지-${index}`} draggableId={`경유지-${index}`} index={index + 1}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="dropdown"
                                                >
                                                    <label className="location-label">{index + 2}</label>
                                                    <div
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
                                <Draggable key="도착지" draggableId="도착지" index={locations.경유지.length + 1}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="dropdown"
                                        >
                                            <label className="location-label">{locations.경유지.length + 2}</label>
                                            <div
                                                className="location-input"
                                                onClick={() => openModal('도착지')}
                                            >{locations.도착지 || '도착지'}</div>
                                        </div>
                                    )}
                                </Draggable>
                                <button
                                    className="black-button"
                                    style={{ marginTop: '20px' }}
                                    onClick={() => openModal('경유지')}
                                >경유지 추가</button>
                            </div>
                        )}
                    </Droppable>
                </div>
                <div className="map-container">



                    {/* ~!~!~!~!~!~~!~!~!~!~!~ 구글 api 키 넣는 곳 ~!~!~!~!~!~~!~!~!~!~!~ */}

                    <LoadScript googleMapsApiKey="여따가 키 넣기" libraries={['places']}>
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={{ lat: 34.6937, lng: 135.5023 }}
                            zoom={13}
                            onLoad={() => console.log('Map Loaded')}
                            onError={(e) => console.error('Error loading map', e)}
                        >
                            {markers.map((marker, index) => (
                                <Marker key={index} position={marker} label={`${index + 1}`} />
                            ))}
                            {markers.length > 1 && (
                                <Polyline
                                    path={markers}
                                    options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
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
                    <div className="modal-content">
                        <h2>{selectedField}를 선택해 주세요.</h2>
                        <DestinationInput type="text" placeholder={`${selectedField}를 선택해 주세요.`}/>
                        <div className="location-list">
                            {osakaLocations.map((location) => (
                                <div
                                    key={location.name}
                                    className={`location-item ${selectedLocation === location.name ? 'selected' : ''}`}
                                    onClick={() => handleLocationClick(location.name)}
                                >
                                    <img src={location.img} alt={location.name}/>
                                    <span>{location.name}</span>
                                </div>
                            ))}
                        </div>
                        <button className="black-button" onClick={handleSelectComplete}>선택 완료</button>
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
