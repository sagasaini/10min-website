import React from 'react';

const ActivateDeactivateCouponModal = ({ action, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg  p-4">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
          <p className="mb-4">To {action} this coupon!</p>
          <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700">
            Yes
          </button>
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateDeactivateCouponModal;
