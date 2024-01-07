import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { Link}from 'react-router-dom'
import Loading from '../Layout/Loading'

const Profile = () => {
   //states
    const {loading,user}=useSelector((state)=>state.user);
   
  return (
    <>
       {loading?<Loading></Loading>:<div className='m-4 flex flex-wrap min-h-[40rem]'> <div className='flex flex-col md:w-[50%] w-full font-sans'>
         <div className='text-3xl ml-16 mt-16 text-gray-400 font-semibold'>My Profile</div>
        <div className='flex justify-center mt-20'>
            <img src={user.avatar.url} alt="profile" className=' w-64 h-64 rounded-full' />
        </div>
         <Link to='/update/profile' className=' w-64 h-10 py-1  text-center bg-red-400 border-2 border-red-500 mx-auto my-10 text-lg text-white font-semibold'>Edit Profile</Link>
        </div>
        <div className='flex flex-col justify-center md:w-[50%] w-full items-center md:items-start'>
           <div className='my-8 text-center md:text-left'>
            <h3 className='text-2xl font-semibold'>Full Name:</h3>
            <p className='text-lg font-sans'>{user.name}</p>
            </div>
            <div className='my-8 text-center md:text-left'>
            <h3 className='text-2xl font-semibold'>Email:</h3>
            <p className='text-lg font-sans'>{user.email}</p>
            </div>
            <div className='my-8 text-center md:text-left'>
            <h3 className='text-2xl font-semibold'>Joined On:</h3>
            <p className='text-lg font-sans'>{user.createdAt}</p>
            </div>
            <Link to='/myOrders' className=' w-80 h-10  bg-black text-center  text-lg font-semibold text-white m-3 p-1'>My Orders</Link>
            <Link to='/update/password' className=' w-80 h-10 bg-black  text-center text-lg font-semibold text-white m-3 p-1'>Change Password</Link>
        </div>
        </div>
        } 
        </>
  )
}

export default Profile