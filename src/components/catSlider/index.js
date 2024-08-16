import React, { useEffect, useRef, useState, useContext } from 'react';
import Slider from "react-slick";
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../../App';

const CatSlider = () => {
    const [allData, setAllData] = useState([]);
    const [totalLength, setTotalLength] = useState([]);
    const context = useContext(MyContext);

    const [itemBg, setItemBg] = useState([
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec'
    ]);

    const slider = useRef();

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 992 ? true : false,
        autoplay: context.windowWidth > 992 ? 2000 : false,
        centerMode: context.windowWidth > 992 ? true : false
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://10min.in/api/api/category');
                // Log the response to see the structure of the data
                console.log('Fetched categories:', response.data.categoryList);
                // Ensure response.data is an array
                setAllData(response.data.categoryList);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <div className='catSliderSection'>
                <div className='container-fluid' ref={slider}>
                    <h2 className='hd'>Featured Categories</h2>
                    <Slider {...settings} className='cat_slider_Main'  id="cat_slider_Main">
                        {Array.isArray(allData) && allData.length !== 0 && allData.map((item, index) => {
                            return (
                                
                                
                                <div className='item' key={index}>
                                    <Link to={`/cat/${item.name}`}>
                                        <div className='info' style={{ background: itemBg[index % itemBg.length] , height:'250px' }}>
                                            <img src={item.images} width="80" alt={item.name} />
                                            <h5 className='text-capitalize mt-3'>{item.name}</h5>
                                            <p>View All</p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default CatSlider;
