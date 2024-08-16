import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from 'react-slick';
import axios from 'axios';
import { MyContext } from '../../App';
import AddToCartButton from '../../components/shared/AddToCartButton';
import Product from '../../components/product';

let selectedWeight
let selectedPrice
const DetailsPage = () => {
    const [selectedPrice,setSelectedPrice]=useState()
    const [selectedWeight,setSelectedWeight]=useState()
    const [zoomImage, setZoomImage] = useState('');
    const [bigImageSize, setBigImageSize] = useState([1500, 1500]);
    const [smlImageSize, setSmlImageSize] = useState([150, 150]);
    const [activeSize, setActiveSize] = useState(0);
    const [inputValue, setInputValue] = useState(1);
    const [activeTabs, setActiveTabs] = useState(0);
    const [currentProduct, setCurrentProduct] = useState({});
    const context = useContext(MyContext);
    const [prodCat, setProdCat] = useState({
        parentCat: sessionStorage.getItem('parentCat'),
        subCatName: sessionStorage.getItem('subCatName')
    });
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [rating, setRating] = useState(0.0);
    const [reviewsArr, setReviewsArr] = useState([]);
    const [isAlreadyAddedInCart, setIsAlreadyAddedInCart] = useState(false);
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://10min.in/api/api/products/${id}`);
                setProduct(response.data);
                console.log(response.data)
                setZoomImage(response.data.images[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Error fetching product details');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 992 ? true : false,
    };

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (product && product.subCat._id) {
                console.log(product.subCat.subCat)

                try {
                    const response = await axios.get(`https://10min.in/api/api/products/subcategory/${product.subCat.subCat}`);
                    setRelatedProducts(response.data);
                } catch (error) {
                    console.error('Error fetching related products:', error);
                }
            }
        };
        fetchRelatedProducts();
    }, [product]);

    const goto = (index) => {
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    };

    const isActive = (index) => {   
        setActiveSize(index);
    };

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (product  && product.subCat._id) {
                try {
                    const response = await axios.get(`https://10min.in/api/api/products/subcategory/${product.subCat._id}`);
                    setRelatedProducts(response.data);
                } catch (error) {
                    console.error('Error fetching related products:', error);
                }
            }
        };
        fetchRelatedProducts();
    }, [product]);

    // console.log(product)
    // console.log(product.subCat)
    // console.log(product.subCat)
    useEffect(()=>{
        if(product){

        
         const weight = product.productWeight ? product?.productWeight[activeSize] : null;
        const price = product.price ? product?.price[activeSize] : null;
        setSelectedWeight(weight)
        setSelectedPrice(price)
        console.log('weight',selectedWeight)
        console.log('price',selectedPrice)
        }   
    },[activeSize,product])

    const plus = () => {
        setInputValue(inputValue + 1);
    };

    const minus = () => {
        if (inputValue !== 1) {
            setInputValue(inputValue - 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // const selectedWeight = product.productWeight ? product.productWeight[activeSize] : null;
    // const selectedPrice = product.price ? product.price[activeSize] : null;
    const selectedOldPrice = product.oldPrice ? product.oldPrice[activeSize] : null;

    return (
        <>
            <section style={{ paddingTop: '30px' }} className="detailsPage mb-5">
                {context.windowWidth > 992 && (
                    <div className="breadcrumbWrapper mb-4">
                        <div className="container-fluid">
                            <ul className="breadcrumb breadcrumb2 mb-0">
                                <li><Link to="/">Home</Link></li>
                                <li>
                                    <Link
                                        to={`/cat/${prodCat.parentCat.split(' ').join('-').toLowerCase()}`}
                                        onClick={() => sessionStorage.setItem('cat', prodCat.parentCat.split(' ').join('-').toLowerCase())}
                                        className="text-capitalize"
                                    >
                                        {prodCat.parentCat}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/cat/${prodCat.parentCat.toLowerCase()}/${prodCat.subCatName.replace(/\s/g, '-').toLowerCase()}`}
                                        onClick={() => sessionStorage.setItem('cat', prodCat.subCatName.toLowerCase())}
                                        className="text-capitalize"
                                    >
                                        {prodCat.subCatName}
                                    </Link>
                                </li>
                                <li>{product.name}</li>
                            </ul>
                        </div>
                    </div>
                )}
                <div className="container detailsContainer pt-3 pb-3">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="productZoom">
                                <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                                    {product.images && product.images.map((imgUrl, index) => (
                                        <div className="item" key={index}>
                                            <InnerImageZoom
                                                zoomType="hover"
                                                zoomScale={1}
                                                src={`${imgUrl}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                                {product.images && product.images.map((imgUrl, index) => (
                                    <div className="item" key={index}>
                                        <img
                                            src={`${imgUrl}?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`}
                                            className="w-100"
                                            onClick={() => goto(index)}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="col-md-7 productInfo">
                            <h1>{product.name}</h1>
                            <div className="d-flex align-items-center mb-4 mt-3">
                                <Rating name="half-rating-read" value={parseFloat(product.rating)} precision={0.5} readOnly />
                                <span className="text-light ml-2">({product.rating} reviews)</span>
                            </div>
                            <div className="priceSec d-flex align-items-center mb-3">
                                <span className="text-g priceLarge">Rs {selectedPrice}</span>
                                <div className="ml-3 d-flex flex-column">
                                    {product.discount && <span className="text-org">{product.discount[activeSize]}% Off</span>}
                                    <span className="text-light oldPrice">Rs {selectedOldPrice}</span>
                                </div>
                            </div>
                            <p>{product.description}</p>
                            {product.productWeight && product.productWeight.length > 0 && (
                                <div className="productSize d-flex align-items-center">
                                    <span>Size / Weight:</span>
                                    <ul className="list list-inline mb-0 pl-4">
                                        {product.productWeight.map((item, index) => (
                                            <li className="list-inline-item" key={index}>
                                                <a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {product.RAM && product.RAM.length > 0 && (
                                <div className="productSize d-flex align-items-center">
                                    <span>RAM:</span>
                                    <ul className="list list-inline mb-0 pl-4">
                                        {product.RAM.map((ram, index) => (
                                            <li className="list-inline-item" key={index}>
                                                <a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>
                                                    {ram} GB
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {product.size && product.size.length > 0 && (
                                <div className="productSize d-flex align-items-center">
                                    <span>SIZE:</span>
                                    <ul className="list list-inline mb-0 pl-4">
                                        {product.size.map((size, index) => (
                                            <li className="list-inline-item" key={index}>
                                                <a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>
                                                    {size}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* <div className="quantityWrapper d-flex align-items-center mt-4 mb-4">
                                <span>Qty:</span>
                                <div className="quantity ml-3 d-flex align-items-center">
                                    <a className="btn countBtn" onClick={minus}>
                                        <i className="bi bi-dash"></i>
                                    </a>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className="countInput"
                                        value={inputValue}
                                        readOnly
                                    />
                                    <a className="btn countBtn" onClick={plus}>
                                        <i className="bi bi-plus"></i>
                                    </a>
                                </div>
                            </div> */}
                            <AddToCartButton product={product}
                                productId={product._id}
                                weight={selectedWeight}
                                price={selectedPrice}
                                quantity={inputValue}
                                isAlreadyAddedInCart={isAlreadyAddedInCart}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className='apiProductsSection'>
    <div className='container-fluid'>
        <h2 className='hd mb-0 mt-0'>All Products</h2>
        <div className='productGrid flex flex-wrap -mx-3 justify-center'>
            {Array.isArray(relatedProducts) && relatedProducts.map((product, index) => (
                <div className='productItem w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3' key={index}>
                    <Product tag={product.type} item={product} />
                </div>
            ))}
        </div>
    </div>
</section>
            
        </>
    );
};

export default DetailsPage;
