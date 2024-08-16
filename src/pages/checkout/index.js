import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [address, setAddress] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showCardModal, setShowCardModal] = useState(false);
  const userId = localStorage.getItem('userId');

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery'); // default to cash on delivery
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: '', // This will be entered by the user
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const selectedAddressId = localStorage.getItem('selectedAddressId');

    if (userId) {
      // Fetch user details
      axios.get(`https://10min.in/api/api/user/${userId}`)
        .then(response => {
          setUserDetails(prevDetails => ({
            ...prevDetails,
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            // Keep pincode from previous state
          }));
        })
        .catch(error => {
          console.error("There was an error fetching the user details!", error);
        });

      if (selectedAddressId) {
        // Fetch the selected address
        axios.get(`https://10min.in/api/api/address/get/${userId}/${selectedAddressId}`)
          .then(response => {
            setAddress(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the address!", error);
          });

        // Fetch cart items
        axios.get(`https://10min.in/api/api/cart/get/${userId}`)
          .then(response => {
            setCartItems(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the cart items!", error);
          });
      }
    }
  }, []);

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      ...userDetails,
      name: address.name,
      phoneNumber: userDetails.phone,
      address: `${address.flatNumber}, ${address.locality}, ${address.state}, ${address.city}`,
      pincode: userDetails.pincode,
      amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      paymentId: paymentMethod === 'card' ? 'card' : 'cashOnDelivery', // set payment ID based on selected method
      email: userDetails.email,
      userid: userId,
      products: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
    };
  
    axios.post('https://10min.in/api/api/orders/create', orderDetails)
      .then(response => {
        console.log('Order placed successfully!', response.data);
        
        // After placing the order, clear the cart
        axios.delete(`https://10min.in/api/api/cart/clear/${userId}`)
          .then(() => {
            console.log('Cart cleared successfully!');
            // Redirect to success page or show a success message
            window.location.href = '/order-status';
          })
          .catch(error => {
            console.error("There was an error clearing the cart!", error);
          });
      })
      .catch(error => {
        console.error("There was an error placing the order!", error);
      });
  };
  

  const handleAddCardClick = () => {
    console.log("Add Card button clicked"); // Debugging line
    setPaymentMethod('card'); // switch to card payment method
    setShowCardModal(true);
  };

  return (
    <div className="payment-page flex p-6">
      <div className="payment w-full m-auto">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <button 
              className={`w-full p-2 rounded ${paymentMethod === 'cashOnDelivery' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} 
              onClick={() => {
                setPaymentMethod('cashOnDelivery');
                setShowCardModal(false);
              }}
            >
              Cash on Delivery
            </button>
            {showCardModal ? (
              <div className="mt-2 p-6 border rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Card Details</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    className="w-full p-2 border rounded"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                  />
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date"
                    className="w-full p-2 border rounded"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    className="w-full p-2 border rounded"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                  />
                  <input
                    type="text"
                    name="cardHolderName"
                    placeholder="Card Holder Name"
                    className="w-full p-2 border rounded"
                    value={cardDetails.cardHolderName}
                    onChange={handleCardDetailsChange}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-gray-200 p-2 rounded mr-2" onClick={() => setShowCardModal(false)}>Cancel</button>
                  <button className="bg-blue-500 text-white p-2 rounded" onClick={handlePlaceOrder}>Save and Pay</button>
                </div>
              </div>
            ) : (
              <button 
                className={`w-full p-2 mt-2 rounded ${paymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                onClick={() => {
                  console.log("Before calling handleAddCardClick"); // Additional debugging line
                  handleAddCardClick();
                }}
              >
                Add Card
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="margin w-full">
        <div className="p-4 border rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Delivery Address</h2>
          <p className="text-sm">{address.addressType}, {address.flatNumber}, {address.floor}, {address.locality}, {address.phone}, {address.name}</p>
        </div>
        <div className="p-4 border rounded mb-4">
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={userDetails.name}
              onChange={handleUserDetailsChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={userDetails.email}
              onChange={handleUserDetailsChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
              value={userDetails.phone}
              onChange={handleUserDetailsChange}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="w-full p-2 border rounded"
              value={userDetails.pincode}
              onChange={handleUserDetailsChange}
            />
          </div>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">
            My Cart <span className="text-sm">({cartItems.length} items)</span>
          </h2>
          <div className="space-y-2">
            {cartItems.map(item => (
              <div key={item.productId} className="flex justify-between">
                <span>{item.quantity}</span>
                <span>{item.productTitle}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gray-200 p-2 rounded" onClick={handlePlaceOrder}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
