import React, { useState } from 'react';
import './Setting.css';
import { BiSolidUserAccount } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";


const orders = [
  {
    id: 1,
    shop: 'xyz ',
    location: 'Rajendra Nagar',
    orderId: '178727728384680',
    date: 'Sun, Jun 30, 2024, 08:05 PM',
    items: 'Realme c3',
    totalPaid: 148,
    status: 'active', // could be 'active' or 'ordered'
  },
  {
    id: 1,
    shop: 'xyz',
    location: 'Rajendra Nagar',
    orderId: '178727728384680',
    date: 'Sun, Jun 30, 2024, 08:05 PM',
    items: 'Realme c3',
    totalPaid: 148,
    status: 'active', // could be 'active' or 'ordered'
  },
  {
    id: 1,
    shop: 'xyz',
    location: 'Rajendra Nagar',
    orderId: '178727728384680',
    date: 'Sun, Jun 30, 2024, 08:05 PM',
    items: 'realme c3',
    totalPaid: 148,
    status: 'ordered', // could be 'active' or 'ordered'
  },

]


const SettingsPage = () => {

  

    
  const activeOrders = orders.filter(order => order.status === 'active');
  const pastOrders = orders.filter(order => order.status === 'ordered');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);

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

  const handleSaveClick = (event, section) => {
    event.preventDefault();
    // Add your save logic here
    if (section === 'account') setIsEditingAccount(false);
    if (section === 'billing') setIsEditingBilling(false);
    if (section === 'shipping') setIsEditingShipping(false);
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
                  <i className="fi-rs-settings-sliders mr-10"></i> <MdSpaceDashboard /> &nbsp;
                  Dashboard
                </a>
              </li>
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => handleTabClick('orders')}
                >
                  <i className="fi-rs-shopping-bag mr-10"></i><MdDeliveryDining />&nbsp;

                  Orders
                </a>
              </li>
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'track-orders' ? 'active' : ''}`}
                  onClick={() => handleTabClick('track-orders')}
                >
                  <i className="fi-rs-shopping-cart-check mr-10"></i><FaMapMarkedAlt /> &nbsp;
                  Your Order
                </a>
              </li>
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'address' ? 'active' : ''}`}
                  onClick={() => handleTabClick('address')}
                >
                  <i className="fi-rs-marker mr-10"></i><RiUserLocationFill /> &nbsp;
                  My Address
                </a>
              </li>
              <li className="custom-nav-item">
                <a
                  className={`custom-nav-link ${activeTab === 'account-detail' ? 'active' : ''}`}
                  onClick={() => handleTabClick('account-detail')}
                >
                  <i className="fi-rs-user mr-10"></i><BiSolidUserAccount /> &nbsp;
                  Account details
                </a>
              </li>
              <li className="custom-nav-item">
                <a className="custom-nav-link" href="/signIn">
                  <i className="fi-rs-sign-out mr-10"></i><TbLogout2 /> &nbsp;
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <div className="custom-dashboard-content">
            {activeTab === 'dashboard' && (
              <div className="custom-tab-pane custom-fade custom-active custom-show">
                <div className="custom-card">
                  <div className="custom-card-header">
                    <h3 className="custom-mb-0">Hello Rosie!</h3>
                  </div>
                  <div className="custom-card-body">
                  <p>
                      From your account dashboard, you can easily check &amp; view your <a className={`custom-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => handleTabClick('orders')}>recent orders</a>,<br />
                      manage your <a  className={`custom-link ${activeTab === 'address' ? 'active' : ''}`}
                  onClick={() => handleTabClick('address')}>shipping and billing addresses</a> and <a className={`custom-link ${activeTab === 'account-detail' ? 'active' : ''}`}
                  onClick={() => handleTabClick('account-detail')}>edit your password and account details.</a>
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
          <div key={order.id} className="order-card">
            <img src="https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_1280.jpg" alt="Order" className="order-image" />
            <div className="order-details">
              <h3>{order.shop}</h3>
              <p>{order.location}</p>
              <p>ORDER #{order.orderId} | {order.date}</p>
              <p>{order.items}</p>
              <div className="order-actions">
                <button className="get-help-btn">GET HELP</button>
                <p className="total-paid">Total Paid: ₹{order.totalPaid}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Ordered</h2>
      <div className="order-list">
        {pastOrders.map(order => (
          <div key={order.id} className="order-card">
            <img src="https://cdn.pixabay.com/photo/2016/11/18/13/47/apple-1834639_1280.jpg" alt="Order" className="order-image" />
            <div className="order-details">
              <h3>{order.shop}</h3>
              <p>{order.location}</p>
              <p>ORDER #{order.orderId} | {order.date}</p>
              <p>{order.items}</p>
              <div className="order-actions">
                <button className="get-help-btn">GET HELP</button>
                <p className="total-paid">Total Paid: ₹{order.totalPaid}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
            )}
            {activeTab === 'track-orders' && (
              <div className="custom-tab-pane custom-fade">
                <div className="custom-card">
                  <div className="custom-card-header">
                    <h3 className="custom-mb-0">Orders tracking</h3>
                  </div>
                  <div className="custom-card-body custom-contact-from-area">
                    <p>To track your order please enter your OrderID in the box below and press "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                    <div className="custom-row">
                      <div className="custom-col-lg-8">
                        <form className="custom-contact-form-style custom-mt-30 custom-mb-50" action="#" method="post">
                          <div className="custom-input-style custom-mb-20">
                            <label>Order ID</label>
                            <input name="order-id" placeholder="Found in your order confirmation email" type="text" />
                          </div>
                          <div className="custom-input-style custom-mb-20">
                            <label>Billing email</label>
                            <input name="billing-email" placeholder="Email you used during checkout" type="email" />
                          </div>
                          <button className="custom-submit custom-submit-auto-width" type="submit">Track</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'address' && (
              <div className="custom-tab-pane custom-fade">
                <div className="custom-row">
                  <div className="custom-col-lg-6">
                    <div className="custom-card custom-mb-3 custom-mb-lg-0">
                      <div className="custom-card-header">
                        <h3 className="custom-mb-0">Billing Address</h3>
                      </div>
                      <div className="custom-card-body">
                        {!isEditingBilling ? (
                          <div>
                            <address>
                              3522 Interstate<br />
                              75 Business Spur,<br />
                              Sault Ste. <br />Marie, MI 49783
                            </address>
                            <p>New York</p>
                            <button className="custom-btn-small" onClick={() => handleEditClick('billing')}>Edit</button>
                          </div>
                        ) : (
                          <form onSubmit={(e) => handleSaveClick(e, 'billing')}>
                            <div className="custom-form-group custom-mb-3">
                              <label>Address Line 1</label>
                              <input className="custom-form-control" type="text" defaultValue="3522 Interstate" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>Address Line 2</label>
                              <input className="custom-form-control" type="text" defaultValue="75 Business Spur" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>City</label>
                              <input className="custom-form-control" type="text" defaultValue="Sault Ste. Marie" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>State</label>
                              <input className="custom-form-control" type="text" defaultValue="MI" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>Postal Code</label>
                              <input className="custom-form-control" type="text" defaultValue="49783" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>Country</label>
                              <input className="custom-form-control" type="text" defaultValue="USA" />
                            </div>
                            <div className="custom-col-md-12">
                              <button type="submit" className="custom-btn custom-btn-fill-out custom-submit custom-font-weight-bold" value="Save">Save</button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="custom-col-lg-6">
                    <div className="custom-card">
                      <div className="custom-card-header">
                        <h3 className="custom-mb-0">Shipping Address</h3>
                      </div>
                      <div className="custom-card-body">
                        {!isEditingShipping ? (
                          <div>
                            <address>
                              4299 Express Lane<br />
                              Sarasota, <br />FL 34249 USA <br />Phone: 1.941.227.4444
                            </address>
                            <p>Sarasota</p>
                            <button className="custom-btn-small" onClick={() => handleEditClick('shipping')}>Edit</button>
                          </div>
                        ) : (
                          <form onSubmit={(e) => handleSaveClick(e, 'shipping')}>
                            <div className="custom-form-group custom-mb-3">
                              <label>Address Line 1</label>
                              <input className="custom-form-control" type="text" defaultValue="4299 Express Lane" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>Address Line 2</label>
                              <input className="custom-form-control" type="text" defaultValue="Sarasota" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>City</label>
                              <input className="custom-form-control" type="text" defaultValue="Sarasota" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>State</label>
                              <input className="custom-form-control" type="text" defaultValue="FL" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>Postal Code</label>
                              <input className="custom-form-control" type="text" defaultValue="34249" />
                            </div>
                            <div className="custom-form-group custom-mb-3">
                              <label>Country</label>
                              <input className="custom-form-control" type="text" defaultValue="USA" />
                            </div>
                            <div className="custom-col-md-12">
                              <button type="submit" className="custom-btn custom-btn-fill-out custom-submit custom-font-weight-bold" value="Save">Save</button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'account-detail' && (
              <div className="custom-tab-pane custom-fade">
                <div className="custom-card">
                  <div className="custom-card-header">
                    <h3 className="custom-mb-0">Account Details</h3>
                  </div>
                  <div className="custom-card-body">
                    {!isEditingAccount ? (
                      <div>
                        <p><strong>First Name:</strong> Rosie</p>
                        <p><strong>Last Name:</strong> Gardner</p>
                        <p><strong>Display Name:</strong> Rosie</p>
                        <p><strong>Email:</strong> rosie@example.com</p>
                        <button className="custom-btn custom-btn-fill-out custom-submit custom-font-weight-bold" onClick={() => handleEditClick('account')}>Edit Details</button>
                      </div>
                    ) : (
                      <form method="post" onSubmit={(e) => handleSaveClick(e, 'account')}>
                        <div className="custom-row">
                          <div className="custom-form-group custom-col-md-12">
                            <label>First Name <span className="custom-required">*</span></label>
                            <input required className="custom-form-control" name="first-name" type="text" defaultValue="Rosie" />
                          </div>
                          <div className="custom-form-group custom-col-md-12">
                            <label>Last Name <span className="custom-required">*</span></label>
                            <input required className="custom-form-control" name="last-name" type="text" defaultValue="Gardner" />
                          </div>
                          <div className="custom-form-group custom-col-md-12">
                            <label>Display Name <span className="custom-required">*</span></label>
                            <input required className="custom-form-control" name="dname" type="text" defaultValue="Rosie" />
                          </div>
                          <div className="custom-form-group custom-col-md-12">
                            <label>Email Address <span className="custom-required">*</span></label>
                            <input required className="custom-form-control" name="email" type="email" defaultValue="rosie@example.com" />
                          </div>
                          <div className="custom-form-group custom-col-md-12">
                            <label>Current Password <span className="custom-required">*</span></label>
                            <input required className="custom-form-control" name="password" type="password" />
                          </div>
                          <div className="custom-form-group custom-col-md-12">
                            <label>New Password <span className="custom-required">*</span></label>
                            <input required className="custom-form-control" name="npassword" type="password" />
                          </div>
                          <div className="custom-form-group custom-col-md-12">
                            <label>Confirm Password <span className="custom-required">*</span></label>
                            <input required className="custom-form-control" name="cpassword" type="password" />
                          </div>
                          <div className="custom-col-md-12">
                            <button type="submit" className="custom-btn custom-btn-fill-out custom-submit custom-font-weight-bold" name="submit" value="Submit">Save Changes</button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
