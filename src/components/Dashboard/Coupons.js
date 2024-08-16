import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivateDeactivateCouponModal from './Subsection/ActivateDeactivateCouponModal'; // Adjust the path as needed

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [modalAction, setModalAction] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    expire: '',
    availableOn: '',
    isActive: false,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('https://10min.in/api/api/coupon');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleToggleClick = (coupon, action) => {
    setSelectedCoupon(coupon);
    setModalAction(action);
  };

  const handleCloseModal = () => {
    setSelectedCoupon(null);
    setModalAction('');
  };

  const handleConfirmAction = async () => {
    try {
      await axios.put(`https://10min.in/api/api/coupon/${selectedCoupon._id}`, {
        ...selectedCoupon,
        isActive: !selectedCoupon.isActive
      });
      fetchCoupons(); // Refresh the coupons list
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
    handleCloseModal();
  };

  const handleAddCoupon = async () => {
    try {
      await axios.post('https://10min.in/api/api/coupon', newCoupon);
      fetchCoupons(); // Refresh the coupons list
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
    setShowAddForm(false);
    setNewCoupon({
      code: '',
      discount: '',
      expire: '',
      availableOn: '',
      isActive: false,
    });
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      await axios.delete(`https://10min.in/api/api/coupon/${couponId}`);
      fetchCoupons(); // Refresh the coupons list
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showAddForm ? 'Cancel' : 'Add Coupon'}
        </button>
      </div>
      {showAddForm && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Add New Coupon</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCoupon();
            }}
          >
            <div className="mb-2">
              <label className="block text-gray-700">Coupon Code</label>
              <input
                type="text"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Discount</label>
              <input
                type="text"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Expire Date</label>
              <input
                type="date"
                value={newCoupon.expire}
                onChange={(e) => setNewCoupon({ ...newCoupon, expire: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Available On</label>
              <input
                type="text"
                value={newCoupon.availableOn}
                onChange={(e) => setNewCoupon({ ...newCoupon, availableOn: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add Coupon
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Coupon Code</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Discount</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Expire</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Available On</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.code}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.discount}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.expire}</td>
                <td className="py-2 px-4 text-lg text-gray-700">{coupon.availableOn}</td>
                <td className="py-2 px-4 text-lg text-gray-700">
                  <button
                    onClick={() => handleToggleClick(coupon, coupon.isActive ? 'deactivate' : 'activate')}
                    className={`text-${coupon.isActive ? 'red' : 'green'}-500 hover:underline mr-4`}
                  >
                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(coupon._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCoupon && (
        <ActivateDeactivateCouponModal
          action={modalAction}
          onConfirm={handleConfirmAction}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Coupons;
