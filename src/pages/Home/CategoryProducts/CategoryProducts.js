import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Product from './../../../components/product/index';

const CategoryProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [selectedWeight, setSelectedWeight] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const { categoryId, subCatId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://10min.in/api/api/category');
        setCategories(response.data.categoryList.slice(0, 5)); // Limit to first 5 categories
        console.log(response.data.categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = {};

        await Promise.all(
          categories.map(async (category) => {
            try {
              const response = await axios.get(`https://10min.in/api/api/products/category/${category.name}`);
              if (response.data.length > 0) { // Only add category if it has products
                productsData[category.name] = response.data;
              }
            } catch (error) {
              console.error(`Error fetching products for category ${category.name}:`, error);
            }
          })
        );

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (categories.length > 0) {
      fetchProducts();
    }
  }, [categories]);

  return (
    <section className='apiProductsSection'>
      <div className='container-fluid'>
        <h2 className='hd mb-0 mt-0'>All Products</h2>
        <div className=''>
          {Object.keys(products).map((categoryName, index) => (
            <div key={index} className='category-section mb-5'>
              <h3 className='category-title'>{categoryName}</h3>
              <div className='productGrid flex flex-wrap -mx-3 justify-center'>
                {products[categoryName].map((product, index) => (
                  <div className='productItem w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3' key={index}>
                    <Product tag={product.type} item={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
