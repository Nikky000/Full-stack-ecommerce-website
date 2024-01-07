import React, { useState, useEffect } from 'react'
import { FaKey, FaLock, FaUnlock } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { userActions } from '../../Store/UserReducer'
import { updatePassword } from '../../Store/UserActions'
import Loading from '../Layout/Loading'
import { useNavigate } from 'react-router-dom'


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    //states
    const { error, loading, isUpdated } = useSelector((state) => state.user);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    useEffect(() => {
        if (error) { //if error come
            alert.error(error);
            dispatch(userActions.clearError());// for clearing the error
        }
        if (isUpdated) {
            alert.success("Updated Successfully");
            dispatch(userActions.changeUpdate());
            navigate('/account');
        }
    }, [error, alert, dispatch, isUpdated, navigate]);

    //submit update password form
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    }

    return (
        <div className='w-full h-screen absolute top-[64px] left-0 flex justify-center items-center bg-white z-50 font-sans'>
            {loading ? <Loading></Loading> : <div className=' w-96  m-2 border-2 rounded-xl p-4 shadow-xl'>
                <div className='text-4xl text-center font-bold mb-4'>Update Password</div>

                <form className='w-full flex flex-col items-center' onSubmit={submitHandler} encType="multipart/form-data">
                   {/* Old Password */}
                    <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                        <FaKey size={25}></FaKey>
                        <input type="password" placeholder='Enter Old Password' className='ml-4 font-semibold w-full border-none outline-none' onChange={(e)=>{setOldPassword(e.target.value)}} />
                    </div>
                    {/* New Password */}
                    <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                        <FaUnlock size={25}></FaUnlock>
                        <input type="password" placeholder='Enter New Password' className='ml-4 font-semibold w-full border-none outline-none' onChange={(e)=>{setNewPassword(e.target.value)}} />
                    </div>
                    {/* Confirm Password */}
                    <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                        <FaLock size={25}></FaLock>
                        <input type="password" placeholder='Enter Confirm Password' className='ml-4 font-semibold w-full border-none outline-none' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                    </div>
                    {/* submit Update Password */}
                    <button type='submit' className=' bg-pink-300 m-4 text-2xl py-2 text-center shadow-md text-white font-bold w-[80%] rounded-2xl'>Update</button>
                </form>

            </div>}

        </div>
    )
}

export default UpdatePassword