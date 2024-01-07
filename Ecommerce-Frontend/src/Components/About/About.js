import React from 'react'
import Me from '../Assets/Me.jpeg'

const About = () => {
  return (
    <div className='m-4 flex flex-wrap min-h-[40rem]'> 
    <div className='flex flex-col md:w-[50%] w-full font-sans'>
    <div className='text-3xl ml-16 mt-16 text-gray-400 font-semibold'>ABOUT ME</div>
   <div className='flex justify-center mt-20'>
       <img src={Me} alt="profile" className=' w-72 h-72 rounded-full' />
   </div>
   </div>
   <div className='flex flex-col justify-center md:w-[50%] w-full items-center md:items-start'>
      <div className='my-8 text-center md:text-left'>
       <h3 className='text-2xl font-semibold'>Full Name:</h3>
       <p className='text-lg font-sans'>Aryan Gupta</p>
       </div>
       <div className='my-8 text-center md:text-left'>
       <h3 className='text-2xl font-semibold'>Email:</h3>
       <p className='text-lg font-sans'>ag98974461@gmail.com</p>
       </div>
       <div className='my-8 text-center md:text-left'>
       <h3 className='text-2xl font-semibold'>About:</h3>
       <p className='text-lg font-sans'>Hello Everyone, I am Aryan Gupta. Thank you for visiting on this website. I am a full Stack Web Developer and this is one of my best project if you want code of this website you can visit on my github profile link available in the footer </p>
       </div>
   </div>
   </div>
  )
}

export default About