import React from 'react';

const dummyOrders = [
  {
    id: 'aNXxk83Wnw',
    user: 'User 1',
    userName: 'John Doe',
    status: 'Rejected',
    orderedOn: 'Sun, Jan 1, 2023 4:15 PM',
    total: '$116.32',
    quantity: 2,
  },
  {
    id: 'Cg0b2eHTVd',
    user: 'User 2',
    userName: 'Jane Smith',
    status: 'Rejected',
    orderedOn: 'Sun, Oct 9, 2022 9:50 AM',
    total: '$159.88',
    quantity: 2,
  },
  // Add more dummy orders as needed
];

const Orders = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        This is in test version you can not add, delete or edit data
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">User</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">User Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Status</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Ordered On</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Total</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Quantity</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-lg text-gray-700">{order.id}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.user}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.userName}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.status}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.orderedOn}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.total}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{order.quantity}</td>
                <td className="py-2 px-4 text-lg text-gray-700">
                  <a href="#" className="text-blue-500 hover:underline">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
