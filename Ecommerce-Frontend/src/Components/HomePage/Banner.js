import React from 'react'
import HeadPhone from '../Assets/headphone.jpg'
import Perfume from '../Assets/perfume.jpg'
import {HiArrowNarrowRight} from 'react-icons/hi'

// it's the code of header of Home Page
const Banner = () => {
  return (
    <div className='w-[85%] m-auto mt-4 bg-pink-100 lg:h-80 rounded-3xl flex items-center h-72 font-baloo '>
     <div className='h-full flex-[100%] md:flex-[45%] flex-col flex justify-center items-center pl-3 text-left  lg:p-12'>
       <div className=' text-4xl text-black'>Get the best product at your home</div>
       <div>
       <button className=' font-semibold text-xl group hover:bg-pink-400 border-pink-300 rounded-2xl border-2 px-6 py-3 my-2 flex item-center justify-center'>
                    Shop Now
                    <span className='group-hover:rotate-90 duration-300 mt-1'>
                    <HiArrowNarrowRight className='ml-3' />
                    </span>
                </button>
       </div>
     </div>
     <div className=' hidden lg:flex-[35%]   lg:flex items-center justify-center h-full'>
        <img src={HeadPhone} alt="headphone.jpg" className='rounded-lg w-80 h-72' />
     </div>

     <div  className='hidden lg:flex-[20%] lg:flex justify-end items-end h-full'>
     <img src={Perfume} alt="perfume.jpg" className='w-40 h-40' />

     </div>
              
   </div>
  )
}

export default Banner