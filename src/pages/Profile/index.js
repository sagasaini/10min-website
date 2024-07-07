// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import './style.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock data for orders
    const mockOrders = [
      { id: 1, date: '2023-06-01', total: '$150', status: 'Delivered' },
      { id: 2, date: '2023-05-15', total: '$80', status: 'Processing' },
      { id: 3, date: '2023-04-20', total: '$120', status: 'Shipped' },
    ];
    setOrders(mockOrders);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated user info
    console.log('Updated user info:', user);
  };

  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <div className="profile-container">
        <div className="profile-details">
          <h2>User Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>

        <div className="order-history">
          <h2>Order History</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
