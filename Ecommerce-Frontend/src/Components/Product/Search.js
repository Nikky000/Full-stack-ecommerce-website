import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  //for getting searching keyword
  const getSearchKeyword = (e) => {
    setKeyword(e.target.value);
  }
  
  //for finding searching product
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  }

  return (
    <div className='w-full h-[56vh] flex justify-center items-center '>
      <form onSubmit={submitHandler} className="w-full md:w-[50%] mx-2">
        <input type="search" placeholder='Search Your Product' className=' text-xl font-bold w-[70%] shadow-lg h-[3.5rem] text-center border-2 outline-0 border-black rounded-tl-xl ' onChange={getSearchKeyword} />
        <button type='submit' className='w-[30%] h-[3.6rem] text-white bg-red-400 my-1 text-xl shadow-lg rounded-r-xl hover:bg-red-500 border-2 border-black border-l-0 font-bold' >Search</button>
      </form>
    </div>
  )
}

export default Search