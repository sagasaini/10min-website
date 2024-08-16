import React, { useState, useEffect } from 'react';
import ProductModal from './Subsection/ProductModal'; // import the modal component

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://10min.in/api/api/products');
        const data = await response.json();

        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Unexpected API response format:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = async (productId) => {
    try {
      const response = await fetch(`https://10min.in/api/api/products/${productId}`);
      const data = await response.json();
      console.log(data);
      // const result = await response.json();
      if (response.ok) {
        setProductData(data);
        setShowModal(true);
      }  else {
        console.error('Failed to fetch the product:', data.message);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAdd = () => {
    setProductData(null);
    setShowModal(true);
  };

  const handleSave = (data) => {
    if (productData) {
      // Edit product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productData.id ? { ...product, ...data } : product
        )
      );
    } else {
      // Add product
      const newProduct = { ...data };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
    setShowModal(false);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://10min.in/api/api/products/${productId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
      } else {
        console.error('Failed to delete the product:', result.message);
      }
    } catch (error) {
      console.error('There was an error deleting the product:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Thumbnail</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Brand</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 border-b border-gray-300">
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-6 py-4 border-b border-gray-300">{product.name}</td>
                <td className="px-6 py-4 border-b border-gray-300">{product.brand}</td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProductModal showModal={showModal} setShowModal={setShowModal} productData={productData} onSave={handleSave} />
    </div>
  );
};

export default Product;
