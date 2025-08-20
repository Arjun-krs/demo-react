import * as toGeoJSON from '@mapbox/togeojson';
import mapboxgl from 'mapbox-gl';

// fitToCurrentLocation.js
export function fitToCurrentLocation(map, markerRef) {
    if (!map) return;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Fly to location
                map.flyTo({
                    center: [longitude, latitude],
                    zoom: 14,
                    essential: true,
                });

                // Add or update marker
                if (markerRef.current) {
                    markerRef.current.setLngLat([longitude, latitude]);
                } else {
                    markerRef.current = new mapboxgl.Marker({ color: '#0088ff' })
                        .setLngLat([longitude, latitude])
                        .addTo(map);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    } else {
        console.warn("Geolocation is not supported by this browser.");
    }
}

// For vehicle icon
export const getVehicleIcon = (vehicleType) => {
    switch (vehicleType?.toLowerCase()) {
        case 'tractor':
            return '/icons/tractor.svg';
        case 'lorry':
        case 'trailer':
            return '/icons/lorry.svg';
        case 'car':
            return '/icons/car.svg';
        case 'bike':
            return '/icons/bike.svg';
        case 'hillux':
            return '/icons/hilux.svg';
        case 'stream_roller':
            return '/icons/stream_roller.svg';
        default:
            return '/icons/truck.svg';
    }
};

// vehicle marker for tracking
export function createVehicleMarker(vehicleType, lngLat) {
    const wrapper = document.createElement('div');
    wrapper.style.width = '30px';
    wrapper.style.height = '75px';

    const icon = document.createElement('div');
    icon.className = 'vehicle-marker';
    icon.style.width = '100%';
    icon.style.height = '100%';
    icon.style.backgroundImage = `url(${getVehicleIcon(vehicleType)})`;
    icon.style.backgroundSize = 'contain';
    icon.style.backgroundRepeat = 'no-repeat';
    icon.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))';
    icon.style.transformOrigin = 'center center';
    wrapper.appendChild(icon);

    const marker = new mapboxgl.Marker({
        element: wrapper,
        anchor: 'center',
        offset: [0, 0]
    }).setLngLat(lngLat);

    marker.iconElement = icon;
    return marker;
}

// Time formattor for info card
export function formatDateTime(dateString) {
    if (!dateString) return "";

    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year}  ${hours}:${minutes}:${seconds}`;
}

export function formatTime(dateString) {
    if (!dateString) return "";

    const dateObj = new Date(dateString);
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    return `  ${hours}:${minutes}:${seconds}`;
}