import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchCartData } from "../../store/cart";

const AddCartItem = ({ product }) => {
  const [inputValue, setInputValue] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(state => state.cart);

  const userId=localStorage.getItem('userId')


  useEffect(() => {
    const existingItem = cartItems.find(item => item.productId === product._id);
    if (existingItem) {
      setInputValue(existingItem.quantity);
    }
  }, [product, cartItems]);

  const plus = () => {
    setInputValue(inputValue + 1);
  };

  const minus = () => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1);
    }
  };

  const handleAddOrUpdate = async () => {
    console.log('cart', cartItems);
    console.log('product', product);

    try {
      if (product) {
        const response = await axios.put(`https://10min.in/api/api/cart/update/${userId}/${product.productId}`, {
          quantity: inputValue,
          price: product.price,
          weight: product.weight
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Cart quantity updated:', response.data);
      }
      dispatch(fetchCartData()); // Fetch updated cart data
      setIsEditing(false); // Reset editing state
    } catch (error) {
      console.error('Error updating product in cart:', error);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

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
              Update
            </button>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center mb-4">
          <button style={{ width: '200px' }} className="btn btn-primary" onClick={startEditing}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCartItem;
