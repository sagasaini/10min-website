import React, { useState } from 'react';
import AvailableCitiesModal from './AvailableCitiesModal';
import Users from './Users';
import Drivers from './Drivers';
import Orders from './Orders';
import Coupons from './Coupons';

const Dashboard = () => {
 
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const dummyOrders = [
    {
      user: 'User 1',
      userName: 'John Doe',
      restaurant: 'Restaurant 1',
      status: 'Delivered',
      orderedOn: '01/01/2024',
      total: '$25',
      quantity: 2,
    },
    {
      user: 'User 2',
      userName: 'Jane Smith',
      restaurant: 'Restaurant 2',
      status: 'In Progress',
      orderedOn: '02/01/2024',
      total: '$40',
      quantity: 3,
    },
    {
      user: 'User 3',
      userName: 'Alice Johnson',
      restaurant: 'Restaurant 3',
      status: 'Cancelled',
      orderedOn: '03/01/2024',
      total: '$15',
      quantity: 1,
    },
    {
      user: 'User 4',
      userName: 'Bob Brown',
      restaurant: 'Restaurant 4',
      status: 'Pending',
      orderedOn: '04/01/2024',
      total: '$30',
      quantity: 4,
    },
    // Add more dummy orders as needed
  ];

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? 'dashboard' : menu);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Recent 10 Orders</h2>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">User</th>
                    <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">User Name</th>
                    <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Restaurant</th>
                    <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Status</th>
                    <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Ordered On</th>
                    <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Total</th>
                    <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 text-lg text-gray-700">{order.user}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{order.userName}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{order.restaurant}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{order.status}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{order.orderedOn}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{order.total}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{order.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'cities':
        return <AvailableCitiesModal />;
      case 'users':
        return <Users />;
        case 'drivers':
          return <Drivers />;
          case 'orders':
            return <Orders />;
            case 'coupons':
              return <Coupons />;
      default:
        return <div className="mt-8">Dashboard content</div>;
    }
  };

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="flex flex-col md:flex-row md:min-h-screen w-full">
        <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white flex-shrink-0">
          <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 5h14M3 10h14M3 15h14" clipRule="evenodd"></path>
              </svg>
            </button>
            <span className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">FoodApp</span>
          </div>
          <nav className="flex-grow px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <a
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'dashboard' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('dashboard')}
            >
              Dashboard
            </a>
            <a
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'cities' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('cities')}
            >
              Available Cities
            </a>
            <a
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'users' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('users')}
            >
              Users
            </a>
            <a
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'drivers' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('drivers')}
            >
              Drivers
            </a>
            <a
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'drivers' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('orders')}
            >
              Orders
            </a>
            <a
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'drivers' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('coupons')}
            >
              Coupons
            </a>
          </nav>
        </div>

        <div className="flex-grow w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>
            <div className="flex items-center">
              <span className="text-lg text-gray-600">English</span>
              <div className="ml-4 relative">
                <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/100" alt="Admin avatar" />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 hidden">
                  <a href="#" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-200">Profile</a>
                  <a href="#" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-200">Settings</a>
                  <a href="#" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-200">Logout</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            {renderContent()}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Dashboard;
