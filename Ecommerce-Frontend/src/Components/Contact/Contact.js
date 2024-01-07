import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className="w-full h-screen">
    <div className='max-w-[1000px] mx-auto justify-center flex flex-col h-full text-black'>
           <div>
               <p className='border-b-4 inline border-pink-500 font-bold text-4xl'>Contact</p>
               <p className='py-4'> Submit the form below</p>
           </div>
           <form method='POST' action="https://getform.io/f/067be096-0c28-456d-aa7f-8ea3c005f65f" className="flex flex-col justify-center w-full">
               <input   className='p-2 bg-[#ccd6f6] md:mx-40 mx-10 text-black border-black border-2' type="text" name='name' placeholder='Name' />
               <input className='p-2 bg-[#ccd6f6] my-4 md:mx-40 mx-10 text-black border-black border-2' type="Email" name='email' placeholder='Email' />
               <textarea  className='p-2 bg-[#ccd6f6] md:mx-40 mx-10 text-black border-black border-2' name="message" cols="30" rows="10" placeholder='Message'></textarea>
               <button type='submit' className=' hover:bg-pink-400 p-2 text-center mx-auto border-black border-2 my-2'>Let's collaborate</button>
           </form>
    </div>
</div>
  )
}

export default Contact