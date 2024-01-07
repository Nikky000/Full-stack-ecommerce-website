import React from 'react'

const CartItem = ({item,changeQuantity,removeItem}) => {

    //for increasing the quantity of item from
    const increasingQuantity=()=>{
          if(item.quantity>=item.stock) return;
          changeQuantity(item.quantity+1,item.product_id);
    };
    //for decreasing the quantity of item from
    const decreasingQuantity=()=>{
         if(item.quantity===1) return;
        changeQuantity(item.quantity-1,item.product_id);
    };
    //for removing the item from the cart
    const remove=()=>{
            removeItem(item.product_id);
    }

    return (
        <div className='flex justify-center'>
            <div className='w-full  md:w-[80%]  flex h-28 m-2 border-b-[2px] border-x-[1px]'>
                <div className=' basis-[50%]  flex p-2'>
                    <img src={item.image} alt='item' className='md:w-24 w-20 ' />
                    <div className='flex-col ml-1'>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <button className=' text-red-400 hover:text-red-600' onClick={remove}>Remove</button>
                    </div>
                </div>
                <div className='basis-[25%] flex justify-center items-center p-2'>
                    <button className='h-8  w-5 bg-gray-400 ' onClick={increasingQuantity}>+</button>
                    <input type="number" readOnly value={item.quantity} className='w-12 h-8 text-center pl-2' />
                    <button className='h-8 w-5 bg-gray-400' onClick={decreasingQuantity}>-</button>
                </div>
                <div className=' basis-[25%] flex justify-center items-center font-sans text-lg p-2 '>₹{item.quantity * item.price}</div>
            </div>
        </div>
    )
}

export default CartItem