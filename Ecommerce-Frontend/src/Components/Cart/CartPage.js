import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../Store/CartAction'
import { cartAction } from '../../Store/CartReducer'
import emptyCart from '../Assets/empty_cart.jpg'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, isAdded } = useSelector((state) => state.cart);
    
    useEffect(() => {
        dispatch(cartAction.clearAdded());
    }, [isAdded, dispatch]);

    // item quantiy change 
    const changeQuantity = (quantity, id) => {
        dispatch(addToCart({ id, quantity }));
    };

    // when removing item from cart
    const removeItem = (id) => {
        dispatch(cartAction.clearItem(id));
    }


    return (<>
        {cartItems.length > 0 ? <div className=' min-h-[28rem] mt-16'>
            <div className='w-full flex justify-center'>
                <div className='w-full  md:w-[80%]  flex h-8 mx-2 my-4'>
                    <div className=' basis-[50%] text-center py-1 bg-red-400  text-white '>Products</div>
                    <div className='basis-[25%] text-center  py-1 bg-red-400  text-white '>Quantity</div>
                    <div className=' basis-[25%] text-center  py-1 bg-red-400  text-white '>Total Price</div>
                </div>
            </div>
            {cartItems.map((item, i) => {
                return <CartItem item={item} key={i} changeQuantity={changeQuantity} removeItem={removeItem}></CartItem>
            })}
            <div className='flex justify-center my-4 font-sans'>
                <div className='w-full flex md:w-[80%]'>
                    <div className=' basis-[50%] '>
                    </div>
                    <div className='basis-[25%] flex justify-center items-center'>
                        Total Price
                    </div>
                    <div className=' basis-[25%] flex justify-center items-center font-sans text-lg'>₹{cartItems.reduce((accu, item) => { return accu + (item.quantity * item.price) }, 0)}</div>
                </div>
            </div>
            <div className='flex justify-center my-4 font-sans'>
                <div className='w-full flex md:w-[80%]'>
                    <div className=' basis-[35%] '>
                    </div>
                    <div className='basis-[35%]'>
                    </div>
                    <div className=' basis-[30%] h-12'><button className='w-full rounded-2xl bg-red-400 text-white font-semibold text-xl h-full shadow-md hover:bg-red-600' onClick={()=>{navigate('/LogIn/?redirect=shipping')}}>Check Out</button></div>
                </div>
            </div></div>
            : <div className='w-full h-screen md:h-[28rem] flex flex-col justify-center items-center font-sans'>
                <img src={emptyCart} alt="empty-cart" className=' h-52' />
                <p className='text-2xl font-semibold'>No Item in Cart</p>
                <button className=' bg-red-400 w-52 h-10 text-white font-semibold my-3 hover:bg-red-600 ' onClick={() => { navigate('/products') }}>Add Items</button>
            </div>}
    </>
    )
}

export default CartPage