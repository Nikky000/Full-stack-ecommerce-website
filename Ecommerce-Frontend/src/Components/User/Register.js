import React,{useEffect,useRef,useState} from 'react'
import { BsEnvelopeFill, BsShieldLockFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import {HiPhotograph} from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import {useNavigate,Link} from 'react-router-dom'
import { userActions } from '../../Store/UserReducer'
import { register } from '../../Store/UserActions'
import Loading from '../Layout/Loading'


const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const {loading, error, isAuthenticated } = useSelector((state) => state.user);
    const [file,setFile]=useState();

    const userName=useRef();
    const email = useRef();
    const password = useRef();
    
    useEffect(() => {
      if (error) { //if error come
        alert.error(error);
        dispatch(userActions.clearError());// for clearing the error
        setFile(""); 
      };
      if (isAuthenticated) {
        navigate('/account');
      }
    }, [isAuthenticated, navigate, error, alert,dispatch]);

    //for handling the imageFile
    const fileHandler=(e)=>{
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setFile(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
  
    //for submitting the registration form
    const submitHandler = (e) => {
      e.preventDefault();
      const formData=new FormData();
      formData.set("name",userName.current.value);
      formData.set("email",email.current.value);
      formData.set("password",password.current.value);
      formData.set("avatar",file);
      dispatch(register(formData));
      userName.current.value="";
      email.current.value = "";
      password.current.value = "";
    }

    return (
        <div className='w-full h-screen absolute top-[64px] left-0 flex justify-center items-center bg-white z-50 font-sans'>
        {loading?<Loading></Loading>: <div className=' w-96  m-2 border-2 rounded-xl p-4 shadow-xl'>
                <div className='text-4xl text-center font-bold mb-4'>Register</div>

                <form className='w-full flex flex-col items-center' onSubmit={submitHandler}  encType="multipart/form-data">
                    {/* userName */}
                    <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                        <FaUser size={28} ></FaUser>
                        <input type="text" placeholder='UserName' required ref={userName} className=' ml-4 font-semibold w-full border-none outline-none' />
                    </div>
                    {/* Email */}
                    <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                        <BsEnvelopeFill size={28} ></BsEnvelopeFill>
                        <input type="email" placeholder='Enter Your E-mail' required ref={email} className=' ml-4 font-semibold w-full  outline-none' />
                    </div>
                    {/* Password */}
                    <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-xl'>
                        <BsShieldLockFill size={28}></BsShieldLockFill>
                        <input type="password" placeholder='Enter Your Password' required ref={password} className='ml-4 font-semibold w-full border-none outline-none' />
                    </div>
                    {/* fileHandler */}
                    <div className='flex m-2 w-full h-12  pl-1 pt-1'>
                        <HiPhotograph size={35}></HiPhotograph>
                        <input type='file' accept='image/*' required onChange={fileHandler} className='ml-4 font-semibold w-full border-none outline-none' />
                    </div>
                    {/* submitButton */}
                    <button type='submit' className=' bg-pink-300 m-4 text-2xl py-2 text-center shadow-md text-white font-bold w-[80%] rounded-2xl'>Register</button>
                    <p>Already a memeber? <Link to="/LogIn" className='text-blue-400 border-b-2 border-blue-300'>Log In</Link></p>
                </form>

            </div>}
           
        </div>
    )
}

export default Register