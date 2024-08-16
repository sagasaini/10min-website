import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Setting.css';
import { BiSolidUserAccount } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";
import { IoClose } from 'react-icons/io5';
import OrderDetails from './../../components/Dashboard/Subsection/OrderDetails';
import AddAddress from '../../components/cart/AddAddress';

const OrderDetailItem = (props) => {
  const { image, productTitle, price, quantity, subTotal } = props.product;
 console.log(props.product)
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
        <div className="flex justify-between px-4 py-2">
                  <div className="_text-muted text-xs"><h4 className='font-bold'>Price</h4></div>
                  <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}>₹{price}</h4></div>
                  </div>
                  <div className="flex justify-between px-4 py-2">
                  <div className="_text-muted text-xs"><h4 className='font-bold'>Quantity</h4></div>
                  <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}>{quantity}</h4></div>
                  </div>
                  <div className="flex justify-between px-4 py-2">
                  <div className="_text-muted text-xs"><h4 className='font-bold'>SubTotal</h4></div>
                  <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}>₹{price*quantity}</h4></div>
                  </div>
      </div>
    </div>
  );
};



const SettingsPage = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);




  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const handleAddAddressClick = () => {
    setIsAddAddressModalOpen(true);
  };

  const closeAddAddress = () => {
    setIsAddAddressModalOpen(false);
  };

  const [orderDetails, setOrderDetails] = useState(null);

  


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    

    if (userId) {
      fetchUserDetails(userId);
      fetchOrders(userId);
      fetchAddresses(userId);
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const url = `https://10min.in/api/api/user/${userId}`;
      console.log('Fetching user details from URL:', url);
      const response = await axios.get(url);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  const fetchOrders = async (userId) => {
    try {
      const url = `https://10min.in/api/api/orders/get/${userId}`;
      console.log('Fetching orders from URL:', url);
      const response = await axios.get(url);
      const orders = response.data;
  
      // Separate orders based on status
      const activeOrders = orders.filter(order => order.status === 'pending');
      const pastOrders = orders.filter(order => order.status === 'confirmed');



      // Set the state for active and past orders
      setActiveOrders(activeOrders);
      setPastOrders(pastOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };
  
  
  
  const fetchAddresses = async (userId) => {
    try {
      const url = `https://10min.in/api/api/address/${userId}`;
      console.log('Fetching addresses from URL:', url);
      const response = await axios.get(url);
      setBillingAddress(response.data);
      setShippingAddress(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }

    console.log(userDetails)
    console.log(activeOrders)
    console.log(billingAddress)
  };

  const handleViewDetails = (orderId) => {
    

    fetchOrderDetails(orderId);
    // console.log('handle view call');

    console.log(orderId);
    setActiveTab('item-detail');
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`https://10min.in/api/api/orders/${orderId}`);
      setOrderDetails(response.data);

      console.log(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
  };

  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsEditingAccount(false);
    setIsEditingBilling(false);
    setIsEditingShipping(false);
  };

  const handleEditClick = (section) => {
    if (section === 'account') setIsEditingAccount(true);
    if (section === 'billing') setIsEditingBilling(true);
    if (section === 'shipping') setIsEditingShipping(true);
  };


  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  
  const handleSaveClick = async (event, section) => {
    event.preventDefault();
    const form = event.target;
    try {
      let url;
      let data;
      if (section === 'account') {
        url = `https://10min.in/api/api/user/update/${userDetails._id}`;
        data = {
          name: form.name.value,
          // lastName: form.lastName.value,
          email: form.email.value,
          phone: form.phone.value,
        };
        const response = await axios.put(url, data);
        setUserDetails(response.data);
        setIsEditingAccount(false);
      }
      if (section === 'billing') {
        const userId=localStorage.getItem('userId');
        console.log(userId)
        console.log(billingAddress._id)
        url = `https://10min.in/api/api/address/update/${userId}/${billingAddress[0]._id}`;
        data = {
          name: form.Name.value,
          flatNumber: form.flatnumber.value,
          locality: form.locality.value,
          floor: form.floor.value,
          addressType: form.addresstype.value,
          landmark: form.landmark.value,
          phone: form.phone.value
        };
        const response = await axios.put(url, data);
        setBillingAddress(response.data);
        setIsEditingBilling(false);
      }
      // if (section === 'shipping') {
      //   url = `https://10min.in/api/api/address/updateShipping/${shippingAddress._id}`;
      //   data = {
      //     name: form.Name.value,
      //     lastName: form.lastName.value,
      //     address: form.address.value,
      //     city: form.city.value,
      //     state: form.state.value,
      //     zip: form.zip.value,
      //     phone: form.phone.value
      //   };
      //   const response = await axios.put(url, data);
      //   setShippingAddress(response.data);
      //   setIsEditingShipping(false);
      // }
    } catch (error) {
      console.error(`Error updating ${section} details:`, error);
    }
  };
  return (
    <div className="custom-page-content">
      <div className="custom-container">
        <div className="custom-dashboard">
          <div className="custom-dashboard-menu">
            <ul className="custom-nav custom-flex-column" role="tablist">
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => handleTabClick('dashboard')}
                >
                  <MdSpaceDashboard /> &nbsp; Dashboard
                </a>
              </li>
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => handleTabClick('orders')}
                >
                  <MdDeliveryDining /> &nbsp; Orders
                </a>
              </li>
              {/* <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'track-orders' ? 'active' : ''}`}
                  onClick={() => handleTabClick('track-orders')}
                >
                  <FaMapMarkedAlt /> &nbsp; Your Order
                </a>
              </li> */}
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'address' ? 'active' : ''}`}
                  onClick={() => handleTabClick('address')}
                >
                  <RiUserLocationFill /> &nbsp; My Address
                </a>
              </li>
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'account-detail' ? 'active' : ''}`}
                  onClick={() => handleTabClick('account-detail')}
                >
                  <BiSolidUserAccount /> &nbsp; Account details
                </a>
              </li>
              <li className="custom-nav-item">
                <a className="custom-nav-link" href="/signIn">
                  <TbLogout2 /> &nbsp; Logout
                </a>
              </li>
            </ul>
          </div>
          <div className="custom-dashboard-content">
            {activeTab === 'dashboard' && (
              <div className="custom-tab-pane custom-fade custom-active custom-show">
                <div className="custom-card">
                  <div className="custom-card-header">
                    <h3 className="custom-mb-0">Hello {userDetails.name}!</h3>
                  </div>
                  <div className="custom-card-body">
                    <p>
                      From your account dashboard, you can easily check &amp; view your{' '}
                      <a
                        className={`custom-link ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => handleTabClick('orders')}
                      >
                        recent orders
                      </a>
                      ,<br />
                      manage your{' '}
                      <a
                        className={`custom-link ${activeTab === 'address' ? 'active' : ''}`}
                        onClick={() => handleTabClick('address')}
                      >
                        shipping and billing addresses
                      </a>{' '}
                      and{' '}
                      <a
                        className={`custom-link ${activeTab === 'account-detail' ? 'active' : ''}`}
                        onClick={() => handleTabClick('account-detail')}
                      >
                        edit your password and account details.
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'orders' && (
      <div className="order-page">
        <h2>Active Orders</h2>
        <div className="order-list">
          {activeOrders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-details">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <button 
                  className="view-details-btn" 
                  onClick={() => handleViewDetails(order._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <h2>Ordered</h2>
        <div className="order-list">
          {pastOrders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-details">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Amount:</strong> ₹{order.amount}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <button 
                  className="view-details-btn" 
                  onClick={() => handleViewDetails(order._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

            {/* {activeTab === 'track-orders' && (
              <div className="custom-tab-pane custom-fade">
                <div className="custom-card">
                  <div className="custom-card-header">
                    <h3 className="custom-mb-0">Orders tracking</h3>
                  </div>
                  <div className="custom-card-body custom-contact-from-area">
                    <p>To track your orderplease enter your OrderID in the box below and press "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
<div className="custom-contact-form">
<form className="custom-contact-form-style">
<div className="custom-row">
<div className="custom-col-lg-6">
<input name="order-id" placeholder="Order ID" type="text" />
</div>
<div className="custom-col-lg-6">
<input name="billing-email" placeholder="Billing email" type="email" />
</div>
<div className="custom-col-lg-12">
<button className="custom-submit" type="submit">
Track
</button>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
)} */}

{activeTab === 'item-detail' && (
  <div className="p-4">
    <div className="relative bg-white w-full h-full  overflow-y-auto">
      <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b">
        <h2 className="font-extrabold text-2xl _text-default">Order Details</h2>
        <IoClose size={24} className="cursor-pointer" onClick={() => handleTabClick('orders')} />
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
                <div className="flex justify-between px-4 py-2">
                <div className="_text-muted text-xs"><h4 className='font-bold'>Order</h4></div>
                <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}>#{orderDetails._id}</h4></div>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <div className="_text-muted text-xs"><h4 className='font-bold'>Amount</h4></div>
                  <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}>₹{orderDetails.amount}</h4></div>

                  </div>
                  <div className="flex justify-between px-4 py-2">
                  <div className="_text-muted text-xs"><h4 className='font-bold'>Date</h4></div>
                  <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}> {new Date(orderDetails.date).toLocaleDateString()}</h4></div>

                  </div>
                  <div className="flex justify-between px-4 py-2">
                  <div className="_text-muted text-xs"><h4 className='font-bold'>Address</h4></div>
                  <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}>{orderDetails.address}</h4></div>
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
                    <div className="_text-muted text-xs"><h4 className='font-bold'>Subtotal</h4></div>
                    <div className="_text-muted text-xs"> <h4  style={{color:'#7E7E7E'}}>₹{orderDetails.amount}</h4></div>
                  </div>
                  <div className="flex justify-between px-4 py-2">
                    <div className="_text-muted text-xs"><h4 className='font-bold'>Discount</h4></div>
                    <div className="_text-muted text-xs"><h4  style={{color:'#7E7E7E'}}>- ₹{orderDetails.discount || 0}</h4></div>
                  </div>
                  <div className="flex justify-between px-4 py-2">
                    <div className="_text-muted text-xs"><h4 className='font-bold'>Delivery Charges</h4></div>
                    <div className="_text-muted text-xs"><h4  style={{color:'#7E7E7E'}}>₹{orderDetails.deliveryCharges || 0}</h4></div>
                  </div>
                  <div className="flex justify-between px-4 py-2">
                    <div className="_text-muted text-xs"><h4 className='font-bold'>Total</h4></div>
                    <div className="_text-muted text-xs"><h4  style={{color:'#7E7E7E'}}>₹{orderDetails.amount}</h4></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
)}



{activeTab === 'address' && (
<div className="custom-tab-pane custom-fade custom-active custom-show">
<div className="custom-card">
<div className="custom-card-header">
<h3 className="custom-mb-0">Billing Address</h3>
<button className="custom-btn custom-edit-btn" onClick={(e) => {
              e.stopPropagation();
              handleEditAddress('billing');
            }}>
Edit
</button>
<button className="custom-btn custom-edit-btn"  onClick={handleAddAddressClick}>
Add Address
</button>
</div>
<div className="custom-card-body">
{isEditingBilling ? (
  <form className="custom-address-form space-y-6 p-6 bg-white rounded-lg shadow-lg" onSubmit={(event) => handleSaveClick(event, 'billing')}>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="name">Name</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="name"
      name="Name"
      placeholder="Name"
      defaultValue={billingAddress[0].name}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="flatnumber">Flat Number</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="flatnumber"
      name="flatnumber"
      placeholder="Flat Number"
      defaultValue={billingAddress[0].flatNumber}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="locality">Locality</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="locality"
      name="locality"
      placeholder="Locality"
      defaultValue={billingAddress[0].locality}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="floor">Floor</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="floor"
      name="floor"
      placeholder="Floor"
      defaultValue={billingAddress[0].floor}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="addresstype">Address Type</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="addresstype"
      name="addresstype"
      placeholder="Address Type"
      defaultValue={billingAddress[0].addressType}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="landmark">Landmark</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="landmark"
      name="landmark"
      placeholder="Landmark"
      defaultValue={billingAddress[0].landmark}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="phone">Phone</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="phone"
      name="phone"
      placeholder="Phone"
      defaultValue={billingAddress[0].phone}
    />
  </div>
  <div className="flex space-x-4">
    <button
      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="submit"
    >
      Save Address
    </button>
    <button
      className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150"
      type="button"
      onClick={() => setIsEditingBilling(false)}
    >
      Cancel
    </button>
  </div>
</form>


) : (
  <div className="custom-address-info p-6 bg-gray-100 rounded-lg shadow-lg">
  <p className="text-xl font-semibold">Address Type&nbsp;:&nbsp;
    <span className="font-normal">{billingAddress[0].addressType}</span>
  </p>
  <p className="text-xl font-semibold">Flat Number&nbsp;:&nbsp;
    <span className="font-normal">{billingAddress[0].flatNumber}</span>
  </p>
  <p className="text-xl font-semibold">Floor&nbsp;:&nbsp;
    <span className="font-normal">{billingAddress[0].floor}</span>
  </p>
  <p className="text-xl font-semibold">Locality&nbsp;:&nbsp;
    <span className="font-normal">{billingAddress[0].locality}</span>
  </p>
  <p className="text-xl font-semibold">Landmark&nbsp;:&nbsp;
    <span className="font-normal">{billingAddress[0].landmark}</span>
  </p>
  <p className="text-xl font-semibold">Phone&nbsp;:&nbsp;
    <span className="font-normal">{billingAddress[0].phone}</span>
  </p>
</div>

)}
</div>
</div>
{/* <div className="custom-card">
<div className="custom-card-header">
<h3 className="custom-mb-0">Shipping Address</h3>
<button className="custom-btn custom-edit-btn" onClick={() => handleEditClick('shipping')}>
Edit
</button>
</div>
<div className="custom-card-body">
{isEditingShipping ? (
<form className="custom-address-form" onSubmit={(event) => handleSaveClick(event, 'shipping')}>
<input type="text" name="Name" placeholder="Name" defaultValue={shippingAddress.name} />
<input type="text" name="lastName" placeholder="Last Name" defaultValue={shippingAddress.lastName} />
<input type="text" name="address" placeholder="Address" defaultValue={shippingAddress.address} />
<input type="text" name="city" placeholder="City" defaultValue={shippingAddress.city} />
<input type="text" name="state" placeholder="State" defaultValue={shippingAddress.state} />
<input type="text" name="zip" placeholder="Zip" defaultValue={shippingAddress.zip} />
<input type="text" name="phone" placeholder="Phone" defaultValue={shippingAddress.phone} />
<button className="custom-btn custom-save-btn" type="submit">
Save Address
</button>
</form>
) : (
<div className="custom-address-info">
<p>
{shippingAddress.name} {shippingAddress.lastName}
</p>
<p>{shippingAddress.address}</p>
<p>
{shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zip}
</p>
<p>{shippingAddress.phone}</p>
</div>
)}
</div>
</div> */}
</div>
)}
{activeTab === 'account-detail' && (
<div className="custom-tab-pane custom-fade custom-active custom-show">
<div className="custom-card">
<div className="custom-card-header">
<h3 className="custom-mb-0">Account Details</h3>
<button className="custom-btn custom-edit-btn" onClick={() => handleEditClick('account')}>
Edit
</button>
</div>
<div className="custom-card-body">
{isEditingAccount ? (
  <form
  className="custom-account-form space-y-6 p-6 bg-white rounded-lg shadow-lg"
  onSubmit={(event) => handleSaveClick(event, 'account')}
>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="name">First Name</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="name"
      name="name"
      placeholder="First Name"
      defaultValue={userDetails.name}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="email">Email</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      defaultValue={userDetails.email}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="phone">Phone Number</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="number"
      id="phone"
      name="phone"
      placeholder="Phone Number"
      defaultValue={userDetails.phone}
    />
  </div>
  {/* <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="password">Password</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="password"
      name="password"
      placeholder="Password"
      defaultValue={userDetails.password}
    />
  </div>
  <div className="flex flex-col space-y-4">
    <label className="text-lg font-medium" htmlFor="confirmPassword">Confirm Password</label>
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="text"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="Confirm Password"
      defaultValue={userDetails.confirmPassword}
    />
  </div> */}
  <div className="flex space-x-4">
    <button
      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      type="submit"
    >
      Save Changes
    </button>
    <button
      className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150"
      type="button"
      onClick={() => setIsEditingAccount(false)}
    >
      Cancel
    </button>
  </div>
</form>

) : (
  <div className="custom-account-info p-6 bg-gray-100 rounded-lg shadow-lg space-y-4">
  <p className="text-xl font-semibold">
    Name:&nbsp;
    <span className="font-normal">{userDetails.name} {userDetails.lastName}</span>
  </p>
  <p className="text-xl font-semibold">
    Email:&nbsp;
    <span className="font-normal">{userDetails.email}</span>
  </p>
  <p className="text-xl font-semibold">
    Phone:&nbsp;
    <span className="font-normal">{userDetails.phone}</span>
  </p>
  {/* <p className="text-xl font-semibold">
    Address Type:&nbsp;
    <span className="font-normal">{billingAddress[0].addressType}</span>
  </p>
  <p className="text-xl font-semibold">
    Flat Number:&nbsp;
    <span className="font-normal">{billingAddress[0].flatNumber}</span>
  </p>
  <p className="text-xl font-semibold">
    Floor:&nbsp;
    <span className="font-normal">{billingAddress[0].floor}</span>
  </p>
  <p className="text-xl font-semibold">
    Locality:&nbsp;
    <span className="font-normal">{billingAddress[0].locality}</span>
  </p>
  <p className="text-xl font-semibold">
    Landmark:&nbsp;
    <span className="font-normal">{billingAddress[0].landmark}</span>
  </p>
  <p className="text-xl font-semibold">
    Phone:&nbsp;
    <span className="font-normal">{billingAddress[0].phone}</span>
  </p> */}
  {/* <p className="text-xl font-semibold">
    Password:&nbsp;
    <span className="font-normal">{userDetails.password}</span>
  </p> */}
</div>


)}
</div>
</div>
</div>
)}
</div>
</div>
</div>
 {isAddAddressModalOpen && <AddAddress onClose={closeAddAddress} />}
 {isModalOpen && (
        <AddAddress onClose={handleCloseModal} billingAddress={billingAddress} />
      )}
</div>
);
};

export default SettingsPage;
