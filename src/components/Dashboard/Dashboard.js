import React, { useEffect, useState } from 'react';
import AvailableCitiesModal from './AvailableCitiesModal';
import Users from './Users';
import Drivers from './Drivers';
import Orders from './Orders';
import Coupons from './Coupons';
import OrderDetails from './Subsection/OrderDetails';
import Shops from './Shops';
import Product from './Product';
import Category from './Category';
import { IoMdMenu } from "react-icons/io";
import logo from '../../assets/imgs/theme/logo.jpg';
import SubCategory from './SubCategory';
import axios from 'axios';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleViewClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://10min.in/api/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? 'dashboard' : menu);
    setIsMobileMenuOpen(!isMobileMenuOpen)
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">All Users</h3>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Image</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Name</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Email</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Phone</th>
                {/* <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-lg text-gray-700">
                    <img src={user.cover} alt="User cover" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4 text-lg text-gray-700">{user.name}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">{user.email}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">{user.phone}</td>
                  {/* <td className="py-2 px-4 text-lg text-gray-700">
                    <button onClick={() => handleViewUser(user)} className="text-blue-500 hover:text-blue-700">View</button>
                  </td> */}
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
      case 'shops':
        return <Shops />;
      case 'product':
        return <Product />;
      case 'category':
        return <Category />;
        case 'subcategory':
        return <SubCategory />;
      default:
        return <div className="mt-8">Dashboard content</div>;
    }
  };

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="flex flex-col md:flex-row md:min-h-screen w-full">
        <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white flex-shrink-0">
          <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <div 
              className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
             <IoMdMenu />
            </div>
            <div className="p-4">
              <img
                src={logo}
                alt="Logo"
                className="object-contain rounded-lg focus:outline-none focus:shadow-outline"
                style={{ height: '100px' }}
              />
            </div>
          </div>
          <div className={`flex-grow px-4 pb-4 md:pb-0 md:overflow-y-auto ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'dashboard' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('dashboard')}
            >
              Dashboard
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'cities' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('cities')}
            >
              Available Cities
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'shops' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('shops')}
            >
              Shops
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'users' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('users')}
            >
              Users
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'drivers' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('drivers')}
            >
              Drivers
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'orders' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('orders')}
            >
              Orders
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'coupons' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('coupons')}
            >
              Coupons
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'category' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('category')}
            >
              Category
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'subcategory' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('subcategory')}
            >
              Sub Category
            </div>
            <div
              className={`block px-4 py-2 mt-2 text-lg font-semibold rounded-lg hover:bg-gray-200 cursor-pointer ${activeMenu === 'product' ? 'bg-gray-200 text-gray-900' : 'text-gray-600'}`}
              onClick={() => toggleMenu('product')}
            >
              Products
            </div>
          </div>
        </div>
        <div className="w-full p-8 overflow-hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>
            <div className="flex items-center">
              <span className="text-lg text-gray-600">English</span>
              <div className="ml-4 relative">
                <img
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src="https://i.pravatar.cc/100"
                  alt="Admin avatar"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                />
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 ${isProfileDropdownOpen ? 'block' : 'hidden'}`}
                >
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
      {selectedOrder && <OrderDetails order={selectedOrder} onClose={handleClose} />}
    </div>
  );
};

export default Dashboard;
