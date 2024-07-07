import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from '../components/shared/Header';
import Header from './../components/header/Header';
import { CartPanel } from '../components/cart';
import { useAppSelector } from '../hooks/useAppSelector';
import CartButtonBig from '../components/cart/CartButtonBig';
import data from '../data';
import Footer from '../components/footer/footer';

const HomeLayout = () => {
  const cartShown = useAppSelector((state) => state.ui.cartPanel);
  

  return (
    <><div>
      <Header data={data} />
      <CartButtonBig/>
      </div>
      {cartShown && <CartPanel />}
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
