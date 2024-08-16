import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
// import Product from '../../components/Product'; // Ensure this path is correct
import { Button } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import axios from 'axios';
import { MyContext } from '../../App';
import Product from './../../components/product/index';

const Listing = (props) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const [isOpenDropDown2, setIsOpenDropDown2] = useState(false);
    const [showPerPage, setShowPerPage] = useState(3);
    const [data, setData] = useState([]);
    const context = useContext(MyContext);
    const { categoryId, subCatId } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let endpoint = '';
                if (props.single) {
                    endpoint = `https://10min.in/api/api/products/category/${categoryId}`;
                } else {
                    endpoint = `https://10min.in/api/api/products/subcategory/${subCatId}`;
                }

                console.log('Fetching products from endpoint:', endpoint);

                const response = await axios.get(endpoint);
                const products = response.data.map((item) => ({
                    ...item,
                    parentCatId: item.category._id, // Using id for category
                    subCatId: item.subCat._id, // Using id for subCat
                }));

                console.log('Fetched products:', products); // Debugging

                setData(products);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        

        

        fetchProducts();
    }, [categoryId, subCatId, props.single]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get(`https://10min.in/api/api/category/subcat/${categoryId}`);
                setSubcategories(response.data);
                // console.log(categoryId)
                // console.log(subcategories)
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        if (categoryId) {
            fetchSubcategories();
        }
    }, [categoryId]);


    const filterByBrand = (keyword) => {
        const filteredData = data.filter(item => item.brand.toLowerCase() === keyword.toLowerCase());
        setData(filteredData);
        window.scrollTo(0, 0);
    };

    const filterByPrice = (minValue, maxValue) => {
        const filteredData = data.filter(item => {
            const price = parseInt(item.price.toString().replace(/,/g, ""));
            return minValue <= price && maxValue >= price;
        });
        setData(filteredData);
    };

    const filterByRating = (keyword) => {
        const filteredData = data.filter(item => item.rating === keyword);
        setData(filteredData);
        window.scrollTo(0, 0);
    };

    return (
        <>
          
            {context.windowWidth < 992 && (
                <>
                    {!context.isopenNavigation && (
                        <Button className='btn-g btn-lg w-100 filterBtn' onClick={() => context.openFilters()}>Filters</Button>
                    )}
                </>
            )}

            <section className='listingPage'>
                <div className='container-fluid'>
                    <div className='breadcrumb flex-column'>
                        <h1 className="text-capitalize">{categoryId}</h1>
                        <ul className='list list-inline mb-0'>
                            <li className='list-inline-item'>
                                <Link to={''}>Home </Link>
                            </li>
                            <li className='list-inline-item'>
                                <Link to={`/cat/${sessionStorage.getItem('cat')}`} className='text-capitalize'>{sessionStorage.getItem('cat')} </Link>
                            </li>
                            {!props.single && (
                                <li className='list-inline-item'>
                                    <Link to={''} className="text-capitalize">{subCatId}</Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className='listingData'>
                        <div className='row'>
                            <div className={`col-md-3 sidebarWrapper ${context.isOpenFilters === true && 'click'}`}>
                            {data && (
                                    <Sidebar data={subcategories} currentCatData={data} filterByBrand={filterByBrand} filterByPrice={filterByPrice} filterByRating={filterByRating} />
                                )}
                            </div>

                            <div className='col-md-9 rightContent homeProducts pt-0'>
                                <div className='topStrip d-flex align-items-center'>
                                    <p className='mb-0'>We found <span className='text-success'>{data.length}</span> items for you!</p>
                                    <div className='ml-auto d-flex align-items-center'>
                                        <div className='tab_ position-relative'>
                                            <Button className='btn_' onClick={() => setIsOpenDropDown(!isOpenDropDown)}><GridViewOutlinedIcon /> Show: {showPerPage * 5}</Button>
                                            {isOpenDropDown && (
                                                <ul className='dropdownMenu'>
                                                    <li>
                                                        <Button className='align-items-center'
                                                            onClick={() => {
                                                                setIsOpenDropDown(false);
                                                                setShowPerPage(1);
                                                            }}
                                                        >
                                                            5
                                                        </Button>
                                                    </li>
                                                    <li>
                                                        <Button className='align-items-center'
                                                            onClick={() => {
                                                                setIsOpenDropDown(false);
                                                                setShowPerPage(2);
                                                            }}
                                                        >
                                                            10
                                                        </Button>
                                                    </li>
                                                    <li>
                                                        <Button className='align-items-center'
                                                            onClick={() => {
                                                                setIsOpenDropDown(false);
                                                                setShowPerPage(3);
                                                            }}
                                                        >
                                                            15
                                                        </Button>
                                                    </li>
                                                    <li>
                                                        <Button className='align-items-center'
                                                            onClick={() => {
                                                                setIsOpenDropDown(false);
                                                                setShowPerPage(4);
                                                            }}
                                                        >
                                                            20
                                                        </Button>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                        <div className='tab_ ml-3 position-relative'>
                                            <Button className='btn_' onClick={() => setIsOpenDropDown2(!isOpenDropDown2)}><FilterListOutlinedIcon /> Sort by: Featured </Button>
                                            {isOpenDropDown2 && (
                                                <ul className='dropdownMenu'>
                                                    <li><Button className='align-items-center' onClick={() => setIsOpenDropDown2(false)}>Featured</Button></li>
                                                    <li><Button className='align-items-center' onClick={() => setIsOpenDropDown2(false)}> Price: Low to High</Button></li>
                                                    <li><Button className='align-items-center' onClick={() => setIsOpenDropDown2(false)}> Price: High to Low</Button></li>
                                                    <li><Button className='align-items-center' onClick={() => setIsOpenDropDown2(false)}> Release Date</Button></li>
                                                    <li><Button className='align-items-center' onClick={() => setIsOpenDropDown2(false)}> Avg. Rating</Button></li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <section className='apiProductsSection'>
                                    <div className='container-fluid'>
                                        <h2 className='hd mb-0 mt-0'>All Products</h2>
                                        <div 
                                        className='productGrid flex flex-wrap -mx-3 justify-center'
                                        >
                                        
                                       {
                                            data.map((item,index)=>{
                                                return(
                                                    <div div className='sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3'>
                                              <Product tag={item.type} item={item} />
                                                    </div>
                                                )
                                            })
                                         }

                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Listing;
