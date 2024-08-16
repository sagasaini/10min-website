import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShopModal from './Subsection/ShopModal';

const Shop = () => {
  const [shops, setShops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('https://10min.in/api/api/shop/shops');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    fetchShops();
  }, []);

  const handleViewClick = (shop) => {
    setSelectedShop(shop);
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setSelectedShop(null);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shops</h1>
        <button
          onClick={handleCreateClick}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Create New
        </button>
      </div>
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Cover</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Address</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Price</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Rating</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Status</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr key={shop._id}>
                <td className="py-2 px-4">
                  <img src={shop.coverImage} alt={shop.name} className="w-16 h-16 rounded" />
                </td>
                <td className="py-2 px-4">{shop.name}</td>
                <td className="py-2 px-4">{shop.address}</td>
                <td className="py-2 px-4">{shop.price}</td>
                <td className="py-2 px-4">{shop.rating || 'N/A'}</td>
                <td className="py-2 px-4">{shop.status || 'Active'}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleViewClick(shop)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ShopModal show={showModal} onClose={() => setShowModal(false)} shop={selectedShop} />
    </div>
  );
};

export default Shop
