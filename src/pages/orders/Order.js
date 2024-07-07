import React from 'react';
import './Order.css'

const orders = [
  {
    id: 1,
    shop: 'xyz ',
    location: 'Rajendra Nagar',
    orderId: '178727728384680',
    date: 'Sun, Jun 30, 2024, 08:05 PM',
    items: 'Realme c3',
    totalPaid: 148,
    status: 'active', // could be 'active' or 'ordered'
  },
  {
    id: 1,
    shop: 'xyz',
    location: 'Rajendra Nagar',
    orderId: '178727728384680',
    date: 'Sun, Jun 30, 2024, 08:05 PM',
    items: 'Realme c3',
    totalPaid: 148,
    status: 'active', // could be 'active' or 'ordered'
  },
  {
    id: 1,
    shop: 'xyz',
    location: 'Rajendra Nagar',
    orderId: '178727728384680',
    date: 'Sun, Jun 30, 2024, 08:05 PM',
    items: 'realme c3',
    totalPaid: 148,
    status: 'ordered', // could be 'active' or 'ordered'
  },
  // Add more orders here
];

const OrderPage = () => {
  const activeOrders = orders.filter(order => order.status === 'active');
  const pastOrders = orders.filter(order => order.status === 'ordered');

  return (
    <div className="order-page">
      <h2>Active Orders</h2>
      <div className="order-list">
        {activeOrders.map(order => (
          <div key={order.id} className="order-card">
            <img src="/path/to/image.jpg" alt="Order" className="order-image" />
            <div className="order-details">
              <h3>{order.shop}</h3>
              <p>{order.location}</p>
              <p>ORDER #{order.orderId} | {order.date}</p>
              <p>{order.items}</p>
              <div className="order-actions">
                <button className="get-help-btn">GET HELP</button>
                <p className="total-paid">Total Paid: ₹{order.totalPaid}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Ordered</h2>
      <div className="order-list">
        {pastOrders.map(order => (
          <div key={order.id} className="order-card">
            <img src="/path/to/image.jpg" alt="Order" className="order-image" />
            <div className="order-details">
              <h3>{order.shop}</h3>
              <p>{order.location}</p>
              <p>ORDER #{order.orderId} | {order.date}</p>
              <p>{order.items}</p>
              <div className="order-actions">
                <button className="get-help-btn">GET HELP</button>
                <p className="total-paid">Total Paid: ₹{order.totalPaid}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
