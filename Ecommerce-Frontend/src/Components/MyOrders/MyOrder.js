import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getAllOrders } from '../../Store/MyOrderAction'
import { allOrderAction } from '../../Store/MyOrderReducer'
import ConfirmItems from '../Shipping/ConfirmItems'
import Loading from '../Layout/Loading'



const MyOrder = () => {
   
    const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    var order;

    //state
    const { orders, error, loading } = useSelector((state) => state.myOrders);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(allOrderAction.clearError());
        };
        dispatch(getAllOrders("hello"));
    }, [error, dispatch, alert]);
     
    orders&& orders.forEach((ele)=>{
             if(ele._id===id){
                order=ele;
             }
    })
  
    
    return (
        <>
            {loading ? <Loading></Loading> : <div>
                <div className=' m-8 flex  items-center flex-col md:flex-row '>
                    <div className=' md:w-[60%] w-full flex flex-col'>
                        <div className='flex flex-col justify-center  h-64 '>
                            <h2 className='text-3xl font-semibold'>Shipping Info</h2>
                            <div className='m-6 ml-16 flex flex-col' >
                                <span className='text-black text-lg font-semibold'>Name: <span className='font-light ml-2'>{order.user.name}</span></span>
                                <span className='text-black text-lg font-semibold'>Phone: <span className='font-light ml-2'>{order.shippingInfo.phone}</span></span>
                                <span className='text-black text-lg font-semibold'>Address: <span className='font-light ml-2'>{order.shippingInfo.address}</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <h2 className='text-3xl font-semibold m-4'>Your Ordered Items</h2>
                            {order.orderItems.map((item, i) => {
                                return <ConfirmItems item={item} key={i}></ConfirmItems>
                            })}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center md:w-[40%] w-full'>

                        <h2 className='text-3xl border-b-[2px] text-black font-semibold p-2 m-2'>Order Summary</h2>
                        <div className='flex justify-between w-72 m-2'>
                            <span className='text-black text-xl  m-2'>SubTotal:</span>
                            <span className=' font-sans text-lg'>{order.itemsPrice}</span>
                        </div>
                        <div className='flex justify-between w-72 m-2'>
                            <span className='text-black text-xl  m-2'>ShippingCharge:</span>
                            <span className='font-sans text-lg'>{order.shippingPrice}</span>
                        </div>
                        <div className='flex justify-between w-72 m-2 border-b-[2px]'>
                            <span className='text-black text-xl  m-2'>Tax:</span>
                            <span className='font-sans text-lg'>{order.taxPrice}</span>
                        </div>
                        <div className='flex justify-between w-72 m-2'>
                            <span className='text-black text-xl font-semibold m-2'>Total:</span>
                            <span className='font-sans text-lg'>{order.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>

            }
        </>

    )
}

export default MyOrder