// Harsh k, [15-08-2024 22:45]
import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '500px',
  height: '500px',
};

const Location=() => {
  const [address, setAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState({
    lat: 40.7128,
    lng: -74.0060,
  });

  const autocompleteRef = useRef(null);

  // Handle marker drag and update position and address
  const onMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });

    // Fetch the address using Geocoding API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results[0]) {
      setAddress(data.results[0].formatted_address);
    }
  };

  // Handle place selection in Autocomplete
  const onPlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarkerPosition({ lat, lng });
      setAddress(place.formatted_address);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });

          // Manually trigger a marker drag event
          const fakeEvent = {
            latLng: {
              lat: () => latitude,
              lng: () => longitude,
            },
          };
          onMarkerDragEnd(fakeEvent);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const relocateCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition({ lat: latitude, lng: longitude });

        // Manually trigger a marker drag event
        const fakeEvent = {
          latLng: {
            lat: () => latitude,
            lng: () => longitude,
          },
        };
        onMarkerDragEnd(fakeEvent);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  return isLoaded ? (
    <div className="flex gap-28 justify-center items-center h-screen w-screen bg-amber-500">
      <div>
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: '500px', height: '500px' }}
            center={markerPosition}
            zoom={12}
            gestureHandling={'greedy'} // or 'auto', 'none' based on your needs
            disableDefaultUI={false}
          >
            <Marker
              position={markerPosition}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
          </Map>
        </APIProvider>
      </div>

Harsh k, [15-08-2024 22:45]
<div className="w-[400px] h-[200px] rounded-lg bg-white p-4">
        <div className="mt-6 flex flex-col max-w-md gap-10 m-2 gap-x-4">
          <label htmlFor="address-input" className="sr-only">
            Address
          </label>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceSelected}
          >
            <input
              id="address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter or select your address"
              className="min-w-0 flex-auto w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-blue-700 placeholder:text-blue-300 shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
            />
          </Autocomplete>
          <button
            type="button"
            onClick={relocateCurrentLocation}
            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Relocate to Current Location
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Location;