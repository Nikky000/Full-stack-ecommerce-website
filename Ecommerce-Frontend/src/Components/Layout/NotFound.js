import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className='w-full h-[28rem] flex flex-col justify-center items-center'>
     <FaExclamationCircle size={50}></FaExclamationCircle>
     <div className='text-4xl text-red-500 mt-4 font-semibold '>Page Not Found</div>
        
    </div>
  )
}

export default NotFound