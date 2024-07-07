// src/components/DeliveryTracking.js
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './style.css';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 40.712776,
  lng: -74.005974
};

const DeliveryTracking = () => {
  const [location, setLocation] = useState(center);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: 'John Doe',
    contact: '+1234567890',
    eta: '15 mins'
  });

  // Mock location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLocation(prevLocation => ({
        lat: prevLocation.lat + (Math.random() - 0.5) * 0.001,
        lng: prevLocation.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000); // Update location every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="delivery-tracking">
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
      <div className="delivery-details">
        <h2>Delivery Details</h2>
        <p><strong>Name:</strong> {deliveryDetails.name}</p>
        <p><strong>Contact:</strong> {deliveryDetails.contact}</p>
        <p><strong>ETA:</strong> {deliveryDetails.eta}</p>
      </div>
    </div>
  );
};

export default DeliveryTracking;
