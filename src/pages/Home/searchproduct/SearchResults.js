import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../../../components/product';
// import Product from './../../p';

const SearchResults = () => {
    const { query } = useParams(); // Get the search query from the URL parameters
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const searchProducts = async () => {
            try {
                const response = await axios.get(`https://10min.in/api/api/products/search/${query}`);
                setRelatedProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };
        searchProducts();
    }, [query]);

    return (
        <div className='container-fluid ' style={{paddingTop:'6rem'}}>
            <h2 className='hd mb-0 mt-0'>Search Results for "{query}"</h2>
            {relatedProducts.length > 0 ? (
                <div className='productGrid flex flex-wrap -mx-3 justify-center'>
                    {relatedProducts.map((product, index) => (
                        <div className='productItem w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3' key={index}>
                            <Product tag={product.type} item={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
}

export default SearchResults;
