import React, { useEffect, useState, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';

const libraries = ['places'];

const MapComponent = ({ addresses, mapId }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'Api키',
        libraries,
    });

    const [map, setMap] = useState(null);
    const mapRef = useRef(null); // Use ref instead of id for better control

    const mapContainerStyle = {
        width: '200px',
        height: '200px',
    };

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            const initialMap = new window.google.maps.Map(mapRef.current, {
                zoom: 12,
                disableDefaultUI: true, // Disable all default controls
                zoomControl: false, // Optionally disable zoom control
                mapTypeControl: false, // Optionally disable map type control
                streetViewControl: false, // Optionally disable street view control
                fullscreenControl: false, // Optionally disable fullscreen control
                gestureHandling: 'greedy', // Optional: Control gesture handling
            });

            setMap(initialMap);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (map && addresses.length > 0) {
            const geocoder = new window.google.maps.Geocoder();
            const bounds = new window.google.maps.LatLngBounds();

            const geocodePromises = addresses.map((address, index) => {
                return new Promise((resolve, reject) => {
                    geocoder.geocode({ address: address.address }, (results, status) => {
                        if (status === 'OK') {
                            const location = results[0].geometry.location;
                            new window.google.maps.Marker({
                                position: location,
                                map: map,
                                label: {
                                    text: `${index + 1}`,
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                },
                            });
                            bounds.extend(location);
                            resolve();
                        } else {
                            console.error('Geocode was not successful for the following reason: ' + status);
                            reject(status);
                        }
                    });
                });
            });

            Promise.all(geocodePromises).then(() => {
                map.fitBounds(bounds);
            }).catch((error) => {
                console.error('Error with geocode promises:', error);
            });
        }
    }, [map, addresses]);

    if (loadError) return <div>Error loading map</div>;
    return isLoaded ? (
        <div ref={mapRef} style={mapContainerStyle}></div> // Use ref instead of id
    ) : <div>Loading...</div>;
};

export default MapComponent;
