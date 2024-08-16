import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const AddAddress = ({ onClose, billingAddress }) => {
  const defaultCenter = {
    lat: 28.7041, // Latitude for New Delhi
    lng: 77.1025  // Longitude for New Delhi
  };

  const [addressType, setAddressType] = useState('Home');
  const [flatNumber, setFlatNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [locality, setLocality] = useState('');
  const [landmark, setLandmark] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lat, setLat] = useState(defaultCenter.lat);
  const [lng, setLng] = useState(defaultCenter.lng);

  useEffect(() => {
    if (billingAddress && billingAddress.length > 0) {
      setAddressType(billingAddress[0].addressType || 'Home');
      setFlatNumber(billingAddress[0].flatNumber || '');
      setFloor(billingAddress[0].floor || '');
      setLocality(billingAddress[0].locality || '');
      setLandmark(billingAddress[0].landmark || '');
      setName(billingAddress[0].name || '');
      setPhone(billingAddress[0].phone || '');
      setLat(billingAddress[0].lat || defaultCenter.lat);
      setLng(billingAddress[0].lng || defaultCenter.lng);
    }
  }, [billingAddress]);

  const handleDetectLocation = async () => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;

      const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`);
      const locationData = locationResponse.data;
      const locationString = `${locationData.city}, ${locationData.regionName}, ${locationData.zip}`;

      setLocality(locationString);
      setLat(locationData.lat);
      setLng(locationData.lon);
    } catch (error) {
      console.error('Error detecting location:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addressData = {
      userId: localStorage.getItem('userId'), // Replace with the actual user ID
      addressType,
      flatNumber,
      floor,
      locality,
      landmark,
      name,
      phone
    };

    const userId = localStorage.getItem('userId'); // Replace with actual user ID
    const addressId = billingAddress[0]._id;

    try {
      const response = await fetch(`https://10min.in/api/api/address/update/${userId}/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Address updated:', result);
        onClose();
      } else {
        console.error('Failed to update address');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 p-6 relative overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold">Update Address</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-48 md:h-auto">
            <MapComponent defaultCenter={{ lat, lng }} />
            <button
              className="bg-green-500 text-white w-full py-2 rounded-md mt-4"
              onClick={handleDetectLocation}
            >
              Go to current location
            </button>
          </div>
          <div className="w-full md:w-1/2 md:ml-4 mt-16 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Save address as *
                </label>
                <div className="flex space-x-2">
                  {['Home', 'Work', 'Hotel', 'Other'].map(type => (
                    <button
                      type="button"
                      key={type}
                      className={`py-2 px-4 rounded ${addressType === type ? 'bg-gray-400' : 'bg-gray-200'}`}
                      onClick={() => setAddressType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Flat / House no / Building name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={flatNumber}
                  onChange={(e) => setFlatNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Floor (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Area / Sector / Locality *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Nearby landmark (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Your name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Your phone number (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded w-full"
              >
                Update Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
