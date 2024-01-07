import React from 'react'
import { CheckCircle } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

const Success = () => {

    const navigate=useNavigate();
    
  return (
    <div className='w-full h-screen md:h-[28rem] flex flex-col justify-center items-center'>
                <CheckCircle className=' scale-[4] text-pink-400 '></CheckCircle>
                <p className='text-3xl font-semibold mb-2 mt-8'>Ordered Successfully</p>
                <button className=' bg-pink-300 w-52 h-10 rounded-md text-white font-semibold my-3 hover:bg-pink-400 ' onClick={() => { navigate('/myOrders')}}>MyOrders</button>
            </div>
  )
}

export default Success 