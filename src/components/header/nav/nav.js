import React, { useEffect, useContext, useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewIcon from '@mui/icons-material/GridView';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import { MyContext } from '../../../App';

const Nav = (props) => {
    const [navData, setNavData] = useState([
        {
            cat_name: 'groceries',
            items: [
                { cat_name: 'dals and pulses' },
                { cat_name: 'Ghee & Oils' },
                { cat_name: 'Atta & Flours' },   
                { cat_name: 'masalas spices' }
            ]
        },
        {
            cat_name: 'Electronics',
            items: [
                { cat_name: 'Mobiles & Tablets' },
                { cat_name: 'TV & Speaker' }
               
                
            ]
        },
        {
            cat_name: 'Fashion',
            items: [
                { cat_name: 'Men Western Wear' },
                { cat_name: 'Women Western Wear' }
            ]
        }
    ]);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openDropdownMenu, setDropdownMenu] = useState(false);
    const [openDropdownMenuIndex, setDropdownMenuIndex] = useState(null);
    const [openMegaMenu, setOpenMegaMenu] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        setIsOpenNav(props.openNav);
    }, [props.openNav]);

    const closeNav = () => {
        props.closeNav();
    };

    const openDropdownFun = (index) => {
        setDropdownMenu(!openDropdownMenu);
        setDropdownMenuIndex(index);
    };

    return (
        <>
            {isOpenNav && <div className='navbarOverlay' onClick={props.closeNav}></div>}
            <div className={`nav d-flex align-items-center ${isOpenNav && 'click'}`}>
                <div className='container-fluid'>
                    <div className='row position-relative'>
                        <div className='col-sm-2 part1 d-flex align-items-center'>
                            <Button onClick={() => setOpenMegaMenu(!openMegaMenu)} className='bg-g text-white catTab res-hide'>
                                <GridViewIcon /> &nbsp;Browse All Categories <KeyboardArrowDownIcon className={`${openMegaMenu && 'rotateIcon'}`} />
                            </Button>
                        </div>

                        <div className='col-sm-8 part2 position-static'>
                            <nav className={isOpenNav ? 'open' : ''}>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <Button><Link to={'/'} onClick={props.closeNav}>Home</Link></Button>
                                    </li>
                                    <li className='list-inline-item'>
                                        <Button onClick={props.closeNav}><Link to='/about-us'>About</Link></Button>
                                    </li>
                                    <li className='list-inline-item'>
                                        <Button><Link to='/contact-us'>Contact</Link></Button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {openMegaMenu && (
                    <div className={`dropdown_menu megaMenu w-100 ${openMegaMenu && 'open'}`}>
                        <div className='row'>
                            {navData.length !== 0 && navData.map((item, index) => (
                                <div className='col' key={index}>
                                    <a href={`/cat/${item.cat_name.toLowerCase()}`}>
                                        <h4 className='text-g text-capitalize'>{item.cat_name}</h4>
                                    </a>
                                    {item.items.length !== 0 && (
                                        <ul className='mt-4 mb-0'>
                                            {item.items.map((item_, index_) => (
                                                <li key={index_}>
                                                    <Link onClick={props.closeNav} to={`/cat/${item.cat_name.toLowerCase()}/${item_.cat_name.replace(/\s/g, '-').toLowerCase()}`}>{item_.cat_name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                            <div className='col'>
                                <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-menu.png" className='w-100' alt="banner" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Nav;
