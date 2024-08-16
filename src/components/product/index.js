import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { MyContext } from '../../App';
import AddToCartButton from '../shared/AddToCartButton';


const Product = (props ) => {
    const [selectedPrice,setSelectedPrice]=useState()
    const [activeSize, setActiveSize] = useState(0);
const [selectedWeight,setSelectedWeight]=useState()
    const [productData, setProductData] = useState(props.item);
    const [isAdded, setIsadded] = useState(false);
    const [selectedWeightIndex, setSelectedWeightIndex] = useState(0); // assuming the first weight and size as default

    const context = useContext(MyContext);

    useEffect(() => {

   const weight = productData.productWeight ? productData?.productWeight[activeSize] : null;
    const price = productData.price ? productData?.price[activeSize] : null;
    setSelectedWeight(weight)
    setSelectedPrice(price)
        // console.log('props.item',props.item)
        setProductData(props.item);
console.log(productData)
    }, [props.item]);
    // console.log('prodcut',productData)

    const setProductCat = () => {
        if (productData) {
            sessionStorage.setItem('parentCat', productData.parentCatName);
            sessionStorage.setItem('subCatName', productData.subCatName);
        }
    };

    const addToCart = (item) => {
        context.addToCart(item);
        setIsadded(true);
    };

    const handleWeightChange = (event) => {
        setSelectedWeightIndex(event.target.value);
    };

    if (!productData) {
        return null; // or a loading indicator
    }

    const cartProduct = {
        id: productData.id?.toString(),
        title: productData.productName,
        subTitle: productData.brand,
        image: productData.catImg,
        price: productData.price?.[selectedWeightIndex],
        mrp: productData.oldPrice?.[selectedWeightIndex],
    };

    return (

        <>

        <div className='productThumb' onClick={setProductCat}>


            {
                props.tag &&
                <span className={`badge ${props.tag}`}>{props.tag}</span>
            }

            {
              
                <>
                    <Link to={`/product/${productData.id}`}>
                        <div className='imgWrapper'>
                            <div className='p-4 wrapper mb-3'>
                                <img src={`${productData.images[0]}?im=Resize=(420,420)`} className='w-100' alt="product" />
                            </div>

                            <div className='overlay transition'>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Add to Wishlist">
                                            <FavoriteBorderOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Compare">
                                            <CompareArrowsOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Quick View">
                                            <RemoveRedEyeOutlinedIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Link>

                    <div className='info'>
                        <span className='d-block catName'>{productData.brand}</span>
                        <h4 className='title'><Link to={`/product/${productData.id}`}>{productData.name}</Link></h4>
                        <Rating name="half-rating-read"
                                value={parseFloat(productData.rating) || 0} precision={0.5} readOnly />
                        <span className='brand d-block text-g'>By <Link className='text-g'>{productData.brand}</Link></span>

                        <div className='d-flex align-items-center mt-3'>
                            <div className='d-flex align-items-center w-100'>
                                <span className='price text-g font-weight-bold'>
                                    Rs {productData.price?.[selectedWeightIndex]}</span>
                                <span className='oldPrice ml-auto'>
                                    Rs {productData.oldPrice?.[selectedWeightIndex]}</span>
                            </div>
                        </div>
                        {/* {productData.size && (
                            <div className="weight-select mt-3">
                                <select onChange={handleWeightChange} value={selectedWeightIndex}>
                                    {productData.size.map((size, index) => (
                                        <option key={index} value={index}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        )} */}
                        <AddToCartButton product={productData}
                                productId={productData._id}
                                weight={selectedWeight}
                                price={selectedPrice}
                                // quantity={inputValue}
                                // isAlreadyAddedInCart={isAlreadyAddedInCart}
                            />
                    </div>
                </>
            }


            
        </div>


        </>

    );
};

export default Product;
 