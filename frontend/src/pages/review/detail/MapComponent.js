import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Rnd } from 'react-rnd'; // Import Rnd from react-rnd

const libraries = ['places'];

const MapComponent = ({ addresses }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCB8gNH_zw9UV7DBo8g9T5jHVjCR6KbgdY',
        libraries,
    });

    const [map, setMap] = useState(null);

    const [size, setSize] = useState({ width: 600, height: 300 }); // Default size

    const mapContainerStyle = {
        width: size.width,
        height: size.height,
    };

    useEffect(() => {
        if (isLoaded) {
            const mapElement = document.getElementById('map');
            const initialMap = new window.google.maps.Map(mapElement, {
                zoom: 12,
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
        <Rnd
            default={{
                x: 0,
                y: 0,
                width: 600,
                height: 300,
            }}
            minWidth={300}
            minHeight={200}
            bounds="parent"
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                });
            }}
        >
            <div id="map" style={mapContainerStyle}></div>
        </Rnd>
    ) : <div>Loading...</div>;
};

export default MapComponent;
