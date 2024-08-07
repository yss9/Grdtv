import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

const libraries = ['places'];

const MapComponent = ({ addresses }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'api키',
        libraries,
    });

    const [map, setMap] = useState(null);

    const mapContainerStyle = {
        width: '200px',
        height: '200px',
    };

    useEffect(() => {
        if (isLoaded) {
            const mapElement = document.getElementById('map');
            const initialMap = new window.google.maps.Map(mapElement, {
                zoom: 12,
                disableDefaultUI: true, // Disable all default controls
                zoomControl: false, // Optionally disable zoom control
                mapTypeControl: false, // Optionally disable map type control
                streetViewControl: false, // Optionally disable street view control
                fullscreenControl: false, // Optionally disable fullscreen control
                gestureHandling: 'greedy' // Optional: Control gesture handling
            });

            setMap(initialMap);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (map && addresses.length > 0) {
            const geocoder = new window.google.maps.Geocoder();
            const bounds = new window.google.maps.LatLngBounds();

            let geocodePromises = addresses.map((address, index) => {
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
        <div id="map" style={mapContainerStyle}></div>
    ) : <div>Loading...</div>;
};

export default MapComponent;
