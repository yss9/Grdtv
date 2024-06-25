// MapComponent.js
import React, { useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const libraries = ['places'];

const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // 샌프란시스코의 기본 위치

/*----------------------------api 키 넣는곳------------------------------*/

const MapComponent = ({ address, setAddress }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'api 키',
        libraries,
    });

    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (isLoaded) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: defaultCenter,
                zoom: 12,
            });

            const geocoder = new window.google.maps.Geocoder();

            const updateMarker = (location) => {
                if (markerRef.current) {
                    markerRef.current.setPosition(location);
                } else {
                    markerRef.current = new window.google.maps.Marker({
                        position: location,
                        map: map,
                    });
                }
                map.setCenter(location);
            };

            if (address) {
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK') {
                        updateMarker(results[0].geometry.location);
                    } else {
                        console.error('Geocode was not successful for the following reason: ' + status);
                    }
                });
            } else {
                updateMarker(defaultCenter);
            }

            map.addListener('click', (e) => {
                const location = e.latLng;
                geocoder.geocode({ location }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        setAddress(results[0].formatted_address);
                        updateMarker(location);
                    } else {
                        console.error('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        }
    }, [isLoaded, address, setAddress]);

    if (loadError) return <div>Error loading map</div>;
    return isLoaded ? <div ref={mapRef} style={{ width: '100%', height: '300px' }}></div> : <div>Loading...</div>;
};

MapComponent.propTypes = {
    address: PropTypes.string,
    setAddress: PropTypes.func.isRequired,
};

export default MapComponent;
