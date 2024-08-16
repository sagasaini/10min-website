import React, { useState, useEffect } from 'react';
import OrderDetails from './Subsection/OrderDetails';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetch('https://10min.in/api/api/orders')
      .then(response => response.json())
      .then(data => {
        const mappedOrders = data.map(order => ({
          id: order._id,
          user: order.userid,
          userName: order.name,
          orderedOn: new Date(order.createdAt).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
          status: order.status,
          total: typeof order.amount === 'number' ? `$${order.amount.toFixed(2)}` : 'Invalid amount',
          quantity: order.products.length,
          restaurantName: order.restaurantName,
          restaurantAddress: order.address,
          items: order.products.map(p => `${p.quantity} X ${p.name}`).join(', '),
          statusMessage: order.statusMessage,
        }));
        setOrders(mappedOrders);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleViewClick = async (order) => {
    try {
      const userResponse = await fetch(`https://10min.in/api/api/users/${order.user}`);
      const userData = await userResponse.json();
      setUserDetails(userData);

      setSelectedOrder(order);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setUserDetails(null);
  };

  const handleDeleteClick = async (orderId) => {
    try {
      await fetch(`https://10min.in/api/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">USER</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">USER NAME</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">ORDERED ON</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">STATUS</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">TOTAL</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">QUANTITY</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-lg text-gray-700">{order.id}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.user}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.userName}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.orderedOn}</td>
                <td className="py-2 px-4 text-lg text-gray-700">
                  <span className={`px-2 py-1 rounded-full ${order.status === 'Rejected' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.total}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.quantity}</td>
                <td className="py-2 px-4 text-lg text-gray-700">
                  <button onClick={() => handleViewClick(order)} className="text-blue-500 hover:underline mr-2">View</button>
                  <button onClick={() => handleDeleteClick(order.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && <OrderDetails order={selectedOrder} user={userDetails} onClose={handleClose} />}
    </div>
  );
};

export default Orders;
