import React, { useState, useEffect } from 'react';
import CategoryModal from './Subsection/CategoryModal'; // import the modal component

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Fetch category data from the API
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

  const handleEdit = (category) => {
    setCategoryData(category);
  console.log(category);

    setShowModal(true);
  };

  const handleAdd = () => {
    setCategoryData(null);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    if (categoryData) {
      // Handle edit logic here
      try {
        const response = await fetch(`https://10min.in/api/api/category/${categoryData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
          setCategories(categories.map((cat) => (cat._id === categoryData._id ? result : cat)));
        } else {
          console.error('Error editing category:', result);
        }
      } catch (error) {
        console.error('Error editing category:', error);
      }
    } 
    // else {
    //   // Handle add logic here
    //   try {
    //     const response = await fetch('https://10min.in/api/api/category/create', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     });
    //     const result = await response.json();
    //     if (response.ok) {
    //       setCategories([...categories, result]);
    //     } else {
    //       console.error('Error adding category:', result);
    //     }
    //   } catch (error) {
    //     console.error('Error adding category:', error);
    //   }
    // }
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://10min.in/api/api/category/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCategories(categories.filter((cat) => cat._id !== id));
      } else {
        const result = await response.json();
        console.error('Error deleting category:', result);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">ID</th> */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Name</th>
              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Subcategory</th> */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Category Image</th>
              {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Delivery Charges</th> */}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                {/* <td className="px-6 py-4 border-b border-gray-300">{category._id}</td> */}
                <td className="px-6 py-4 border-b border-gray-300">{category.name}</td>
                {/* <td className="px-6 py-4 border-b border-gray-300">{category.subCat}</td> */}
                <td className="px-6 py-4 border-b border-gray-300">
                  <img src={category.images[0]} alt={category.name} className="w-16 h-16 object-cover" />
                </td>
                {/* <td className="px-6 py-4 border-b border-gray-300">{category.deliveryCharges}</td> */}
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CategoryModal showModal={showModal} setShowModal={setShowModal} categoryData={categoryData} onSave={handleSave} />
    </div>
  );
};

export default Category;
