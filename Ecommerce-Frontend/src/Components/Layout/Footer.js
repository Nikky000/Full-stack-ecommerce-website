import React from 'react'
import play from '../Assets/play.jpg'

const Footer = () => {
  return (
    <div className='w-full min-h-[17rem] flex flex-wrap font-baloo justify-center items-center bg-black text-white text-xl box-border shadow-sm'>
        <div className='w-full md:w-[30%] flex flex-col items-center my-6 p-1'>
            <div className='text-2xl'>Download Our App</div>
            <div>for Android and IOS</div>
            <img src={play} alt="google.play" className='w-36 mt-2' />
            
        </div>
        <div className='w-full md:w-[40%] flex flex-col items-center my-6 p-2 '>
            <div className="text-[3rem] text-red-500 font-bold my-2">Ecommerce</div>
            <div>High Quality is our first priority</div>
            <div>Copyright &copy; 2022 Aryan Gupta</div>
        </div>
        <div className='w-full md:w-[30%] flex flex-col items-center my-6 p-2 '>
            <div className='font-bold  underline'>Follow Us</div>
            <a href="https://www.instagram.com/aryangupta2065/?hl=en" className='hover:text-red-400' target='_blank' rel='noreferrer'>Instagram</a>
            <a href="https://github.com/Aryanhac" className='hover:text-red-400' target='_blank' rel='noreferrer'>GitHub</a>
            <a href="https://www.facebook.com/profile.php?id=100064757701570" className='hover:text-red-400' target='_blank' rel='noreferrer'>Facebook</a>
        </div>
    </div>
  )
}

export default Footer