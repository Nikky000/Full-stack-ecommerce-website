import React from 'react'
// it's for showing loading scroll
const Loading = () => {
  return (
    <div className='w-full h-40 flex justify-center items-center'>
        <div className='w-[5%] h-[55%] border-b-4 border-black rounded-b-full animate-spin'></div>
    </div>
  )
}

export default Loading