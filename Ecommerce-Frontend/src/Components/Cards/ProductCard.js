import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

//option for rating
const options={
  edit:false,
  isHalf:true,
  color:"rgba(20,20,20,0.5)",
  activeColor:"tomato",
  size: window.innerWidth>600?30:25
}
const ProductCard = ({product}) => {
  return (
    <Link  to={`/product/${product._id}`} className="w-80 m-4  shadow-lg hover:shadow-2xl h-[24rem] font-baloo text-xl" >
       <img  src={product.images[0].url} alt={product.name} className='h-[60%] w-full p-2' />
       <div className='flex flex-col p-2  h-[40%]'>
       <p className='mt-2 '>{product.name}</p>
       <div className='flex'>
           <ReactStars {...options} value={product.ratings}></ReactStars>
           <span className='m-2 text-sm'>{product.reviews.length} reviews</span>
       </div>
       <span className=' text-red-400'>Rs.{product.price}</span>
       </div>
    </Link>
  )
}

export default ProductCard