import React, { useState, useEffect } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../../Store/CartAction'
import { cartAction } from '../../../Store/CartReducer'
import { useAlert } from 'react-alert'
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { addReview } from '../../../Store/ProductActions'


//options for Rating stars
const options = {
  edit: false,
  isHalf: true,
  color: "rgba(20,20,20,0.5)",
  activeColor: "tomato",
  size: window.innerWidth > 600 ? 25 : 20
}

const ProductDetails = ({ product }) => {

  const dispatch = useDispatch();
  const { cartItems, error, isAdded } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const alert = useAlert();

  const [comment, setComment] = useState();
  const [reviewRating, setReviewRating] = useState(0);
  const [openReview, setOpenReview] = useState(false);

  useEffect(() => {
    // for errors
    if (error) {
      alert.error("Item has not Added to Cart. Try Again");
      cartAction.clearError();
    };
    if (isAdded) {
      dispatch(cartAction.clearAdded());
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert.success("Added Successfully");
    };
  }, [error, alert, cartItems, isAdded, dispatch])



  //for increasing the quantity
  const increaseQuantity = () => {
    if (quantity >= product.stock) return;
    let qty = quantity + 1;
    setQuantity(qty);
  };

  // for decreasing the quantity
  const decreaseQuantity = () => {
    if (quantity === 1) return;
    let qty = quantity - 1;
    setQuantity(qty);
  };

  //for adding to Cart
  const addingToCart = () => {
    if (product.stock < 1) {
      return;
    }
    dispatch(addToCart({ id: product._id, quantity: quantity }));
  };

  //opening and closing the submit review block
  const submitReviewToggle = () => {
    openReview ? setOpenReview(false) : setOpenReview(true);
  }

  //for submitting the review
  const submitReviewHandler = () => {
    dispatch(addReview({ comment, rating: reviewRating, productId: product._id }));
  }

  return (
    <div className='w-full md:w-[500px]  h-[500px] flex flex-col p-6 m-2 mt-20 font-baloo'>
    
     {/* productDetails */}
      <h2 className='text-2xl font-bold '>{product.name}</h2>
      <span className='text-[.7rem] font-semibold'>Product # {product._id}</span>
      <div className=' border-b-[.5px] border-solid border-black mt-2 mx-2'></div>
      <div className='flex flex-row my-4 mx-2'>
        <ReactStars {...options} value={product.ratings}></ReactStars>
        <span className='m-2 text-sm'>({product.reviews.length} reviews)</span>
      </div>
      <div className=' border-b-[.5px] border-solid border-black mt-1 mx-2'></div>
      <div className='mt-4  ml-2 flex flex-col'>
        <span className='text-2xl'>Rs.{product.price}</span>
        <div className='flex'>
          <div className='flex mt-3'>
            <button className='h-8 w-5 bg-gray-400' onClick={increaseQuantity}>+</button>
            <input type="number" readOnly value={quantity} className='w-12 h-8 text-center pl-2' />
            <button className='h-8 w-5 bg-gray-400' onClick={decreaseQuantity}>-</button>
          </div>
          <button className=' rounded-3xl bg-red-400 p-3 mt-1 ml-4 hover:bg-red-500 text-white' onClick={addingToCart}>Add To Cart</button>
        </div>
      </div>
      <div className=' border-b-[.5px] border-solid border-black mt-2 mx-2'></div>
      <div className='m-4 text-lg'>
        <span>Status: </span>
        <span className={product.stock > 0 ? 'text-green-400' : 'text-red-500'}>{product.stock > 0 ? "InStock" : "Out of Stock"}</span>
      </div>
      <div className=' border-b-[.5px] border-solid border-black mt-1 mx-2'></div>
      <div className='m-4'>
        <div className='text-2xl font-bold'>Description:</div>
        <div className='text-lg overflow-hidden h-20'>{product.description}</div>
      </div>

      {/* REVIEW */}
      <button className='rounded-3xl  bg-blue-300 hover:bg-blue-400 font-bold text-2xl p-3 text-white m-1' onClick={submitReviewToggle}>Submit Review</button>
      <Dialog
        area-aria-labelledby='simple-dialog-box'
        open={openReview}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <ReactStars
            edit={true}
            onChange={(e) => { setReviewRating(e) }}
            value={reviewRating}
            size={30}
          >
          </ReactStars>
          <textarea
            cols="30"
            rows="10"
            value={comment}
            onChange={(e) => { setComment(e.target.value) }}
          >
          </textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle}>Cancel</Button>
          <Button onClick={submitReviewHandler}>Submit</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default ProductDetails