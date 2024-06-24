import React, { useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const MapComponent = ({ address }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCJ0rxsT0b6Pxc0xhFLqty7DN0n_gXqkrw',
        libraries,
    });

    const mapContainerStyle = {
        width: '600px',
        height: '300px',
    };

    const center = {
        lat: 37.7749,
        lng: -122.4194,
    };

    useEffect(() => {
        if (isLoaded) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK') {
                    const map = new window.google.maps.Map(document.getElementById('map'), {
                        center: results[0].geometry.location,
                        zoom: 12,
                    });

                    new window.google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                    });
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    }, [isLoaded, address]);

    if (loadError) return <div>Error loading map</div>;
    return isLoaded ? <div id="map" style={mapContainerStyle}></div> : <div>Loading...</div>;
};

export default MapComponent;
