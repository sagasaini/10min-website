import React, { useState, useEffect } from 'react';
import ConfirmModal from './Subsection/ConfirmModal';
import axios from 'axios';

const AvailableCitiesPage = () => {
  const [cities, setCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [cityToEdit, setCityToEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch cities on component mount
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://10min.in/api/api/city');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleDeleteClick = (cityId) => {
    setCityToEdit(cityId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCityToEdit(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://10min.in/api/api/city/${cityToEdit}`);
      setCities(cities.filter((city) => city._id !== cityToEdit));
      setIsModalOpen(false);
      console.log('City deleted');
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const handleAddCityClick = () => {
    setIsEditMode(false);
    setIsAddCityModalOpen(true);
  };

  const handleEditCityClick = (city) => {
    setIsEditMode(true);
    setCityToEdit(city);
    setNewCityName(city.city);
    setIsAddCityModalOpen(true);
  };

  const handleAddCityCloseModal = () => {
    setIsAddCityModalOpen(false);
    setNewCityName('');
    setCityToEdit(null);
  };

  const handleAddCityConfirm = async () => {
    try {
      if (isEditMode) {
        const response = await axios.put(`https://10min.in/api/api/city/${cityToEdit._id}`, { city: newCityName });
        setCities(cities.map((city) => (city._id === cityToEdit._id ? response.data : city)));
      } else {
        const response = await axios.post('https://10min.in/api/api/city', { city: newCityName });
        setCities([...cities, response.data]);
      }
      handleAddCityCloseModal();
    } catch (error) {
      console.error('Error adding/updating city:', error);
    }
  };

  const handleViewCityClick = (city) => {
    alert(`City: ${city.city}\nStatus: ${city.status || 'N/A'}`);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="px-6 py-4 flex justify-between items-center border-b">
        <h2 className="text-2xl font-semibold text-gray-700">Available Cities</h2>
        <button
          onClick={handleAddCityClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add City
        </button>
      </div>
      <div className="px-6 py-4">
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
              {cities.map((city, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-lg text-gray-700">{city.city}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">{city.status || 'N/A'}</td>
                  <td className="py-2 px-4 text-lg text-gray-700">
                    <button
                      onClick={() => handleViewCityClick(city)}
                      className="ml-4 text-blue-500 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditCityClick(city)}
                      className="ml-4 text-green-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(city._id)}
                      className="ml-4 text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />

      {isAddCityModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 ">
            <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit City' : 'Add City'}</h2>
            <input
              type="text"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="City Name"
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddCityCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCityConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {isEditMode ? 'Update City' : 'Add City'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCitiesPage;
