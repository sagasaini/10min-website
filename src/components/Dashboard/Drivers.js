import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DriverForm from './Subsection/DriverForm'; // Make sure the path is correct

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('https://10min.in/api/api/driver');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setError('Error fetching drivers. Please try again later.');
      }
    };

    fetchDrivers();
  }, []);

  const handleView = (driver) => {
    setSelectedDriver(driver);
    setIsFormOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedDriver(null);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  const handleSave = async (driver) => {
    try {
      let response;
      if (selectedDriver) {
        // Update existing driver
        response = await axios.put(`https://10min.in/api/api/driver/update/${selectedDriver._id}`, driver, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        // Create new driver
        response = await axios.post('https://10min.in/api/api/driver/create', driver, {
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      setDrivers(prevDrivers =>
        selectedDriver
          ? prevDrivers.map(d => d._id === selectedDriver._id ? response.data : d)
          : [...prevDrivers, response.data]
      );
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving driver:', error.response ? error.response.data : error.message);
      setError('Error saving driver. Please try again later.');
    }
  };
  

  const handleDelete = async (driverId) => {
    try {
      await axios.delete(`https://10min.in/api/api/driver/delete/${driverId}`);
      setDrivers(prevDrivers => prevDrivers.filter(d => d._id !== driverId));
    } catch (error) {
      console.error('Error deleting driver:', error);
      setError('Error deleting driver. Please try again later.');
    }
  };

  return (
    <div className="w-full px-4 py-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">Drivers</h2>
      {error && (
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded-md mt-2">
          {error}
        </p>
      )}
      {isFormOpen ? (
        <DriverForm driver={selectedDriver} onCancel={handleCancel} onSave={handleSave} />
      ) : (
        <>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">All Drivers</h3>
              <button onClick={handleCreateNew} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
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
                  {drivers.map((driver, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 text-lg text-gray-700">
                        <img src={driver.cover} alt="Driver cover" className="w-10 h-10 rounded-full" />
                      </td>
                      <td className="py-2 px-4 text-lg text-gray-700">{driver.name}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{driver.email}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">{driver.phone}</td>
                      <td className="py-2 px-4 text-lg text-gray-700">
                        <span className={`px-4 py-1 rounded-full ${driver.status.toLowerCase() === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}>
                          {driver.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-lg text-gray-700 flex space-x-2">
                        <button onClick={() => handleView(driver)} className="text-green-500 hover:text-green-700">View</button>
                        <button onClick={() => handleDelete(driver._id)} className="text-red-500 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Drivers;
