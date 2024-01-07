import React from 'react'

const ConfirmItems = ({ item }) => {
  return (
    <div className='flex justify-center'>
      <div className='w-full  flex h-20 m-2 border-b-[2px] border-x-[1px]'>
        <div className=' basis-[30%] py-1  flex p-2'>
          <img src={item.image} alt="" className=' w-20' />
        </div>
        <div className='basis-[25%] flex justify-center items-center'>
          <p className='text-semibold'>{item.name}</p>
        </div>
        <div className='basis-[25%] flex justify-center items-center'>
          <p className='text-semibold'>{item.quantity}</p>
        </div>
        <div className=' basis-[20%] flex justify-center items-center font-sans text-lg '>₹{item.quantity * item.price}</div>
      </div>
    </div>
  )
}

export default ConfirmItems