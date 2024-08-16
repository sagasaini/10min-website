import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchCartData, removeItem, } from '../../store/cart';
import { hideCart } from '../../store/ui';
import AddressModal from './AddressModal';
import AddCartItem from './AddCartItem';

const CartPanelItem = (props) => {
  const { image, productTitle, price, quantity, subTotal, productId, weight } = props.product;
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem('userId');

  const handleRemove = async () => {
    try {
      await axios.delete(`https://10min.in/api/api/cart/delete/${userId}/${productId}`);
      dispatch(removeItem(productId)); // Dispatch the remove item action
      console.log("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return (
    <div className="flex p-4 gap-4 border-t _border-muted">
      <div>
        <div className="h-[72px] w-[72px] border rounded-[4px] overflow-hidden">
          <img src={image} alt="" className="h-full w-full" />
        </div>
      </div>
      <div className="text-left flex flex-col flex-1">
        <div className="_text-default text-[15px] leading-tight mb-2">
          {productTitle}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[14px] _text-default">₹{price}</span>
          </div>
          <div className="h-9 w-[130px]">
            <AddCartItem
              style={{ position: 'relative', bottom: '40px' }}
              product={props.product}
            />
          </div>
        </div>
        <div style={{ width: '70%' }} className="items-center justify-between mt-auto">
          <div>
            <span className="text-[14px] _text-default">Quantity: {quantity}</span>
          </div>
          <div style={{ width: '50%' }}>
            <span className="text-[14px] _text-default">Subtotal: ₹{subTotal}</span>
          </div>
          <div style={{ width: '50%' }}>
            <span className="text-[14px] _text-default">Weight: {weight}</span>
          </div>
        </div>
        <div className="flex items-center justify-end mt-2">
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPanel = () => {
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(true);

  const openAddressModal = () => {
    setIsAddressModalVisible(true);
    setIsCartVisible(false);
  };

  const closeAddressModal = () => {
    setIsAddressModalVisible(false);
    setIsCartVisible(true);
  };

  const dispatch = useAppDispatch();
  const { totalAmount, totalQuantity, cartItems, billAmount, discount, status } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCartData());
    }
  }, [dispatch, status]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden p-4">
      <div
        style={{ zIndex: '-1' }}
        className="absolute inset-0 bg-black bg-opacity-[.65]"
        onClick={() => dispatch(hideCart())}
      />
      <aside className="fixed inset-0 md:inset-y-0 md:right-0 flex justify-end items-start z-50">
        <div className="relative bg-white w-full h-full md:w-[400px] lg:w-[500px] overflow-y-auto">
          {isCartVisible && (
            <>
              <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b">
                <h2 className="font-extrabold text-2xl _text-default">My Cart</h2>
                <IoClose size={24} className="cursor-pointer" onClick={() => dispatch(hideCart())} />
              </div>
              {status === 'loading' ? (
                <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center text-center">
                  <p>Loading...</p>
                </div>
              ) : status === 'failed' ? (
                <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center text-center">
                  <p>Failed to load cart items.</p>
                </div>
              ) : totalQuantity === 0 ? (
                <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center text-center">
                  <img src="empty-cart.webp" alt="" className="h-36 w-36" />
                  <h3 className="font-bold text-lg leading-tight">
                    You don't have any items in your cart
                  </h3>
                  <p className="text-sm _text-default mb-2">
                    Your favourite items are just a click away
                  </p>
                  <button
                    type="button"
                    onClick={() => dispatch(hideCart())}
                    className="bg-[#0c831f] text-white rounded-[8px] px-4 py-3 leading-none text-[13px] font-medium cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-3 my-3">
                      <div className="bg-white border-y _border-muted">
                        <div className="flex flex-col px-4 pt-5">
                          <div className="flex justify-between _text-muted text-xs">
                            <span>shipment of 1 of 1</span>
                            <span>{totalQuantity} items</span>
                          </div>
                          <p className="text-sm _text-default font-bold mb-1">
                            Delivery in some times
                          </p>
                        </div>
                        <div className="divide-y-1">
                          {cartItems.map((item) => (
                            <CartPanelItem key={item.productId} product={item} />
                          ))}
                        </div>
                      </div>
                      <div className="px-4 flex items-center justify-between">
                        <div className="text-base _text-default font-bold">Bill Details</div>
                      </div>
                      <div className="bg-white border-y _border-muted">
                        <div className="divide-y-1">
                          <div className="flex justify-between px-4 py-2">
                            <div className="_text-muted text-xs">Subtotal</div>
                            <div className="_text-muted text-xs">₹{totalAmount}</div>
                          </div>
                          <div className="flex justify-between px-4 py-2">
                            <div className="_text-muted text-xs">Discount</div>
                            <div className="_text-muted text-xs">- ₹{discount}</div>
                          </div>
                          <div className="flex justify-between px-4 py-2">
                            <div className="_text-muted text-xs">Delivery Charges</div>
                            <div className="_text-muted text-xs">₹0</div>
                          </div>
                          <div className="flex justify-between px-4 py-2">
                            <div className="_text-muted text-xs">Bill Amount</div>
                            <div className="_text-muted text-xs">₹{billAmount}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer className="sticky bottom-0 z-10 p-4 bg-white border-t">
                    <button
                      type="button"
                      className="bg-[#0c831f] w-full rounded-[8px] px-4 py-3 leading-none text-[13px] font-medium text-white cursor-pointer"
                      onClick={openAddressModal}
                    >
                      Proceed to Pay ₹{billAmount}
                      <FiChevronRight />
                    </button>
                  </footer>
                </>
              )}
            </>
          )}
          {isAddressModalVisible && <AddressModal onClose={closeAddressModal} />}
        </div>
      </aside>
    </div>
  );
};

export default CartPanel;
