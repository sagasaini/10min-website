import React, { useState, useEffect } from 'react';
import SubCategoryModal from './Subsection/SubCategoryModal'; // import the modal component

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState(null);

  useEffect(() => {
    // Fetch subcategory data from the API
    const fetchSubCategories = async () => {
      try {
        const response = await fetch('https://10min.in/api/api/subCat');
        const result = await response.json();
        if (response.ok && Array.isArray(result.subCategoryList)) {
          setSubCategories(result.subCategoryList);
        } else {
          console.error('API response is not an array or error occurred:', result);
          setSubCategories([]);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, []);

  const handleEdit = (subCategory) => {
    setSubCategoryData(subCategory);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSubCategoryData(null);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    try {
      let response;
      if (subCategoryData) {
        // If subCategoryData exists, perform an update (PUT request)
        response = await fetch(`https://10min.in/api/api/subCat/${subCategoryData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
       } 
    //else {
    //     // Otherwise, perform a create (POST request)
    //     response = await fetch('https://10min.in/api/api/subCat/create', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     });
    //   }

      if (response.ok) {
        const result = await response.json();
        if (subCategoryData) {
          // Update existing subCategory in state
          setSubCategories(subCategories.map((cat) => (cat._id === subCategoryData._id ? result : cat)));
        } else {
          // Add new subCategory to state
          setSubCategories([...subCategories, result]);
        }
      } else {
        const errorData = await response.json();
        console.error('Error saving subcategory:', errorData);
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://10min.in/api/api/subCat/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSubCategories(subCategories.filter((cat) => cat._id !== id));
      } else {
        const result = await response.json();
        console.error('Error deleting subcategory:', result);
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">SubCategories</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
          Add SubCategory
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Category Image</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory) => (
              <tr key={subCategory._id}>
                <td className="px-6 py-4 border-b border-gray-300">{subCategory.subCat}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <img src={subCategory.image} alt={subCategory.subCat} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(subCategory)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(subCategory._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SubCategoryModal showModal={showModal} setShowModal={setShowModal} categoryData={subCategoryData} onSave={handleSave} />
    </div>
  );
};

export default SubCategory;
