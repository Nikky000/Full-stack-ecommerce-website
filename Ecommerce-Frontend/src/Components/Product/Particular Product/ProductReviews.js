import React from 'react'
import ReactStars from 'react-rating-stars-component'
import Profile from '../../Assets/Profile.png'

//options for Ratings
const options={
  edit:false,
  isHalf:true,
  color:"rgba(20,20,20,0.5)",
  activeColor:"tomato",
  size: window.innerWidth>600?25:20
}

const ProductReviews = ({review}) => {
  return (
        <div className='flex flex-col justify-center items-center m-4 w-72 h-56 border-2 border-gray-300 font-baloo'>
            <img src={Profile} className="w-24" alt="" />
            <p>{review.name}</p>
            <ReactStars {...options} value={review.rating}></ReactStars>
            <p className='p-2 text-center overflow-hidden '>{review.comment}</p>
        </div>
    
  )
}

export default ProductReviews