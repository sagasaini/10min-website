import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import AddAddress from './AddAddress';
import axios from 'axios';
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useNavigate } from 'react-router-dom';
import { hideCart } from "../../store/ui";

const AddressModal = ({ onClose }) => {
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useAppDispatch();

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`https://10min.in/api/api/address/${userId}`)
        .then(response => {
          setAddresses(response.data || []);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user addresses:', error);
          setError('Failed to fetch addresses');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  const openAddAddress = () => setIsAddAddressVisible(true);
  const closeAddAddress = () => setIsAddAddressVisible(false);

  const selectAddress = (addressId) => {
    localStorage.setItem('selectedAddressId', addressId);
    onClose();
    dispatch(hideCart());  // Close the modal first
    setTimeout(() => {
      navigate('/checkout'); // Navigate to the checkout page
    }, 300); // Adjust the timeout duration as needed
  };

  return (
    <div className="absolute inset-0 z-50 flex bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-4 rounded-md shadow-lg relative">
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-2xl">Select delivery address</h2>
          <IoClose size={24} className="cursor-pointer" onClick={onClose} />
        </div>
        {!isAddAddressVisible ? (
          <div className="mt-4">
            <button onClick={openAddAddress} className="bg-green-500 text-white w-full py-2 rounded-md mb-4">
              Add a new address
            </button>
            {loading ? (
              <p className="text-gray-600">Loading addresses...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : addresses.length > 0 ? (
              addresses.map((address, index) => (
                <div key={index} className="border p-2 mb-2 rounded-md cursor-pointer" onClick={() => selectAddress(address._id)}>
                  <p>{address.flatNumber}, {address.locality}</p>
                  <p>{address.city}, {address.state} {address.zip}</p>
                  
                  <button
            className="bg-blue-500 text-white py-1 px-2 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress(address);
            }}
          >
            Edit
          </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No saved addresses found</p>
            )}
          </div>
        ) : (
          <AddAddress onClose={closeAddAddress} />
        )}
      </div>
      {isModalOpen && (
        <AddAddress onClose={handleCloseModal} billingAddress={[selectedAddress]} />
      )}
    </div>
  );
};

export default AddressModal;
