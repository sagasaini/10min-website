import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import AddAddress from './AddAddress';

const AddressModal = ({ onClose }) => {
  const [isAddAddressVisible, setIsAddAddressVisible] = useState(false);

  const openAddAddress = () => setIsAddAddressVisible(true);
  const closeAddAddress = () => setIsAddAddressVisible(false);

  return (
    <div className="absolute inset-0 z-50 flex bg-black bg-opacity-50 ">
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
            <p className="text-gray-600">Your saved address</p>
          </div>
        ) : (
          <AddAddress onClose={closeAddAddress} />
        )}
      </div>
    </div>
  );
};

export default AddressModal;
