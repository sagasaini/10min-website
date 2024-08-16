import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductModal = ({ showModal, setShowModal, productData, onSave }) => {
  const [id, setId] = useState('');
  const [thumbnail, setThumbnail] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState([]);
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [oldPrice, setOldPrice] = useState([]);
  const [category, setCategory] = useState('');
  const [subCat, setSubCat] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [discount, setDiscount] = useState('');
  const [productRam, setProductRam] = useState([]);
  const [size, setSize] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (productData) {
        setId(productData.id);
        setThumbnail(productData.thumbnail || []);
        setName(productData.name);
        
        // Check if these fields are already arrays, otherwise parse them
        setPrice(Array.isArray(productData.price) ? productData.price : JSON.parse(productData.price || '[]'));
        setOldPrice(Array.isArray(productData.oldPrice) ? productData.oldPrice : JSON.parse(productData.oldPrice || '[]'));
        setProductRam(Array.isArray(productData.productRam) ? productData.productRam : JSON.parse(productData.productRam || '[]'));
        setSize(Array.isArray(productData.size) ? productData.size : JSON.parse(productData.size || '[]'));
        setProductWeight(Array.isArray(productData.productWeight) ? productData.productWeight : JSON.parse(productData.productWeight || '[]'));
        
        setDescription(productData.description);
        setBrand(productData.brand);
        setCategory(productData.category);
        setSubCat(productData.subCat);
        setCountInStock(productData.countInStock);
        setRating(productData.rating);
        setIsFeatured(productData.isFeatured);
        setDiscount(productData.discount);
    } else {
        resetFormFields();
    }
}, [productData]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://10min.in/api/api/category');
        const result = await response.json();
        if (response.ok && Array.isArray(result.categoryList)) {
          const uniqueCategories = result.categoryList.reduce((unique, category) => {
            if (!unique.find(cat => cat.name === category.name)) {
              unique.push({ id: category.id, name: category.name });
            }
            return unique;
          }, []);

          setCategories(uniqueCategories);
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

  const handleFileChange = (e) => {
    setThumbnail([...thumbnail, ...Array.from(e.target.files)]);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', JSON.stringify(price));
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('oldPrice', JSON.stringify(oldPrice));
    formData.append('category', category);
    formData.append('subCat', subCat);
    formData.append('countInStock', countInStock);
    formData.append('rating', rating);
    formData.append('isFeatured', isFeatured);
    formData.append('discount', discount);
    formData.append('productRam', JSON.stringify(productRam));
    formData.append('size', JSON.stringify(size));
    formData.append('productWeight', JSON.stringify(productWeight));

    thumbnail.forEach((file) => {
      if (file instanceof File) {
        formData.append('images', file); // Ensure the field name matches the backend's Multer configuration
      }
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      let response;
      if (id) {
        response = await axios.put(`https://10min.in/api/api/products/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post('https://10min.in/api/api/products/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      onSave(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('There was an error saving the product!', error);
      setError('There was an error saving the product!');
    }
  };

  const resetFormFields = () => {
    setId('');
    setThumbnail([]);
    setName('');
    setPrice([]);
    setDescription('');
    setBrand('');
    setOldPrice([]);
    setCategory('');
    setSubCat('');
    setCountInStock('');
    setRating('');
    setIsFeatured(false);
    setDiscount('');
    setProductRam([]);
    setSize([]);
    setProductWeight([]);
  };

  const handleAddField = (setter, value, index) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleRemoveField = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveThumbnail = (index) => {
    setThumbnail(thumbnail.filter((_, i) => i !== index));
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center overflow-auto bg-black bg-opacity-50">
          <div style={{ height: 'fit-content' }} className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">{id ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
              {thumbnail.map((thumb, index) => (
                <div key={index} className="mt-2 flex items-center">
                  {thumb instanceof File ? (
                    <img src={URL.createObjectURL(thumb)} alt={`thumbnail-${index}`} className="w-20 h-20 object-cover" />
                  ) : (
                    <img src={thumb} alt={`thumbnail-${index}`} className="w-20 h-20 object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveThumbnail(index)}
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                multiple
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                {price.map((p, index) => (
                  <div key={index} className="flex items-center mt-1">
                    <input
                      type="text"
                      value={p}
                      onChange={(e) => handleAddField(setPrice, e.target.value, index)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(setPrice, index)}
                      className="ml-2 text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setPrice([...price, ''])}
                  className="mt-2 text-blue-500"
                >
                  Add Price
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Old Price</label>
                {oldPrice.map((op, index) => (
                  <div key={index} className="flex items-center mt-1">
                    <input
                      type="text"
                      value={op}
                      onChange={(e) => handleAddField(setOldPrice, e.target.value, index)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(setOldPrice, index)}
                      className="ml-2 text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setOldPrice([...oldPrice, ''])}
                  className="mt-2 text-blue-500"
                >
                  Add Old Price
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                <select
                  value={subCat}
                  onChange={(e) => {
      console.log("Selected category ID:", e.target.value);
      setSubCat(e.target.value);
    }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select Subcategory</option>
                  {subCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                
                      {cat.subCat}
                    </option>
                  ))}
                </select>

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Count In Stock</label>
                <input
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Is Featured</label>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="mt-1 block"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product RAM</label>
                {productRam.map((ram, index) => (
                  <div key={index} className="flex items-center mt-1">
                    <input
                      type="text"
                      value={ram}
                      onChange={(e) => handleAddField(setProductRam, e.target.value, index)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(setProductRam, index)}
                      className="ml-2 text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProductRam([...productRam, ''])}
                  className="mt-2 text-blue-500"
                >
                  Add RAM
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                {size.map((s, index) => (
                  <div key={index} className="flex items-center mt-1">
                    <input
                      type="text"
                      value={s}
                      onChange={(e) => handleAddField(setSize, e.target.value, index)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(setSize, index)}
                      className="ml-2 text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setSize([...size, ''])}
                  className="mt-2 text-blue-500"
                >
                  Add Size
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Weight</label>
                {productWeight.map((weight, index) => (
                  <div key={index} className="flex items-center mt-1">
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => handleAddField(setProductWeight, e.target.value, index)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(setProductWeight, index)}
                      className="ml-2 text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProductWeight([...productWeight, ''])}
                  className="mt-2 text-blue-500"
                >
                  Add Weight
                </button>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
