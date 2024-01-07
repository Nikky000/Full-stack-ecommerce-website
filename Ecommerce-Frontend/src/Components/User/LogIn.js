import React, { useRef, useEffect } from 'react'
import { BsEnvelopeFill, BsShieldLockFill } from 'react-icons/bs'
import { loggedIn } from '../../Store/UserActions';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate,useLocation,Link } from 'react-router-dom';
import {userActions } from '../../Store/UserReducer';
import Loading from '../Layout/Loading';
const LogIn = () => {
 
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const alert = useAlert();
  const navigate = useNavigate();
  const location=useLocation();
  const url= new URLSearchParams(location.search).get('redirect')||'account';

  const {loading, error, isAuthenticated } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (error) { //if error come
      alert.error(error);
      dispatch(userActions.clearError());// for clearing the error
    };
    if (isAuthenticated) {
      navigate(`/${url}`);
    }
  }, [isAuthenticated, navigate, error, alert,dispatch,url]);

  //handling the logIn form 
  const submitHandler = (e) => {
    e.preventDefault();
    let data = { email: email.current.value, password: password.current.value};
    dispatch(loggedIn(data));
    email.current.value = "";
    password.current.value = "";
  }

  return (
    <div className='w-full h-screen absolute top-[64px] left-0 flex justify-center items-center bg-white z-50 font-sans'>
    {loading===true? <Loading></Loading>  :
      <div className=' w-96 h-96 m-2 border-2 rounded-xl p-4 shadow-xl'>
        <div className='text-4xl text-center font-bold mb-4'>Log In</div>

        <form action="" className='w-full flex flex-col items-center' onSubmit={submitHandler}>
          {/* E-mail */}
          <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <BsEnvelopeFill size={30} ></BsEnvelopeFill>
            <input type="email" required ref={email} placeholder='Enter Your E-mail' className=' ml-4 font-semibold w-full border-none outline-none' />
          </div>
          {/* Password */}
          <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <BsShieldLockFill size={30}></BsShieldLockFill>
            <input type="password" required ref={password} placeholder='Enter Your Password' className='ml-4 font-semibold w-full border-none outline-none' />
          </div>
          {/* submitButton */}
          <button type='submit' className=' bg-pink-300 m-4 text-2xl py-2 text-center shadow-md text-white font-bold w-[80%] rounded-2xl'>Sign In</button>
          <p>Not a memeber? <Link to="/Register" className='text-blue-400 border-b-2 border-blue-300'>Register</Link></p>
        </form>
          {/* forgotPassword */}
        <div className='mt-6 text-red-400 text-right'>Forgot Password?</div>
      </div>
    }
    </div>
 
  )
}

export default LogIn