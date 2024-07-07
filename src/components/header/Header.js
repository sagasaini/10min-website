import React, { useState, useEffect, useRef } from 'react';
import '../header/Header.css';
// import Logo from '../../assets/images/logo.svg';
import Logo from '../../assets/imgs/theme/logo.jpg'
import SearchIcon from '@mui/icons-material/Search';
import Select from '../selectDrop/select';
import axios from 'axios';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconCompare from '../../assets/images/icon-compare.svg';
import IconHeart from '../../assets/images/icon-heart.svg';
import IconCart from '../../assets/images/icon-cart.svg';
import IconUser from '../../assets/images/icon-user.svg';
import LocationModal from './nav/LocationModal';

import Button from '@mui/material/Button';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import {ClickAwayListener} from '@mui/base/ClickAwayListener';

import Nav from './nav/nav';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CartModal from '../../pages/cart/CartModal';
import { CartButton, CartPanel } from '../cart';

const Header = (props) => {

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCartModal = () => {
        setIsCartOpen(!isCartOpen);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState("H54C+WPH, Kapoor Wali Gali, Rama Market, Baba Gangnath Market, Munirka, New Delhi, Delhi 110067, India");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const [isOpenAccDropDown, setisOpenAccDropDown] = useState(false);
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isopenSearch, setOpenSearch] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);

    const headerRef = useRef();
    const searchInput = useRef();

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
    }, [context.cartItems]);

    const [categories, setcategories] = useState([
        'Milks and Dairies',
        'Wines & Drinks',
        'Clothing & beauty',
        'Fresh Seafood',
        'Pet Foods & Toy',
        'Fast food',
        'Baking material',
        'Vegetables',
        'Fresh Fruit',
        'Bread and Juice',
        'Milks and Dairies',
        'Wines & Drinks',
        'Clothing & beauty',
        'Fresh Seafood'
    ]);

    const countryList = [];

    useEffect(() => {
        getCountry('https://countriesnow.space/api/v0.1/countries/');
    }, []);

    const getCountry = async (url) => {
        try {
            await axios.get(url).then((res) => {
                if (res !== null) {
                    res.data.data.map((item, index) => {
                        countryList.push(item.country);
                    });
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            let position = window.pageYOffset;
            if (position > 100) {
                headerRef.current.classList.add('fixed');
            } else {
                headerRef.current.classList.remove('fixed');
            }
        });
    }, []);

    const signOut = () => {
        context.signOut();
        history('/');
    };

    const openSearch = () => {
        setOpenSearch(true);
        searchInput.current.focus();
    };

    const closeSearch = () => {
        setOpenSearch(false);
        searchInput.current.blur();
        searchInput.current.value = "";
    };

    const openNav = () => {
        setIsOpenNav(true);
        context.setIsopenNavigation(true);
    };

    const closeNav = () => {
        setIsOpenNav(false);
        setisOpenAccDropDown(false);
        context.setIsopenNavigation(false);
    };

    return (
        <>
            <div className='headerWrapper' ref={headerRef}>
                <header>
                    <div className='container-fluid'>
                        <div className='header-row'>
                        <div className="header-time">
                            <div className='col-sm-2 part1   align-items-center'>
                                <Link to="/">
                                    <img style={{width: '160px'}} src={Logo} className='logo' alt="Logo" />
                                </Link>
                                {windowWidth < 992 &&
                                <>
                                    <div className="download-app-header-info-heading-container">
            <div className="download-app-header-info-heading">Get the app</div>
            <div className="download-app-header-info-subheading">for better experience and</div>
            <div className="download-app-header-info-subheading">exclusive features</div>
        </div>
        <div class="DownloadAppHeader__UseAppButton-sc-6iwe8i-5 jEmEUh">Use app</div>

        </>
        
                                }
                            </div>
                            

                            <div style={{ display:'flex',gap:'20px',paddingBottom: '10px'}} className='part2'>
                            <div className="location-bar-container">
                <div className="location-bar-eta-container">
                    <div className="location-bar-title">Delivery in 9 minutes</div>
                    <div className="location-bar-subtitle-container">
                        <div className="location-bar-subtitle">{address.length > 50 ? `${address.substring(0, 40)}...` : address}</div>
                        <div className="location-bar-arrow-container" onClick={openModal}>
                            <div className="location-bar-down-arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
            {windowWidth < 992 && (
    <div className='align-items-center'>
        {context.isLogin === "true" ? (
            <div className='myAccDrop' onClick={() => setisOpenAccDropDown(!isOpenAccDropDown)}>
                <PersonOutlineOutlinedIcon />
            </div>
        ) : (
            <Link to={'/signIn'}>
                <Button className="btn btn-g">Sign In</Button>
            </Link>
        )}
    </div>
)}
                                
                                    
            {isModalOpen && <LocationModal closeModal={closeModal} />}
                                <div className={`headerSearch align-items-center ${isopenSearch === true ? 'open' : ''}`}>
                             
                                   
                                    <div className='search'>
                                        <input type='text' placeholder='Search for items...' ref={searchInput} />
                                        <SearchIcon className="searchIcon cursor" />
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className='  align-items-center part3 res-hide'>
                                <div className='  align-items-center'>
                                    {/* <div className='countryWrapper'>
                                        <Select data={countryList} placeholder={'Your Location'} icon={<LocationOnOutlinedIcon style={{ opacity: '0.5' }} />} />
                                    </div> */}
                                    <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                                        <ul className=' flex list list-inline mb-0 headerTabs'>
                                            {/* <li className='list-inline-item'>
                                                <span>
                                                    <img src={IconCompare} alt="Compare" />
                                                    <span className='badge bg-success rounded-circle'>3</span>
                                                    Compare
                                                </span>
                                            </li> */}
                                            {/* <li className='list-inline-item'>
                                                <span>
                                                    <img src={IconHeart} alt="Wishlist" />
                                                    <Link to='/wishlist'><span className='badge bg-success rounded-circle'>3</span></Link>
                                                    Wishlist
                                                </span>
                                            </li> */}
                                            {/* <li  onClick={toggleCartModal} className='list-inline-item'>
                                                <span>
                                                    
                                                        <img src={IconCart} alt="Cart" />
                                                        <span className='badge bg-success rounded-circle'>
                                                            {context.cartItems.length}
                                                         </span>
                                                        Cart
                                                      
                                                </span>
                                            </li> */}
                                            <li>

                                            <CartButton  />
                                            </li>
                                           
                                            {context.isLogin === "true" ?
                                                <li className='list-inline-item'>
                                                    <span onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                                                        <img src={IconUser} alt="Account" />
                                                        Account
                                                    </span>
                                                   
                                                    {isOpenDropDown && 
                                                        <ul className='dropdownMenu'>
                                                        <Link to='/setting'>  <li><Button className='align-items-center'><Person2OutlinedIcon /> My Account</Button></li></Link>
                                                           <Link to='/setting'> <li><Button><LocationOnOutlinedIcon /> Order Tracking</Button></li></Link>
                                                           {/* <Link to='/wishlist'>  <li><Button><FavoriteBorderOutlinedIcon /> My Wishlist</Button></li></Link> */}
                                                           <Link to='/setting'> <li><Button><SettingsOutlinedIcon /> Setting</Button></li></Link>
                                                            <li><Button onClick={signOut}><LogoutOutlinedIcon /> Sign out</Button></li>
                                                        </ul>
                                                    }
                                                </li>
                                                :
                                                <li className='list-inline-item'>
                                                    <Link to={'/signIn'}>
                                                        <Button className="btn btn-g">Sign In</Button>
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </ClickAwayListener>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Nav data={props.data} openNav={isOpenNav} closeNav={closeNav} />
            </div>

            <div className='afterHeader'>

            </div>

            {isOpenAccDropDown &&
                <>
                    <div className='navbarOverlay' onClick={closeNav}></div>
                    <ul className='dropdownMenu dropdownMenuAcc' onClick={closeNav}>
                        <li><Button className='align-items-center'><Link to="/setting"><Person2OutlinedIcon /> My Account</Link></Button></li>
                        {/* <li><Button className='align-items-center'><Link to=""><img src={IconCompare} alt="Compare" />Compare</Link></Button></li> */}
                        <li><Button className='align-items-center'><Link to="/cart-items"><img src={IconCart} alt="Cart" />Cart</Link></Button></li>
                        <li><Button><Link to="/setting"><LocationOnOutlinedIcon /> Order Tracking</Link></Button></li>
                        {/* <li><Button><Link to="wishlist"><FavoriteBorderOutlinedIcon /> My Wishlist</Link></Button></li> */}
                        <li><Button><Link to="/setting"><SettingsOutlinedIcon /> Setting</Link></Button></li>
                        <li><Button onClick={signOut}><Link to="/"><LogoutOutlinedIcon /> Sign out</Link></Button></li>
                    </ul>
                </>
            }
        </>
    );
}

export default Header;