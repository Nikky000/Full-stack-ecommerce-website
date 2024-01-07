import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Country,State } from 'country-state-city'
import {FaHome, FaCity, FaPhoneAlt, FaMapPin, FaGlobeAmericas} from 'react-icons/fa'
import {BsBuilding} from 'react-icons/bs'
import { cartAction } from '../../Store/CartReducer'
import { useAlert } from 'react-alert'
import CheckOutSteps from './CheckOutSteps'
import {useNavigate} from 'react-router-dom'

const Shipping = () => {
  
  const dispatch =useDispatch();
  const alert =useAlert();
  const navigate=useNavigate();

  //state
  const {shippingInfo}=useSelector((state)=>state.cart);
  const [address,setAddress]=useState(shippingInfo.address);
  const [city,setCity]=useState(shippingInfo.city);
  const [state,setState]=useState(shippingInfo.state);
  const [country,setCountry]=useState(shippingInfo.country);
  const [pincode,setPincode]=useState(shippingInfo.pincode);
  const [phone,setPhone]=useState(shippingInfo.phone);

  //submit shipping Information
  const submitHandler=(e)=>{
        e.preventDefault();
        if(phone.length<10||phone.length>10){
          return alert.error("Phone no. should contain only 10 digit");
        }
        dispatch(cartAction.saveShippingInfo({address,city,state,country,pincode,phone}));
        setTimeout(()=>{
          navigate('/confirmOrder');
        },[1000]);    
  }


  return (
    <>
    <CheckOutSteps activeState={0}></CheckOutSteps>
    <div className='w-full my-6 flex justify-center items-center font-sans min-h-screen'>
      <div className=' w-[28rem] m-2 border-2 rounded-xl p-4 shadow-xl'>
        <div className='text-4xl  font-bold mb-4'>Shipping Info</div>

        <form  className='w-full flex flex-col items-center' onSubmit={submitHandler}>
        {/* Address */}
          <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <FaHome size={30} ></FaHome>
            <input type="text" required placeholder='Enter Address' value={address} className=' ml-4 font-semibold w-full border-none outline-none text-center'  onChange={(e)=>{setAddress(e.target.value)}} />
          </div>
          {/* City */}
          <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <FaCity size={30} ></FaCity>
            <input type="text" required placeholder='Enter City' value={city} className=' ml-4 font-semibold w-full border-none outline-none text-center'  onChange={(e)=>{setCity(e.target.value)}} />
          </div>
          {/* Phone No. */}
          <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <FaPhoneAlt size={30} ></FaPhoneAlt>
            <input type="number" required placeholder='Enter Phone No.' value={phone} className=' ml-4 font-semibold w-full border-none outline-none text-center'  onChange={(e)=>{setPhone(e.target.value)}} />
          </div>
          {/* PinCode */}
          <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <FaMapPin size={30} ></FaMapPin>
            <input type='number' required placeholder='Enter Pincode' value={pincode} className=' ml-4 font-semibold w-full border-none outline-none text-center'  onChange={(e)=>{setPincode(e.target.value)}} />
          </div>
          {/* Country */}
          <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <FaGlobeAmericas size={30} ></FaGlobeAmericas>
            <select required value={country} onChange={(e)=>{setCountry(e.target.value)}} className='text-center w-full outline-none border-none ml-4 font-semibold'>
            <option value="">Country</option>
                {
                    Country&&Country.getAllCountries().map((item)=>{return <option value={item.isoCode} key={item.isoCode}>{item.name}</option>})
                }
            </select>
          </div>
          {/* State */}
          {
            country &&  <div className='flex m-2 w-full h-12 border-b-2 border-solid border-gray-300 pl-1 pt-1 rounded-md'>
            <BsBuilding size={30} ></BsBuilding>
            <select required value={state} onChange={(e)=>{setState(e.target.value)}} className='text-center w-full outline-none border-none ml-4 font-semibold'>
            <option value="">State</option>
                {
                    State&&State.getStatesOfCountry(country).map((item)=>{return <option value={item.isoCode} key={item.isoCode}>{item.name}</option>})
                }
            </select>
          </div>
          }
          {/* Submit form */}
          <button type='submit' className=' bg-pink-300 m-4 text-2xl py-2 text-center shadow-md text-white font-bold w-[80%] rounded-2xl hover:bg-pink-500'>Continue</button>
        </form>
      </div>
    
    </div>
    </>
  )
}

export default Shipping