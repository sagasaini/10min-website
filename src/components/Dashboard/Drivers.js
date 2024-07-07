import React from 'react';

const dummyDrivers = [
  { cover: 'https://i.pravatar.cc/50?img=1', name: 'Driver2', email: 'driver2@gmail.com', phone: '123456789', status: 'Active' },
  { cover: 'https://i.pravatar.cc/50?img=2', name: 'driver3', email: 'driver3@gmail.com', phone: '1234567890', status: 'Active' },
  // Add more dummy drivers as needed
];

const Drivers = () => {
  return (
    <div className="w-full px-4 py-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">Drivers</h2>
      <p className="text-red-600 bg-red-100 px-4 py-2 rounded-md mt-2">
        This is in test version you cannot add, delete, or edit data
      </p>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">All Drivers</h3>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Create New
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Cover</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Name</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Email</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Phone</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Status</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyDrivers.map((driver, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-lg text-gray-700">
                    <img src={driver.cover} alt="Driver cover" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4 text-lg text-gray-700">{driver.name}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">{driver.email}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">{driver.phone}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">
                    <span className={`px-4 py-1 rounded-full ${driver.status === 'Active' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-lg text-gray-700">
                    <button className="text-green-500 hover:text-green-700">View</button>
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

export default Drivers;
