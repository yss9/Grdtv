export const searchPlaceInCountry = async (query) => {
    const url = `/api/search-place?country=$KR&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Search Response JSON:', data);
        if (data.status === "OK") {
            const latLng = extractLatLng(data);
            console.log(`Latitude: ${latLng.lat}, Longitude: ${latLng.lng}`);
        } else {
            console.log('No results found or an error occurred:', data.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const extractLatLng = (data) => {
    if (data.results && data.results[0]) {
        return {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
        };
    }
    return { lat: null, lng: null };
};

