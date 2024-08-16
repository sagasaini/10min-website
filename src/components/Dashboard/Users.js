import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetails from './Subsection/UserDetails';
import AddUserModal from './Subsection/AddUserModal'; // Adjust the path as needed

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
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

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post('https://10min.in/api/api/user/create', newUser);
      setUsers([...users, response.data]);
      handleCloseAddUserModal();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user. Please try again later.');
    }
  };

  return (
    <div className="w-full px-4 py-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Users</h2>
        <button
          onClick={handleAddUserClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add User
        </button>
      </div>
      {error && (
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded-md mt-2">
          {error}
        </p>
      )}
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
                <th className="py-2 px-4 bg-gray-200 text-left text-lg font-semibold text-gray-700">Action</th>
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
                  <td className="py-2 px-4 text-lg text-gray-700">
                    <button onClick={() => handleViewUser(user)} className="text-blue-500 hover:text-blue-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-3/4 h-3/4 overflow-auto">
            <UserDetails user={selectedUser} />
            <button onClick={handleCloseModal} className="text-red-500 hover:text-red-700 mt-4">Close</button>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <AddUserModal onAddUser={handleAddUser} onClose={handleCloseAddUserModal} />
      )}
    </div>
  );
};

export default Users;
