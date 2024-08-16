import React, { useEffect, useState } from 'react';
import map from '../../assets/images/map.jpg';
import playstore from '../../assets/images/google-play.jpg';
import appstore from '../../assets/images/app-store.jpg';
import { Link } from 'react-router-dom';


const OrderStatus = () => {
  const [cartData, setCartData] = useState({ subTotal: 0 });
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState([]);
  const [time, setTime] = useState(10); // Setting the initial time as 10 minutes (you can adjust this)
  const userId = localStorage.getItem('userId');
  const id = localStorage.getItem('selectedAddressId');

  useEffect(() => {
    const fetchCartAmount = async () => {
      try {
        const response = await fetch(`https://10min.in/api/api/cart/get/${userId}`);
        const data = await response.json();
        setAmount(data.subTotal);
        const subTotal = data.reduce((total, item) => total + item.subTotal, 0);
        setCartData({
          subTotal,
        });
      } catch (error) {
        console.error('Error fetching cart amount:', error);
      }
    };

    const fetchAddress = async () => {
      try {
        const response = await fetch(`https://10min.in/api/api/address/get/${userId}/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAddress(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchCartAmount();
    fetchAddress();

    // Update the arrival time every minute
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 60000);

    return () => clearInterval(timer);
  }, [userId, id]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-medium text-gray-600 mt-2">Order is on the way</h2>
        <h1 className="text-4xl font-bold mt-2">Arriving in {time} minutes</h1>
        {address.map((addr) => (
          <div key={addr.id} style={{ display:'flex', padding: '10px', margin: '10px 0' }}>
            <p><strong>Type:</strong> {addr.addressType}</p>
            <p><strong>Name:</strong> {addr.name}</p>
            <p><strong>Flat Number:</strong> {addr.flatNumber}</p>
            {addr.floor && <p><strong>Floor:</strong> {addr.floor}</p>}
            <p><strong>Locality:</strong> {addr.locality}</p>
            {addr.landmark && <p><strong>Landmark:</strong> {addr.landmark}</p>}
            {addr.phone && <p><strong>Phone:</strong> {addr.phone}</p>}
          </div>
        ))}
        <p className="text-lg font-medium mt-2">Total Amount ₹{cartData.subTotal}</p>
    <Link to='/setting'>    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">View Order Details</button></Link>
      </div>
      <div className="bg-green-100 p-4 rounded-md">
        <h3 className="text-xl font-bold text-center mb-4">Track your order</h3>
        <div className="flex justify-center">
          <img src={map} alt="Map" className="w-64 h-64" />
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-gray-200 px-4 py-2 rounded-md mx-2">
            <img src={playstore} alt="Google Play" />
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-md mx-2">
            <img src={appstore} alt="App Store" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
