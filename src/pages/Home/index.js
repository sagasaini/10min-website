import React, { useState, useEffect, useRef, useContext } from 'react';
import SliderBanner from './slider/index';
import CatSlider from '../../components/catSlider';
import Banners from '../../components/banners';
import './style.css';
import Product from '../../components/product';
import Slider from "react-slick";
import TopProducts from './slider/TopProducts';
import axios from 'axios';
import { MyContext } from '../../App';
import { useAppSelector } from '../../hooks/useAppSelector';
import CategoryProducts from './CategoryProducts/CategoryProducts';

const Home = (props) => {
    const { billAmount, totalQuantity } = useAppSelector((state) => state.cart);
    const [prodData, setProdData] = useState(props.data);
    const [catArray, setCatArray] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeTabData, setActiveTabData] = useState([]);
    const [bestSells, setBestSells] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [apiProducts, setApiProducts] = useState([]);
    
    const productRow = useRef();
    const context = useContext(MyContext);

    var settings = {
        dots: false,
        infinite: context.windowWidth < 992 ? false : true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth < 992 ? false : true,
    };

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const fetchProducts = async () => {
          try {
            const response = await axios.get('https://10min.in/api/api/products');
            const data = response.data;
      
            if (data.products && Array.isArray(data.products)) {
              setApiProducts(data.products);
            } else {
              console.error('Unexpected API response format');
              setApiProducts([]);
            }
          } catch (error) {
            console.error('Error fetching products:', error);
            setApiProducts([]);
          }
        };
      
        fetchProducts();
      }, []);

    // useEffect(() => {
       
    //     if (prodData.length !== 0) {
    //         prodData.forEach((item) => {
    //             item.items.forEach((item_) => {
    //                 if (item_.cat_name === activeTab) {
    //                     item_.products.forEach((product) => {
    //                         arr.push({ ...product, parentCatName: item.cat_name, CatName: item_.cat_name });
    //                     });
    //                     setActiveTabData(arr);
    //                     setTimeout(() => {
    //                         setIsLoadingProducts(false);
    //                     }, 1000);
    //                 }
    //             });
    //         });
    //     }
    // }, [activeTab, activeTabData, prodData]);

    useEffect(() => {
        const bestSellsArr = [];
        if (prodData.length !== 0) {
            prodData.forEach((item) => {
                if (item.cat_name === "Electronics") {
                    item.items.forEach((item_) => {
                        item_.products.forEach((product) => {
                            bestSellsArr.push(product);
                        });
                    });
                }
            });
        }
        setBestSells(bestSellsArr);
    }, [prodData]);

    return (
        <div style={{ display: 'block' }}>
            <SliderBanner />
           
            <CatSlider data={prodData} />
            <Banners />
            <CategoryProducts />
            {/* <section className='apiProductsSection'>
    <div className='container-fluid'>
        <h2 className='hd mb-0 mt-0'>All Products</h2>
        <div className='productGrid flex flex-wrap -mx-3 justify-center'>
            {Array.isArray(apiProducts) && apiProducts.map((product, index) => (
                <div className='productItem w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3' key={index}>
                    <Product tag={product.type} item={product} />
                </div>
            ))}
        </div>
    </div>
</section> */}

            {/* <section className='homeProducts homeProductWrapper'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center homeProductsTitleWrap'>
                        <h2 className='hd mb-0 mt-0 res-full'>Popular Products</h2>
                        <ul className='list list-inline ml-auto filterTab mb-0 res-full'>
                            {catArray.length !== 0 &&
                                catArray.map((cat, index) => (
                                    <li className="list list-inline-item" key={index}>
                                        <a className={`cursor text-capitalize ${activeTabIndex === index ? 'act' : ''}`}
                                            onClick={() => {
                                                setActiveTab(cat);
                                                setActiveTabIndex(index);
                                                productRow.current.scrollLeft = 0;
                                                setIsLoadingProducts(true);
                                            }}>
                                            {cat}
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className={`productRow ${isLoadingProducts === true && 'loading'}`} ref={productRow}>
                        {activeTabData.length !== 0 &&
                            activeTabData.map((item, index) => (
<div className='item' key={index}>
<Product tag={item.type} item={item} />
</div>
))}
</div>
</div>
</section>
        <section className='homeProducts homeProductsRow2 pt-0'>
            <div className='container-fluid'>
                <div className='d-flex align-items-center'>
                    <h2 className='hd mb-0 mt-0'>Daily Best Sells</h2>
                </div>
                <br className='res-hide' /><br className='res-hide' />
                <div className='row'>
                    <div className='col-md-3 pr-5 res-hide'></div>
                    <div style={{ maxWidth: '100%' }} className='col-md-9'>
                        <Slider {...settings} className='prodSlider'>
                            {bestSells.length !== 0 &&
                                bestSells.map((item, index) => (
                                    <div className='item' key={index}>
                                        <Product tag={item.type} item={item} />
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section> */}

        {/* <section className='topProductsSection'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <TopProducts title="Top Selling" />
                    </div>
                    <div className='col'>
                        <TopProducts title="Trending Products" />
                    </div>
                    <div className='col'>
                        <TopProducts title="Recently added" />
                    </div>
                    <div className='col'>
                        <TopProducts title="Top Rated" />
                    </div>
                </div>
            </div>
        </section> */}
    </div>
);
};

export default Home;