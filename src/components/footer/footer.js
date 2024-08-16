import React from 'react';
import './footer.css';

import Icon1 from '../../assets/images/icon-1.svg';
import Icon2 from '../../assets/images/icon-2.svg'
import Icon3 from '../../assets/images/icon-3.svg'
import Icon4 from '../../assets/images/icon-4.svg'
import Icon5 from '../../assets/images/icon-5.svg'
import Logo from '../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import paymentImage from '../../assets/images/payment-method.png';

import appStore from '../../assets/images/app-store.jpg';
import googlePlay from '../../assets/images/google-play.jpg';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Newsletter from '../../components/newsletter/index';
import NewsletterImg from '../../assets/images/newsletter.png';
import {  useAppDispatch } from '../../hooks/useAppDispatch';
import { showCart } from '../../store/ui';


const Footer = () => {
    const dispatch = useAppDispatch();
    return (
        <>

            <section className='newsLetterSection'>
                <div className='container-fluid'>
                    <div className='box d-flex align-items-center'>
                        <div className='info'>
                            <h2>Stay home & get your daily <br />needs from our shop</h2>
                            <p>Start You'r Daily Shopping with 10Min</p>
                            <br /><br className='res-hide' />
                            {/* <Newsletter /> */}
                        </div>

                        <div className='img'>
                            <img src={NewsletterImg} className='w-100' />
                        </div>
                    </div>
                </div>
            </section>

            <div className='footerWrapper'>
                <div className='footerBoxes'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col'>
                                <div className='box d-flex align-items-center w-100'>
                                    <span><img src={Icon1} /></span>
                                    <div className='info'>
                                        <h4>Best prices & offers</h4>
                                        <p>Orders ₹50 or more</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col'>
                                <div className='box d-flex align-items-center w-100'>
                                    <span><img src={Icon2} /></span>
                                    <div className='info'>
                                        <h4>Free delivery</h4>
                                        <p>Orders ₹50 or more</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col'>
                                <div className='box d-flex align-items-center w-100'>
                                    <span><img src={Icon3} /></span>
                                    <div className='info'>
                                        <h4>Great daily deal</h4>
                                        <p>Orders ₹50 or more</p>
                                    </div>
                                </div>
                            </div>


                            <div className='col'>
                                <div className='box d-flex align-items-center w-100'>
                                    <span><img src={Icon4} /></span>
                                    <div className='info'>
                                        <h4>Wide assortment</h4>
                                        <p>Orders ₹50 or more</p>
                                    </div>
                                </div>
                            </div>


                            <div className='col'>
                                <div className='box d-flex align-items-center w-100'>
                                    <span><img src={Icon5} /></span>
                                    <div className='info'>
                                        <h4>Easy returns</h4>
                                        <p>Orders ₹50 or more</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <footer>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-3 part1'>
                            <Link to='/'>
  <img style={{ maxWidth: '50%' }} src={Logo} alt="Logo" />
</Link>
                                <br /><br />
                                <p>Awesome grocery store </p>
                                <br />

                                <p><LocationOnOutlinedIcon /> <strong>Address</strong>: Bhagat chauraha, near kadambari Hight, Taramandal, Gorakhpur, Uttar Pradesh 273016</p>
                                <p><HeadphonesOutlinedIcon /> <strong>Call Us:</strong> (+91) -889-696-4674 </p>
                                <p><EmailOutlinedIcon /> <strong>Email:</strong> 000shub000@gamil.com</p>
                                <p><WatchLaterOutlinedIcon /> <strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>

                            </div>


                            <div className='col-md-6 part2'>
                                <div className='row'>
                                    <div className='col'>
                                        <h3>Company</h3>
                                        <ul class="footer-list mb-sm-5 mb-md-0">
                                            <li><Link to="/about-us">About Us</Link></li>
                                            <li><Link to="/tracking">Delivery Information</Link></li>
                                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                            <li><Link to="terms-and-condition">Terms &amp; Conditions</Link></li>
                                            <li><Link to="/contact-us">Contact Us</Link></li>
                                            {/* <li><Link to="#">Support Center</Link></li>
                                            <li><Link to="#">Careers</Link></li> */}
                                        </ul>
                                    </div>

                                    <div className='col'>
                                        <h3>Account</h3>
                                        <ul class="footer-list mb-sm-5 mb-md-0">
                                            <li><Link to="/signIn">SignIn</Link></li>
                                            <li  onClick={() => dispatch(showCart())}><Link to="">View Cart</Link></li>
                                            {/* <li><Link to="#">My Wishlist</Link></li> */}
                                            <li><Link to="/tracking">Track &amp; My Order</Link></li>
                                            {/* <li><Link to="#">Help Tickt</Link></li> */}
                                            {/* <li><Link to="#">Shipping Details</Link></li> */}
                                            {/* <li><Link to="#"></Link></li> */}
                                        </ul>
                                    </div>


                                    {/* <div className='col'>
                                        <h3>Corporate</h3>
                                        <ul class="footer-list mb-sm-5 mb-md-0">
                                            <li><Link to="#">Become a Vendor</Link></li>
                                            <li><Link to="#">Affiliate Program</Link></li>
                                            <li><Link to="#">Farm Buisness</Link></li>
                                            <li><Link to="#"> Farm Careers</Link></li>
                                            <li><Link to="#">Our Suppliers</Link></li>
                                            <li><Link to="#">Accessibility</Link></li>
                                            <li><Link to="#">Promotions</Link></li>
                                        </ul>
                                    </div> */}


                                    <div className='col'>
                                        <h3>Popular</h3>
                                        <ul class="footer-list mb-sm-5 mb-md-0">
                                            <li><Link to="#">Milk & Flavoured Milk</Link></li>
                                            <li><Link to="#">Butter and Margraine</Link></li>
                                            <li><Link to="#">Eggs Substitutes</Link></li>
                                            <li><Link to="#">Marmaladas</Link></li>
                                            <li><Link to="#">Sour Creams and Dips</Link></li>
                                            <li><Link to="#">Tea and Kombucha</Link></li>
                                            <li><Link to="#">Cheese</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className='col-md-3 part3'>
                                <h3>Install App</h3>
                                <br className='res-hide'/>
                                <p>From App Store or Google Play</p>

                                <div className='d-flex'>
                                    <Link to={''}><img src={appStore} width={150} /></Link>
                                    <Link to={''}><img src={googlePlay} className='mx-2' width={150} /></Link>
                                </div>

                                <br />

                                <p>Secured Payment Gateways</p>
                                <img src={paymentImage} />
                            </div>

                        </div>


                        <hr />



                        <div className='row lastStrip'>
                            <div className='col-md-3 part_1'>
                                <p>© 2024, 10Min
                                    All rights reserved</p>
                            </div>

                            <div className='col-md-6 d-flex part_2'>
                                <div className='m-auto d-flex align-items-center phWrap'>
                                    <div className='phNo d-flex align-items-center mx-5'>
                                        <span><HeadphonesOutlinedIcon /></span>
                                        <div className='info ml-3'>
                                            <h3 className='text-g mb-0'>+91-889-696-4674</h3>
                                            <p className='mb-0'>24/7 Support Center</p>
                                        </div>
                                    </div>

                                    <div className='phNo d-flex align-items-center  mx-5'>
                                        <span><HeadphonesOutlinedIcon /></span>
                                        <div className='info ml-3'>
                                            <h3 className='text-g mb-0'>+91-889-696-4674</h3>
                                            <p className='mb-0'>24/7 Support Center</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='col-md-3 part3  part_3'>
                                <div className='d-flex align-items-center'>
                                    <h5>Follow Us</h5>
                                    <ul className='list list-inline'>
                                        <li className='list-inline-item'>
                                            <Link to={''}><FacebookOutlinedIcon /></Link>
                                        </li>
                                        <li className='list-inline-item'>
                                            <Link to={''}><TwitterIcon /></Link>
                                        </li>
                                        <li className='list-inline-item'>
                                            <Link to={'https://www.instagram.com/10min.in?igsh=dXM2Y2xhODhhOGJ0&utm_source=qr'}><InstagramIcon /></Link>
                                        </li>
                                        <li className='list-inline-item'>
                                            <Link to={''}><YouTubeIcon /></Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </footer>


            </div>
        </>
    )
}

export default Footer;