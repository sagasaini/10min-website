import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import {  useAppDispatch } from '../../hooks/useAppDispatch';
import { showCart } from '../../store/ui';
import { useAppSelector } from '../../hooks/useAppSelector';
// import { useAppSelector} from '../../hooks/useAppSelector';

const CartButton = () => {
  const [cartData, setCartData] = useState({ quantity: 0, subTotal: 0, items: [] });
  const dispatch = useAppDispatch();
  const { billAmount, totalQuantity, totalAmount, cartItems } = useAppSelector(state => state.cart);
  console.log('cartItme',cartItems)

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const response = await  axios.get(`https://10min.in/api/api/cart/get/${userId}`)

        const data = response.data;
        console.log('API Response:', data);

        const quantity = data.reduce((total, item) => total + item.quantity, 0);
        const subTotal = data.reduce((total, item) => total + item.price * item.quantity, 0);
        setCartData({
          quantity,
          subTotal,
          items: data
        });
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    fetchCartDetails();
  }, []);

  return (
    <div
      className="flex items-center rounded-[6px] min-w-[112px] h-[50px] py-2 px-3 gap-2 font-bold text-sm bg-[#0c831f] cursor-pointer text-white"
      onClick={() => dispatch(showCart())}
    >
      <FaShoppingCart size={24} className="_wiggle" />
      <div className="flex flex-col font-bold text-[14px] leading-none">
        {cartData.quantity === 0 ? (
          <span className="">My Cart</span>
        ) : (
          <>
            <span className="tracking-tight">{totalQuantity} items</span>
            <span className="tracking-tight mt-0.5">₹{totalAmount}</span>
          </>
        )}
      </div>
      {/* {cartData.items.length > 0 && (
        <div className="cart-details">
          <ul>
            {cartData.items.map(item => (
              <li key={item.productId}>
                {item.productTitle} - {item.quantity} x ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default CartButton;
