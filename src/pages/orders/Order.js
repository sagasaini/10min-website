import React, { useEffect, useState } from 'react';
import './Order.css';

const OrderPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://10min.in/api/api/orders/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const activeOrders = orders.filter(order => order.status === 'active');
  const pastOrders = orders.filter(order => order.status === 'ordered');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                {/* <button className="get-help-btn">GET HELP</button> */}
                <p className="total-paid">Total Paid: ₹{order.amount}</p>
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
