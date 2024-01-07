import React,{useEffect} from 'react'
import Banner from './Banner'
import ProductCard from '../Cards/ProductCard'
import { getProducts} from '../../Store/ProductActions'
import { useSelector,useDispatch } from 'react-redux'
import Loading from '../Layout/Loading'
import { useAlert } from 'react-alert'


const HomePage = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {products,loading,error} = useSelector((state)=>state.product); // from store
 

  useEffect(()=>{
    // when error occur
     if(error){
       return alert.error(error);
     }
     dispatch(getProducts({keyword:"",page:1,rating:[0,5],price:[0,50000],Category:""}));
  },[dispatch,error,alert]);

  return (
    <div className='z-10' >
        <Banner></Banner> 
       <div className=' text-center flex justify-center m-4 mt-6'>
           <span className='border-b-2 text-2xl font-semibold  text-gray-400'>Featured Products</span>
       </div> 
       
       {loading===true? <Loading></Loading>:<div className="w-full md:min-h-screen">
            <div className='mx-auto flex flex-wrap justify-center items-center max-w-[1200px]'>
               {products&&products.map((product)=>{
                 return  <ProductCard product={product} key={product._id}></ProductCard>;
               })}
              
            </div>
        </div>}
    </div>
  )
}
export default HomePage