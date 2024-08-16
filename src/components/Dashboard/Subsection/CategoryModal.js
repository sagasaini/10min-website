import React, { useState, useEffect } from 'react';

const CategoryModal = ({ showModal, setShowModal, categoryData, onSave }) => {
  const [categoryName, setCategoryName] = useState(categoryData?.name || '');
  const [categoryImages, setCategoryImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCategoryName(categoryData?.name || '');
    setCategoryImages([]);
    setIsSubmitting(false);
  }, [categoryData, showModal]);

  const handleFileChange = (e) => {
    setCategoryImages([...e.target.files]);
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', categoryName);
    categoryImages.forEach((image) => {
      formData.append('files', image);
    });

    try {
      let response;
      if (categoryData) {
        // If categoryData exists, perform an update (PUT request)
        response = await fetch(`https://10min.in/api/api/category/${categoryData._id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Otherwise, perform a create (POST request)
        response = await fetch('https://10min.in/api/api/category/create', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();
        onSave(data);
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error('Error saving category:', errorData.message);
      }
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">{categoryData ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Category Images</label>
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
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
                disabled={isSubmitting}
              >
                {categoryData ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CategoryModal;
