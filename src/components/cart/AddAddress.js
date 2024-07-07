import React from 'react';
import MapComponent from './MapComponent';

const AddAddress = ({ onClose }) => {
  const defaultCenter = {
    lat: 28.7041, // Latitude for New Delhi
    lng: 77.1025  // Longitude for New Delhi
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Enter complete address</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <MapComponent defaultCenter={defaultCenter} />
            <button className="bg-green-500 text-white w-full py-2 rounded-md mt-4">
              Go to current location
            </button>
          </div>
          <div className="w-full md:w-1/2 md:ml-4">
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Save address as *
                </label>
                <div className="flex space-x-2">
                  <button type="button" className="bg-gray-200 py-2 px-4 rounded">Home</button>
                  <button type="button" className="bg-gray-200 py-2 px-4 rounded">Work</button>
                  <button type="button" className="bg-gray-200 py-2 px-4 rounded">Hotel</button>
                  <button type="button" className="bg-gray-200 py-2 px-4 rounded">Other</button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Flat / House no / Building name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
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
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Area / Sector / Locality *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  required
                  defaultValue="Pocket B, South City I, Sector 30, Gurugram"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Nearby landmark (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Your name *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
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
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded w-full"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
