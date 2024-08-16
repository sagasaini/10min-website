import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addItem, removeItem, fetchCartData } from "../../store/cart";

const AddToCartButton = ({ product, productId, weight, price, quantity, isAlreadyAddedInCart }) => {
  const [inputValue, setInputValue] = useState(quantity || 1);
  const [isEditing, setIsEditing] = useState(false);
 
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cart);

  useEffect(() => {
    console.log('Product object:', product);
  }, [product]);

  const plus = () => {
    setInputValue(prevValue => prevValue + 1);
    const existingItem = cartItems.find(item => item.productId === productId && item.weight === weight && item.price === price);
    if (existingItem) {
      dispatch(addItem(existingItem)); // Update the quantity in the Redux store
    }
  };

  const minus = () => {
    setInputValue(prevValue => (prevValue > 1 ? prevValue - 1 : 1));
    const existingItem = cartItems.find(item => item.productId === productId && item.weight === weight && item.price === price);
    if (existingItem && existingItem.quantity > 1) {
      dispatch(removeItem(existingItem.productId)); // Update the quantity in the Redux store
    }
  };

   const handleAddOrUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      return;
    }

    const existingItem = cartItems.find(item => item.productId === productId && item.weight === weight && item.price === price);

    const cartData = {
      productTitle: product.name,
      image: product.images && product.images.length > 0 ? product.images[0] : "",
      rating: product.rating,
      price: price,
      weight: weight,
      quantity: inputValue,
      subTotal: (price * inputValue),
      productId: productId,
      userId: localStorage.getItem('userId'),
      countInStock: product.countInStock
    };

    try {
      if (existingItem) {
        const response = await axios.put(`https://10min.in/api/api/cart/${existingItem._id}`, cartData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Cart updated:', response.data);
      } else {
        const response = await axios.post('https://10min.in/api/api/cart/add', cartData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Product added to cart:', response.data);
      }
      dispatch(fetchCartData());  // Fetch updated cart data
      setIsEditing(false);  // Reset editing state
    } catch (error) {
      console.error('Error adding/updating product in cart:', error);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <>
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-primary mr-2" onClick={minus}>-</button>
            <input style={{ width: '40px' }} type="number" value={inputValue} readOnly className="input-quantity" />
            <button className="btn btn-primary ml-2" onClick={plus}>+</button>
          </div>
          <div className="d-flex align-items-center mb-4">
            <button style={{ width: '200px' }} className="btn btn-primary" onClick={handleAddOrUpdate}>
              {isAlreadyAddedInCart ? "Update" : "Add"}
            </button>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center mb-4">
          <button style={{ width: '200px' }} className="btn btn-primary" onClick={startEditing}>
            {isAlreadyAddedInCart ? "Update" : "Add"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
