import React, { useState } from 'react';

const DriverForm = ({ driver, onCancel, onSave }) => {
  const [formState, setFormState] = useState(driver || { name: '', email: '', phone: '', cover: '', status: '' });
  const [coverFile, setCoverFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const validate = () => {
    const errors = {};
    if (!formState.name) errors.name = 'Name is required';
    if (!formState.email) errors.email = 'Email is required';
    if (!formState.phone) errors.phone = 'Phone is required';
    if (!formState.status) errors.status = 'Status is required';
    if (!coverFile && !formState.cover) errors.cover = 'Cover is required';
    return errors;
  };

  const handleSave = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('phone', formState.phone);
    formData.append('status', formState.status);
    if (coverFile) {
      formData.append('cover', coverFile);
    } else {
      formData.append('cover', formState.cover);
    }

    try {
      const url = driver ? `https://10min.in/api/api/driver/update/${driver._id}` : 'https://10min.in/api/api/driver/create';
      const response = await fetch(url, {
        method: driver ? 'PUT' : 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      onSave(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="w-full px-4 py-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">{driver ? 'Edit Driver' : 'Create Driver'}</h2>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Full Name
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
          id="name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="email">
          Email
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="phone">
          Contact No
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? 'border-red-500' : ''}`}
          id="phone"
          name="phone"
          type="text"
          value={formState.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="status">
          Status
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.status ? 'border-red-500' : ''}`}
          id="status"
          name="status"
          type="text"
          value={formState.status}
          onChange={handleChange}
        />
        {errors.status && <p className="text-red-500 text-xs italic">{errors.status}</p>}

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="cover">
          Upload cover image here
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.cover ? 'border-red-500' : ''}`}
          id="cover"
          name="cover"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {errors.cover && <p className="text-red-500 text-xs italic">{errors.cover}</p>}

        <div className="mt-4 flex justify-between">
          <button onClick={handleSave} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
            {driver ? 'Update Driver' : 'Create Driver'}
          </button>
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
