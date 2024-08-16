import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";

const OrderDetailItem = (props) => {
  const { images, productTitle, price, quantity, subTotal } = props.product;

  // console.log(quantity);
  return (
    <div className="flex p-4 gap-4 border-t _border-muted">
      <div>
        <div className="h-[72px] w-[72px] border rounded-[4px] overflow-hidden">
          <img src={images} alt="" className="h-full w-full" />
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
        </div>
        <div className="items-center justify-between mt-auto">
          <div>
            <span className="text-[14px] _text-default">Quantity: {quantity}</span>
          </div>
          <div>
            <span className="text-[14px] _text-default">Subtotal: ₹{subTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderDetail = ({ orderId }) => {
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const openAddressModal = () => {
    setIsAddressModalVisible(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalVisible(false);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://10min.in/api/api/orders/get/${orderId}`);
        setOrderDetails(response.data);
        console.log(orderDetails.products.productId)

      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden p-4">
      <div
        style={{ zIndex: '-1' }}
        className="absolute inset-0 bg-black bg-opacity-[.65]"
        onClick={closeAddressModal}
      />
      <aside className="fixed inset-0 md:inset-y-0 md:right-0 flex justify-end items-start z-50">
        <div className="relative bg-white w-full h-full md:w-[400px] lg:w-[500px] overflow-y-auto">
          <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b">
            <h2 className="font-extrabold text-2xl _text-default">Order Details</h2>
            <IoClose size={24} className="cursor-pointer" onClick={closeAddressModal} />
          </div>
          {!orderDetails ? (
            <div className="flex-1 bg-white p-6 flex flex-col justify-center items-center text-center">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-3 my-3">
                  <div className="bg-white border-y _border-muted">
                    <div className="flex flex-col px-4 pt-5">
                      <p className="text-sm _text-default font-bold mb-1">
                        Order #{orderDetails._id}
                      </p>
                      <div className="flex justify-between _text-muted text-xs">
                        <span>Amount: ₹{orderDetails.amount}</span>
                        <span>Date: {new Date(orderDetails.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="divide-y-1">
                      {orderDetails.products.map((item) => (
                        <OrderDetailItem key={item.productId} product={item} />
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
                        <div className="_text-muted text-xs">₹{orderDetails.amount}</div>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <div className="_text-muted text-xs">Discount</div>
                        <div className="_text-muted text-xs">- ₹{orderDetails.discount || 0}</div>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <div className="_text-muted text-xs">Delivery Charges</div>
                        <div className="_text-muted text-xs">₹{orderDetails.deliveryCharges || 0}</div>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <div className="_text-muted text-xs">Total</div>
                        <div className="_text-muted text-xs">₹{orderDetails.amount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="sticky bottom-0 z-10 p-4 bg-white border-t">
                {/* <button
                  type="button"
                  className="bg-[#0c831f] w-full rounded-[8px] px-4 py-3 leading-none text-[13px] font-medium text-white cursor-pointer"
                  onClick={openAddressModal}
                >
                  Proceed to Pay ₹{orderDetails.amount}
                  <FiChevronRight />
                </button> */}
              </footer>
            </>
          )}
          {/* {isAddressModalVisible && <AddressModal onClose={closeAddressModal} />} */}
        </div>
      </aside>
    </div>
  );
};

export default OrderDetail;
