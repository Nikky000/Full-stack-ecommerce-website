import React,{useState,useEffect} from 'react'
import { BsEnvelopeFill} from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import {HiPhotograph} from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { userActions } from '../../Store/UserReducer'
import { updateProfile } from '../../Store/UserActions'
import Loading from '../Layout/Loading'
import { useNavigate } from 'react-router-dom'


const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();

    //states
    const {user,error,loading,isUpdated} = useSelector((state) => state.user);
    const [userName,setUserName]=useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [file,setFile]=useState("");
    
  
    useEffect(() => {
      if (error) { //if error come
        alert.error(error);
        dispatch(userActions.clearError());// for clearing the error
        setFile(); 
      }
      if(isUpdated){
        alert.success("Updated Successfully");
        dispatch(userActions.changeUpdate());
        navigate('/account');
      }
    }, [ error, alert,dispatch,isUpdated,navigate]);

    //handle image file
    const fileHandler=(e)=>{
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setFile(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
  
    //submit form for updating profile
    const submitHandler = (e) => {
      e.preventDefault();
      const formData=new FormData();
      formData.set("name",userName);
      formData.set("email",email);
      formData.set("avatar",file);
      dispatch(updateProfile(formData));
    }

  return (
    <div className='w-full h-screen absolute top-[64px] left-0 flex justify-center items-center bg-white z-50 font-sans'>
    {loading?<Loading></Loading>: <div className=' w-96  m-2 border-2 rounded-xl p-4 shadow-xl'>
            <div className='text-4xl text-center font-bold mb-4'>Update Profile</div>

            <form className='w-full flex flex-col items-center' onSubmit={submitHandler}  encType="multipart/form-data">
                {/* userName */}
                <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                    <FaUser size={30} ></FaUser>
                    <input type="text" placeholder='UserName' value={userName} className=' ml-4 font-semibold w-full border-none outline-none' onChange={(e)=>{setUserName(e.target.value)}} />
                </div>
                {/* Email */}
                <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                    <BsEnvelopeFill size={30} ></BsEnvelopeFill>
                    <input type="email" placeholder='Enter Your E-mail' value={email} className=' ml-4 font-semibold w-full  outline-none'  onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                {/* Image */}
                <div className='flex m-2 w-full h-12  pl-1 pt-1'>
                    <HiPhotograph size={40}></HiPhotograph>
                    <input type='file' accept='image/*' onChange={fileHandler} className='ml-4 font-semibold w-full border-none outline-none' />
                </div>
                {/* submit form */}
                <button type='submit' className=' bg-pink-300 m-4 text-2xl py-2 text-center shadow-md text-white font-bold w-[80%] rounded-2xl'>Update</button>
            </form>

        </div>}
       
    </div>
  )
}

export default UpdateProfile