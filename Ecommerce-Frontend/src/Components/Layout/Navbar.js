import { useState } from 'react';
import Logo from '../Assets/Logo.png'
import { FaBars, FaTimes } from 'react-icons/fa'
import { FiShoppingBag, FiSearch, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports'
import UserOptions from './UserOptions'
import './Navbar.css'


const Navbar = () => {
  const [nav, setNav] = useState(true);

  const {isAuthenticated,user} = useSelector((state)=>state.user);

  const clickNav = () => {
    setNav(!nav);
  }
  return (
    <div className="w-full flex justify-between bg-white h-[65px] items-center px-4 pt-4 text-gray-500 shadow-lg z-20">
      {/* Humburger */}
      <div onClick={clickNav} className='lg:hidden z-20 ml-8'>
        {nav ? <FaBars></FaBars> : <FaTimes></FaTimes>}
      </div>

      {/* Logo */}
      <img src={Logo} alt="Logo" className='w-16 lg:ml-16' />

      {/* menu */}
      <ul className='hidden lg:flex font-baloo text-xl font-medium'>
        <Link to="/">
          <li className=' text-1xl mx-8 hover:text-black'>
            Home
          </li>
        </Link>
        <Link to='/products'>
        <li className='mx-8 text-1xl hover:text-black'>
          Products
       </li>
       </Link>
       <Link to='/about'>
        <li className='mx-8 text-1xl hover:text-black'>
        About
       </li>
       </Link>
       <Link to='/contact'>
        <li className='mx-8 text-1xl hover:text-black'>
          Contact
       </li>
       </Link>
      </ul>

      {/* Logo */}
      <ul className='flex '>
        <li><Link to='/cart' >
          <FiShoppingBag size={25}></FiShoppingBag>
        </Link></li>
        <li><Link to='/search'>
          <FiSearch size={25}></FiSearch>
        </Link></li>
        {isAuthenticated?<UserOptions user={user}></UserOptions>:<li><Link to='/LogIn'>
          <FiUser size={25}></FiUser>
        </Link></li>}
      </ul>


      {/* MobileMenu */}
      <ul className={!nav ? "absolute left-0 w-full h-36 flex flex-col justify-center items-center text-black bg-pink-100 phone " : "hidden"}>
        <li className='text-2xl font-semibold mt-2 '> <Link onClick={clickNav} to='/' className='hover:text-red-400'>
          Home
        </Link></li>
        <li className='text-2xl font-semibold'><Link onClick={clickNav} to='/products' className='hover:text-red-400' >
          Products
        </Link></li>
        <li className='text-2xl font-semibold'><Link onClick={clickNav} to='/about' className='hover:text-red-400' >
          About
        </Link></li>
        <li className='text-2xl font-semibold mb-2'><Link onClick={clickNav} to='/contact' className='hover:text-red-400' >
          Contact
        </Link></li>
      </ul>
    </div>
  )
}

export default Navbar