import React, { useState } from 'react';

const OrderDetails = ({ order, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    pincode: '',
    amount: '',
    paymentId: '',
    email: '',
    userid: '',
    products: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://10min.in/api/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Order created:', data);
        onClose();
      })
      .catch((error) => console.error('Error creating order:', error));
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg w-3/4 lg:w-1/2 relative z-10 p-4">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Order Details</h2>
          <button onClick={onClose} className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">{order.restaurantName}</h3>
              <p className="text-gray-600">{order.restaurantAddress}</p>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-semibold">{order.userName}</span>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-lg">Items</h4>
            <p>{order.items}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-lg">Ordered On</h4>
            <p>{order.orderedOn}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-lg">Total Amount</h4>
            <p>{order.total}</p>
          </div>
          <div className="text-red-600">
            <p>{order.status}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Create New Order</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input type="text" name="amount" value={formData.amount} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Payment ID</label>
                <input type="text" name="paymentId" value={formData.paymentId} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">User ID</label>
                <input type="text" name="userid" value={formData.userid} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Products</label>
                <input type="text" name="products" value={formData.products} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
