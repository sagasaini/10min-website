import React, { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.js';
import Footer from './components/footer/footer';
import Home from './pages/Home/index';
import About from './pages/DeliveryTracking/index';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/Details';
import Checkout from './pages/checkout';
import axios from 'axios';
import Cart from './pages/cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Loader from './assets/images/loading.gif';

import data from './data';
import ContactPage from './pages/contact';
import AboutUs from './pages/Aboutus';
import DeliveryTracking from './pages/DeliveryTracking/index';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Settings from './pages/setting';
import VendorList from './pages/Vendor';
import CartModal from './pages/cart/CartModal';
import HomeLayout from './pages/HomeLayout.js';
import Order from './pages/orders/Order.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import AvailableCitiesModal from './components/Dashboard/AvailableCitiesModal.js';

const MyContext = createContext();

function App() {

  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isopenNavigation, setIsopenNavigation] = useState(false);
  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsopenFilters] = useState(false);
  const [cartTotalAmount, setCartTotalAmount] = useState();

  useEffect(() => {
    getCartData("http://localhost:5000/cartItems");

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);

    setTimeout(() => {
      setProductData(data[1]);
      setIsloading(false);
    }, 3000);
  }, []);

  const getCartData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        setCartItems(response.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToCart = async (item) => {
    item.quantity = 1;
    try {
      await axios.post("http://localhost:5000/cartItems", item).then((res) => {
        if (res !== undefined) {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemsFromCart = async (id) => {
    const response = await axios.delete(`http://localhost:5000/cartItems/${id}`);
    if (response !== null) {
      getCartData("http://localhost:5000/cartItems");
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  };

  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  };

  const openFilters = () => {
    setIsopenFilters(!isOpenFilters);
  };

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isopenNavigation,
    setIsopenNavigation,
    setCartTotalAmount,
    cartTotalAmount,
    setCartItems,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={value}>
        {isLoading && (
          <div className="loader">
            <img src={Loader} alt="Loading..." />
          </div>

        )}
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home data={data.productData} />} />
            <Route path="cat/:id" element={<Listing data={data.productData} single={true} />} />
            <Route path="cat/:id/:id" element={<Listing data={data.productData} single={false} />} />
            <Route path="product/:id" element={<DetailsPage data={data.productData} />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="tracking" element={<DeliveryTracking />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="profile" element={<Profile />} />
            <Route path="setting" element={<Settings />} />
            <Route path="vendor" element={<VendorList />} />
            <Route path="cart-items" element={<CartModal />} />
            <Route path="order" element={<Order />} />
            
            <Route path="*" element={<NotFound />} />
            

          </Route>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/avilable-cities" element={<AvailableCitiesModal />} />

        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
