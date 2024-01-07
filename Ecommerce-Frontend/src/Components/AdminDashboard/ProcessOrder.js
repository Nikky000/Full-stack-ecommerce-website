import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { particularOrderAction } from '../../Store/MyOrderReducer'
import { getOrder } from '../../Store/MyOrderAction'
import { updateOrder } from '../../Store/MyOrderAction'
import { ordersListAction } from '../../Store/MyOrderReducer'
import ConfirmItems from '../Shipping/ConfirmItems'
import Loading from '../Layout/Loading'
import SideBar from './SideBar'



const ProcessOrder = () => {

    const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    //state
    const [status, setStatus] = useState();
    const { order, error, loading } = useSelector((state) => state.particularOrder);
    const { updateError, updateSuccess } = useSelector((state) => state.ordersList);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(particularOrderAction.clearError());
        };
        if (updateSuccess) {
            alert.success("Status Update Successfully");
            dispatch(ordersListAction.clearSuccess());
        };
        if (updateError) {
            alert.error(updateError);
            dispatch(ordersListAction.clearError());
        };
        dispatch(getOrder(id));
    }, [error, dispatch, alert, id, updateSuccess, updateError]);



    useEffect(() => {
        if (Object.entries(order).length > 0) {
            setStatus(order.orderStatus);
        }
    }, [order]);

    //submit form
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrder({ id, value: { status: status } }));
    }


    return (
        <>
            {loading ? <Loading></Loading> : <div className='flex h-[44rem]'>
                <SideBar></SideBar>
                <div className=' m-8 flex  items-center flex-col md:flex-row w-[80%]'>
                    <div className=' md:w-[60%] w-full flex flex-col'>
                        <div className='flex flex-col justify-center  h-48 '>
                            <h2 className='text-3xl font-semibold'>Shipping Info</h2>
                            <div className='m-6 ml-16 flex flex-col' >
                                <span className='text-black text-lg font-semibold'>Name: <span className='font-light ml-2'>{order.user.name}</span></span>
                                <span className='text-black text-lg font-semibold'>Phone: <span className='font-light ml-2'>{order.shippingInfo.phone}</span></span>
                                <span className='text-black text-lg font-semibold'>Address: <span className='font-light ml-2'>{order.shippingInfo.address}</span></span>
                                <span className='text-black text-lg font-semibold'>Country: <span className='font-light ml-2'>{order.shippingInfo.country}</span></span>
                                <span className='text-black text-lg font-semibold'>State: <span className='font-light ml-2'>{order.shippingInfo.state}</span></span>
                                <span className='text-black text-lg font-semibold'>City: <span className='font-light ml-2'>{order.shippingInfo.city}</span></span>
                                <span className='text-black text-lg font-semibold'>Pincode: <span className='font-light ml-2'>{order.shippingInfo.pincode}</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center mt-6'>
                            <h2 className='text-3xl font-semibold m-4'> Ordered Items</h2>
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
                        <div className='flex justify-between w-72 mt-4'>
                            <span className='text-black text-xl font-semibold m-2'>Payment:</span>
                            <span className='font-sans text-lg text-green-400'>{order.paymentInfo.status}</span>
                        </div>
                        <div className='flex flex-col justify-between w-72 mt-4'>
                            <h2 className='text-xl border-b-[2px] text-black font-semibold p-2 m-2 text-center'>Update Status</h2>
                            <form className='flex flex-col w-full' onSubmit={submitHandler}>
                                <select value={status} onChange={(e) => { setStatus(e.target.value) }} className='w-full h-10 text-xl font-semibold m-2'>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                <button type='submit' className='h-10 rounded-lg w-[80%] bg-green-300 text-white m-auto hover:bg-green-400 '>Update Status</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            }
        </>

    )
}

export default ProcessOrder