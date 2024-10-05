import React, { useEffect, useRef, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const libraries = ['places'];
const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // 샌프란시스코의 기본 위치

const MapComponent = ({ addresses, setAddresses, currentAddressIndex }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCB8gNH_zw9UV7DBo8g9T5jHVjCR6KbgdY', // 여기에 Google Maps API 키를 입력하세요.
        libraries: ['places'], // 여기에 'places' 라이브러리가 포함되어야 합니다.
    });

    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const directionsServiceRef = useRef(null);
    const directionsRendererRef = useRef(null);
    const googleMapRef = useRef(null);

    const initializeMap = useCallback(() => {
        if (googleMapRef.current) return; // 이미 초기화된 경우 초기화하지 않음

        const map = new window.google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: 12,
        });

        directionsServiceRef.current = new window.google.maps.DirectionsService();
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
        directionsRendererRef.current.setMap(map);

        googleMapRef.current = map;
    }, []);

    const updateMarkers = useCallback(() => {
        if (!googleMapRef.current) return;

        const map = googleMapRef.current;

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // 새로운 마커 추가
        addresses.forEach((address, index) => {
            if (address.location.lat && address.location.lng) {
                // 마커 생성
                const marker = new window.google.maps.Marker({
                    position: address.location,
                    map: map,
                    label: (index + 1).toString(), // 순서 표시
                });

                // 마커를 배열에 저장
                markersRef.current.push(marker);
            }
        });

        // 모든 마커가 지도에 표시되도록 경계 조정
        if (addresses.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            addresses.forEach(address => {
                if (address.location.lat && address.location.lng) {
                    bounds.extend(address.location);
                }
            });
            map.fitBounds(bounds);
        }

        // 경로 렌더링
        if (addresses.length > 1) {
            const waypoints = addresses.slice(1, -1).map(address => ({ location: address.location, stopover: true }));
            const origin = addresses[0].location;
            const destination = addresses[addresses.length - 1].location;

            directionsServiceRef.current.route(
                {
                    origin,
                    destination,
                    waypoints,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        directionsRendererRef.current.setDirections(response);
                    } else {
                        console.error(`error fetching directions ${response}`);
                    }
                }
            );
        } else {
            directionsRendererRef.current.setDirections({ routes: [] }); // 경로 초기화
        }
    }, [addresses]);

    useEffect(() => {
        if (isLoaded) {
            initializeMap();
        }
    }, [isLoaded, initializeMap]);

    useEffect(() => {
        if (isLoaded) {
            updateMarkers();
        }
    }, [isLoaded, addresses, updateMarkers]);

    if (loadError) return <div>Error loading map</div>;
    return isLoaded ? <div ref={mapRef} style={{ width: '100%', height: '300px' }}></div> : <div>Loading...</div>;
};

MapComponent.propTypes = {
    addresses: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            location: PropTypes.shape({
                lat: PropTypes.number.isRequired,
                lng: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
    setAddresses: PropTypes.func.isRequired,
    currentAddressIndex: PropTypes.number.isRequired,
};

export default MapComponent;
