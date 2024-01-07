import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../Store/ProductActions'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import Loading from '../Layout/Loading'
import ProductCard from '../Cards/ProductCard'
import Pagination from 'react-js-pagination'
import './ProductPage.css'
import  Typography from '@material-ui/core/Typography'
import {Slider} from '@material-ui/core'
import { productAction } from '../../Store/ProductReducer'
import Backdrop from '@material-ui/core/Backdrop'
import {FiFilter} from 'react-icons/fi'


//Product Categories
const categories = [
    "Laptop",
    "Clothes",
    "Phones",
    "Shoes",
    "All"
];

const ProductPage = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {keyword}=useParams();

    //States
    const [open,setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [price,setPrice]=useState([0,50000]);
    const [rating,setRating]=useState([0,5]);
    const [Category,setCategory]=useState("");

    const { products, loading, error, productPerPage, totalProduct,totalFilterProduct } = useSelector((state) => state.product);

    useEffect(() => {
        // when error occur
        if (error) {
         alert.error(error);
         dispatch(productAction.clearError());
        }
        dispatch(getProducts({keyword,currentPage,price,rating,Category}));
    }, [dispatch, error, alert, currentPage,keyword,price,rating,Category]);
    

    //for getting filter price
    const priceHandler=(event,newPrice)=>{
        setPrice(newPrice);
    }
    //for getting filter ratings
    const ratingHandler=(event,newRating)=>{
        setRating(newRating);
    }

    //for getting page
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    return (
        <div>
            <Backdrop open={open} onClick={()=>{setOpen(!open)}} className='z-10' ></Backdrop>
            <FiFilter onClick={()=>{setOpen(!open)}} size={35} className={open?'absolute top-30 left-5 text-green-300':'absolute top-30 left-5'}></FiFilter>
            <Typography className={open?'absolute top-[7rem] left-12 text-green-300':'absolute top-[7rem] left-12'} onClick={()=>{setOpen(!open)}}>Filters</Typography>
            <div className='border-b-2 text-2xl font-semibold border-black m-auto w-24 my-8'>Products</div>
             {/* filter */}
            <div className={open?'w-52 p-2 absolute top-40 left-1 z-10 bg-white':'hidden'}>
            <Typography>Price</Typography>
            <Slider 
             value={price}
             onChange={priceHandler}
             valueLabelDisplay="auto"
             area-labelledby="range-slider"
             min={0}
             max={25000}
             />
             <Typography>Category</Typography>
             <ul className='text-lg font-medium pl-4'>
               {categories.map((category)=>{
                return <li className='hover:text-red-400' key={category} onClick={()=>{if(category==="All"){setCategory("")}else{setCategory(category)}}}>{category}</li>;
               })}
             </ul>
             <Typography>Ratings</Typography>
             <Slider
             value={rating}
             onChange={ratingHandler}
             valueLabelDisplay="auto"
             area-labelledby="range-slider"
             min={0}
             max={5}
             />
            </div>

            {/* Products */}
            {loading === true ? <Loading></Loading> : <div className="w-full md:min-h-screen">
                <div className='mx-auto flex flex-wrap justify-center items-center max-w-[1200px]'>
                    {products && products.map((product) => {
                        return <ProductCard product={product} key={product._id}></ProductCard>;
                    })}
                </div>

                {/* Pagination */}
                {productPerPage < totalFilterProduct && <div className=' flex justify-center my-5 m-auto h-10'>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={productPerPage}
                        totalItemsCount={totalProduct}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>}
            </div>}
        </div>
    )
}

export default ProductPage