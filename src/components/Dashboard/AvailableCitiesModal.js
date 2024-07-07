// AvailableCitiesPage.js
import React from 'react';

const dummyCities = [
  { name: 'Vadodara', status: 'Active' },
  { name: 'Bhavnagar', status: 'Active' },
  { name: 'Surat', status: 'Inactive' },
  // Add more dummy cities as needed
];

const AvailableCitiesPage = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="px-6 py-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-semibold text-gray-700">Available Cities</h2>
      </div>
      <div className="px-6 py-4">
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded-md">This is in test version, you cannot add, delete, or edit data</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">All Cities</h3>
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Name</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Status</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyCities.map((city, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-lg text-gray-700">{city.name}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">{city.status}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">
                    <button className="text-green-500 hover:text-green-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AvailableCitiesPage;
