import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetail } from '../../../Store/ProductActions';
import ProductDetails from './ProductDetails';
import ProductImage from './ProductImage';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Loading from '../../Layout/Loading';
import ProductReviews from './ProductReviews';
import { productDetailAction } from '../../../Store/ProductReducer';
import { reviewAction } from '../../../Store/ProductReducer';



const ParticularProduct = () => {

  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();

  //states
  const { product, loading, error } = useSelector((state) => state.productDetail);
  const { reviewAdded, reviewError } = useSelector((state) => state.review);


  useEffect(() => {
    //for error
    if (error) {
      alert.error(error);
      dispatch(productDetailAction.clearError());
    };

    if (reviewError) {
      alert.error(reviewError);
      dispatch(reviewAction.clearError());
    };

    if (reviewAdded) {
      dispatch(reviewAction.clearReview());
      alert.success("Review Added Successfully");
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error, alert, reviewError, reviewAdded]);



  return (
    <section className='w-full font-baloo'>
      {loading === true ? <Loading></Loading> : <div className='flex flex-row justify-center items-center flex-wrap'>
       {product.name && <ProductImage product={product} ></ProductImage>}
        {product.name &&<ProductDetails product={product}></ProductDetails>}
      </div>}
      <div className='m-auto mt-10 w-32 border-b-2 border-black text-3xl font-bold'>Reviews</div>
      {loading === true ? <div></div> :
        <div className='flex  overflow-x-scroll scrollbar-hide my-4'>
          {product.reviews && product.reviews[0] ?
            product.reviews.map((review, i) => {
              return <ProductReviews review={review} key={i} ></ProductReviews>
            }) : <div className='m-auto w-56 text-xl text-gray-400 text-center'>Not Review Yet</div>

          }
        </div>}
  
    </section>
  )
}

export default ParticularProduct