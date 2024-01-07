import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


const ProductImage = ({product}) => {
  return (
    <div className='w-[350px] m-2 md:w-[500px] h-[500px] mt-20 pt-7'>
    <div className=" shadow-xl ">
    <AliceCarousel className="p-2" >
    {  product.images&& product.images.map((img,index)=>{
       return  <img src={img.url} key={index} alt={product.images[0].public_id} className=" w-full h-[350px] object-cover " />
    })} 
    </AliceCarousel>
</div>
</div>
  )
}

export default ProductImage