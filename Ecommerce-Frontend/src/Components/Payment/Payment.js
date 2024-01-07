import React, {useEffect, useRef } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Event, VpnKey } from '@material-ui/icons'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { orderAction } from '../../Store/MyOrderReducer'
import { createNewOrder } from '../../Store/MyOrderAction'
import { useAlert } from 'react-alert'
import CheckOutSteps from '../Shipping/CheckOutSteps'
import { useNavigate } from 'react-router-dom'


const Payment = () => {

  const pay = JSON.parse(sessionStorage.getItem('OrderInfo'));
  const paybtn = useRef();
  const stripe = useStripe();
  const element = useElements();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state
  const { shippingInfo,cartItems} = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error} = useSelector((state) => state.order);


  //total amount
  const payment = { amount: Math.round(pay.Total) * 100 };// multiply by thousand because stripe receive money in paise


  const order={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:pay.subTotal,
    taxPrice:pay.Tax,
    shippingPrice:pay.shippingPrice,
    totalPrice:pay.Total
  };

  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(orderAction.clearError());
    };
  },[error,dispatch,alert])



  //after submitting payment process start
  const submitHandler = async (e) => {
    e.preventDefault();
    paybtn.current.disabled = true;

    try {
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
      const { data } = await axios.post(`https://ecommerce-plaza-aryanhac.onrender.com/api/payment/process`, payment, config);
      const client_Secret = data.client_secret;
      if (!stripe || !element) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_Secret, {
        payment_method: {
          card: element.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country
            },
          },
        },
      });

      if (result.error) {
        paybtn.current.disabled = false;
        alert.error(result.error.message);
      } else
        if (result.paymentIntent.status === "succeeded") {
          navigate('/success');
          order.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
          };
          dispatch(createNewOrder(order));
        } else {
          alert.error("There's some issue while processing payment");
        }
    } catch (error) {
      paybtn.current.disabled = false;
      console.log(error.response.data.message);
      alert.error(error.response.data.message);
    }
  };



  return (
    <div>
      <CheckOutSteps activeState={2}></CheckOutSteps>
      <div className='flex flex-col m-auto my-10 w-[95%] md:w-[24rem] h-96 border-2 p-3 border-black rounded-xl shadow-lg '>
        <div className='text-3xl font-semibold'>Card Info</div>
        <form onSubmit={submitHandler} className="w-full flex flex-col justify-around h-72">
         {/* Card Number */}
          <div className='flex w-[90%] h-10 items-center border-b-2 mx-1 border-black'>
            <CreditCard />
            <CardNumberElement className='w-full pl-3' />
          </div>
          {/* Card Expiry */}
          <div className='flex h-10 w-[90%] items-center border-b-2 mx-1 border-black'>
            <Event />
            <CardExpiryElement className='w-full pl-3' />
          </div>
          {/* Card CVC */}
          <div className='flex h-10 w-[90%] items-center border-b-2 mx-1 border-black'>
            <VpnKey />
            <CardCvcElement className='w-full pl-3' />
          </div>
          <button type='submit' ref={paybtn} className=' bg-pink-400 hover:bg-pink-500 h-12 w-[90%] mx-1 rounded-lg text-white font semibold text-xl font-sans'>Pay - ₹{pay && pay.Total}</button>
        </form>

      </div>
    </div>
  )
}

export default Payment