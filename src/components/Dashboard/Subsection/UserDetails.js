import React, { useState } from 'react';

const UserDetails = ({ user }) => {
  const [activeTab, setActiveTab] = useState('Orders');

  if (!user) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold">User Not Found</h1>
      </div>
    );
  }

  // Assuming user data includes dynamically fetched fields
  const {
    name = 'Unknown Name',
    email = 'Unknown Email',
    phone = 'Unknown Phone',
    image = 'https://via.placeholder.com/150', // Default image
    orders = 0,
    addresses = [],
    reviews = [],
  } = user;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <h1 className="text-2xl font-semibold mb-4 sm:mb-0">User Details</h1>
        <div className="flex mt-4 sm:mt-0">
          <div className="text-center mx-4">
            <h3 className="text-xl font-semibold">{orders}</h3>
            <p>Orders</p>
          </div>
          <div className="text-center mx-4">
            <h3 className="text-xl font-semibold">{addresses.length}</h3>
            <p>Addresses</p>
          </div>
          <div className="text-center mx-4">
            <h3 className="text-xl font-semibold">{reviews.length}</h3>
            <p>Reviews</p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <img src={image} alt="User Icon" className="w-16 h-16 rounded-full" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap justify-center">
            <button
              className={`px-4 py-2 mx-2 mb-2 ${activeTab === 'Orders' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('Orders')}
            >
              Orders
            </button>
            <button
              className={`px-4 py-2 mx-2 mb-2 ${activeTab === 'Addresses' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('Addresses')}
            >
              Addresses
            </button>
            <button
              className={`px-4 py-2 mx-2 mb-2 ${activeTab === 'Reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('Reviews')}
            >
              Reviews
            </button>
          </div>
          <div className="mt-4">
            {activeTab === 'Orders' && (orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="flex items-center">
                    <img src="/path/to/restaurant-image.png" alt="Restaurant" className="w-16 h-16 rounded-full" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{order.restaurantName}</h3>
                      <p>{order.restaurantAddress}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p><strong>ITEMS:</strong> {order.items}</p>
                    <p><strong>ORDERED ON:</strong> {order.orderedOn}</p>
                    <p><strong>TOTAL AMOUNT:</strong> {order.totalAmount}</p>
                    <p className={`text-${order.orderStatus === 'rejected' ? 'red' : 'green'}-500`}>
                      <strong>Your Order is {order.orderStatus}</strong>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders available</p>
            ))}
            {activeTab === 'Addresses' && (addresses.length > 0 ? (
              addresses.map((address, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p>{address}</p>
                </div>
              ))
            ) : (
              <p>No addresses available</p>
            ))}
            {activeTab === 'Reviews' && (reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p>{review}</p>
                </div>
              ))
            ) : (
              <p>No reviews available</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
