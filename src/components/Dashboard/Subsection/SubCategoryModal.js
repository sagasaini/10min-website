import React, { useEffect, useState } from 'react';

const SubCategoryModal = ({ showModal, setShowModal, categoryData, onSave }) => {
  console.log('subCategoryData',categoryData)
  const [category, setCategory] = useState('');
  const [subCat, setSubCat] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://10min.in/api/api/category');
        const result = await response.json();
        if (response.ok && Array.isArray(result.categoryList)) {
          setCategories(result.categoryList);
        } else {
          console.error('API response is not an array or error occurred:', result);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // If categoryData is provided, populate the form fields for editing
    if (categoryData) {
      setCategory(categoryData.category); // Assuming categoryData includes category ID
      setSubCat(categoryData.subCat);
      // Optionally, set images if available in categoryData.images
    } else {
      // Clear form fields if categoryData is not provided (for adding new subcategory)
      setCategory('');
      setSubCat('');
      setCategoryImages([]);
    }
  }, [categoryData]);

  const handleFileChange = (e) => {
    setCategoryImages([...e.target.files]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('category', category); // Assuming 'category' is the ID of the selected category
    formData.append('subCat', subCat);
    categoryImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      let response;
      console.log('createData',categoryData)
      if (categoryData) {
        // If categoryData exists, perform an update (PUT request)
        response = await fetch(`https://10min.in/api/api/subCat/${categoryData._id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Otherwise, perform a create (POST request)
        response = await fetch('https://10min.in/api/api/subCat/create', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();
        // onSave(data); // Call parent component function to save data or update state
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error('Error saving subcategory:', errorData.message);
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">{categoryData ? 'Edit SubCategory' : 'Add SubCategory'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Sub Category</label>
              <input
                type="text"
                value={subCat}
                onChange={(e) => setSubCat(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">SubCategory Images</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                {categoryData ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubCategoryModal;
