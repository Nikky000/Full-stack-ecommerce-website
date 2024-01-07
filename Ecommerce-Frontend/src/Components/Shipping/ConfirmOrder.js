import React from 'react'
import { useSelector } from 'react-redux'
import ConfirmItems from './ConfirmItems'
import CheckOutSteps from './CheckOutSteps'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
    const navigate = useNavigate();
    //State
    const { user } = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    //Calculation Price
    const subTotal = cartItems.reduce((accu, item) => { return accu + (item.quantity * item.price) }, 0);
    const shippingPrice = subTotal > 1000 ? 0 : 100;
    const Tax = subTotal * 0.18;
    const Total = subTotal + shippingPrice + Tax;

    //submit shipping Info
    const submitHandler = () => {
        const data = {
            subTotal,
            shippingPrice,
            Tax,
            Total
        };
        sessionStorage.setItem('OrderInfo', JSON.stringify(data));
        navigate('/payment/process');
    }

    return (
        <div>
            <CheckOutSteps activeState={1}></CheckOutSteps>
            <div className=' m-8 flex  items-center flex-col md:flex-row'>
                <div className=' md:w-[60%] w-full flex flex-col md:border-r-[1px] md:border-gray-300'>
                    <div className='flex flex-col justify-center border-gray-300 h-64 '>
                        <h2 className='text-3xl font-semibold'>Shipping Info</h2>
                        <div className='m-6 ml-16 flex flex-col' >
                            <span className='text-black text-lg font-semibold'>Name: <span className='font-light ml-2'>{user.name}</span></span>
                            <span className='text-black text-lg font-semibold'>Phone: <span className='font-light ml-2'>{shippingInfo.phone}</span></span>
                            <span className='text-black text-lg font-semibold'>Address: <span className='font-light ml-2'>{shippingInfo.address}</span></span>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center md:border-b-[1px] md:border-gray-300'>
                        <h2 className='text-3xl font-semibold m-4'>Your Cart Item</h2>
                        {cartItems.map((item, i) => {
                            return <ConfirmItems item={item} key={i}></ConfirmItems>
                        })}
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center md:w-[40%] w-full'>
                    <h2 className='text-3xl border-b-[2px] text-black font-semibold p-2 m-2'>Order Summary</h2>
                    <div className='flex justify-between w-72 m-2'>
                        <span className='text-black text-xl  m-2'>SubTotal:</span>
                        <span className=' font-sans text-lg'>{subTotal}</span>
                    </div>
                    <div className='flex justify-between w-72 m-2'>
                        <span className='text-black text-xl  m-2'>ShippingCharge:</span>
                        <span className='font-sans text-lg'>{shippingPrice}</span>
                    </div>
                    <div className='flex justify-between w-72 m-2 border-b-[2px]'>
                        <span className='text-black text-xl  m-2'>Tax:</span>
                        <span className='font-sans text-lg'>{Tax}</span>
                    </div>
                    <div className='flex justify-between w-72 m-2'>
                        <span className='text-black text-xl font-semibold m-2'>Total:</span>
                        <span className='font-sans text-lg'>{Total}</span>
                    </div>
                    <button className='p-2 bg-pink-300 hover:bg-pink-400 w-72 m-2 h-12 text-white text-xl font-semibold' onClick={submitHandler}>Process to Payment</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder