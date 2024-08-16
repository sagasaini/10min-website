import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopModal = ({ show, onClose, shop }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    name: '',
    address: '',
    price: '',
    openingTime: '',
    closingTime: '',
    deliveryTime: '',
    description: '',
    city: '',
    coverImage: null,
  });

  useEffect(() => {
    if (shop) {
      setFormData({
        firstName: shop.firstName || '',
        lastName: shop.lastName || '',
        email: shop.email || '',
        contactNo: shop.contactNo || '',
        name: shop.name || '',
        address: shop.address || '',
        price: shop.price || '',
        closingTime: shop.closingTime || '',
        openingTime: shop.openingTime || '',
        deliveryTime: shop.deliveryTime || '',
        description: shop.description || '',
        city: shop.city || '',
        coverImage: null, // Handle coverImage separately
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        name: '',
        address: '',
        price: '',
        closingTime: '',
        openingTime: '',
        deliveryTime: '',
        description: '',
        city: '',
        coverImage: null,
      });
    }
  }, [shop, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      coverImage: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'contactNo', 'name', 'address', 'price', 'closingTime', 'openingTime', 'deliveryTime'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Field ${field} is required`);
        return false;
      }
    }
    return true;
  };

  const createShop = async () => {
    const url = 'https://10min.in/api/api/shop/shops';
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });
    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onClose();
    } catch (error) {
      console.error('Error creating shop:', error.response ? error.response.data : error.message);
    }
  };

  const updateShop = async () => {
    const url = `https://10min.in/api/api/shop/shops/${shop._id}`;
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    });
    // console.log(formData)

    try {
      await axios.put(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onClose();
    } catch (error) {
      console.error('Error updating shop:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (shop) {
      updateShop();
    } else {
      createShop();
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://10min.in/api/api/shop/shops/${shop._id}`);
      onClose();
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-4 sm:mx-6 lg:mx-8 overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">
          {shop ? 'Edit Shop' : 'Create New Shop'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Shop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Opening Time</label>
            <input
              type="text"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Closing Time</label>
            <input
              type="text"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Delivery Time (in minutes)</label>
            <input
              type="text"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            ></textarea>
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={handleFileChange}
              className="mt-1 block w-full border rounded-lg p-2"
            />
          </div> */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {shop ? 'Update Shop' : 'Create Shop'}
            </button>
            {shop && (
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                onClick={handleDelete}
              >
                Delete Shop
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopModal;
