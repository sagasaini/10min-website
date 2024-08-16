import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg w-3/4 lg:w-1/2 relative z-10 p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl text-gray-600 mb-4">?</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Are you sure?</h2>
          <p className="text-gray-600 mb-8">To delete this city!</p>
          <div className="flex space-x-4">
            <button
              onClick={onConfirm}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
