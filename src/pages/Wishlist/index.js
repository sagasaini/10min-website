// src/components/Wishlist.js
import React, { useState, useEffect } from 'react';
import './style.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Mock data for wishlist items
    const items = [
      { id: 1, name: 'Product 1', price: '$100', imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Product 2', price: '$150', imageUrl: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Product 3', price: '$200', imageUrl: 'https://via.placeholder.com/150' }
    ];
    setWishlistItems(items);
  }, []);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="wishlist">
      <h1>Your Wishlist</h1>
      <div className="wishlist-container">
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <img src={item.imageUrl} alt={item.name} />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;


