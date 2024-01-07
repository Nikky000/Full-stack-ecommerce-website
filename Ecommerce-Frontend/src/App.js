import React,{useEffect,useState} from "react";
import HomePage from "./Components/HomePage/HomePage";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ParticularProduct from "./Components/Product/Particular Product/ParticularProduct";
import Navbar from "./Components/Layout/Navbar"
import Footer from "./Components/Layout/Footer"
import ProductPage from "./Components/Product/ProductPage.js"
import Search from "./Components/Product/Search"
import LogIn from "./Components/User/LogIn"
import Register from "./Components/User/Register"
import {useDispatch} from 'react-redux'
import {loadUser} from './Store/UserActions'
import Profile from "./Components/User/Profile"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import UpdateProfile from "./Components/User/UpdateProfile"
import UpdatePassword from "./Components/User/UpdatePassword"
import CartPage from "./Components/Cart/CartPage"
import Shipping from "./Components/Shipping/Shipping"
import ConfirmOrder from "./Components/Shipping/ConfirmOrder"
import PaymentProtectedRoute from "./Components/ProtectedRoute/PaymentProtectedRoute";
import Payment from "./Components/Payment/Payment"
import axios from 'axios'
import Success from "./Components/Payment/Success"
import MyOrders from "./Components/MyOrders/MyOrders"
import MyOrder from "./Components/MyOrders/MyOrder"
import Dashboard from "./Components/AdminDashboard/Dashboard"
import AdminProductsList from "./Components/AdminDashboard/AdminProductsList"
import NewProduct from "./Components/AdminDashboard/NewProduct"
import AdminUpdateProduct from "./Components/AdminDashboard/AdminUpdateProduct"
import AdminOrderList from "./Components/AdminDashboard/AdminOrderList"
import ProcessOrder from "./Components/AdminDashboard/ProcessOrder"
import Users from "./Components/AdminDashboard/Users"
import UserDetails from "./Components/AdminDashboard/UserDetails"
import Reviews from "./Components/AdminDashboard/Reviews"
import About from "./Components/About/About"
import Contact from './Components/Contact/Contact'
import NotFound from "./Components/Layout/NotFound";

function App() {
  const dispatch=useDispatch();

  const [stripeKey,setStripeKey] = useState();

  const getStripeKey=async ()=>{
    const response= await axios.get(`https://ecommerce-plaza-aryanhac.onrender.com/api/payment/apiKey`,{withCredentials:true});
    setStripeKey(response.data.key);
    
  }

  
  useEffect(()=>{
    dispatch(loadUser("hello"));
    getStripeKey();
  },[dispatch]); 

  

  return (
     <Router>
     <Navbar/>
      <Routes>
      <Route exact path="/"  element={<HomePage></HomePage>}></Route>
      <Route exact path="/product/:id" element={<ParticularProduct></ParticularProduct>}></Route>
      <Route exact path="/products" element={<ProductPage></ProductPage>}></Route>
      <Route exact path="/products/:keyword" element={<ProductPage></ProductPage>}></Route>
      <Route exact path="/search" element={<Search></Search>}></Route>
      <Route exact path="/LogIn" element={<LogIn></LogIn>}></Route>
      <Route exact path="/Register" element={<Register></Register>}></Route>
      <Route exact path="/cart" element={<CartPage></CartPage>}></Route>
      <Route exact path="/about" element={<About></About>}></Route>
      <Route exact path="/contact" element={<Contact></Contact>}></Route>
      {/*  wrap in ProtectedRoute for checking user is authenticated or not */}
      <Route exact path="/account" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route> 
      <Route exact path='/update/profile' element={<ProtectedRoute><UpdateProfile></UpdateProfile></ProtectedRoute>}></Route>
      <Route exact path='/update/password' element={<ProtectedRoute><UpdatePassword></UpdatePassword></ProtectedRoute>}></Route>
      <Route exact path="/shipping" element={<ProtectedRoute><Shipping></Shipping></ProtectedRoute>}></Route>
      <Route exact path="/confirmOrder" element={<ProtectedRoute><ConfirmOrder></ConfirmOrder></ProtectedRoute>}></Route>
      <Route exact path="/payment/process" element={<PaymentProtectedRoute stripeKey={stripeKey}><Payment></Payment></PaymentProtectedRoute>}></Route>
      <Route exact path="/success" element={<ProtectedRoute><Success></Success></ProtectedRoute>}></Route>
      <Route exact path="/myOrders" element={<ProtectedRoute><MyOrders></MyOrders></ProtectedRoute>}></Route>
      <Route exact path="/myOrder/:id" element={<ProtectedRoute><MyOrder></MyOrder></ProtectedRoute>}></Route>
      <Route exact  path="/admin/dashboard" element={<ProtectedRoute forAdmin={true}><Dashboard></Dashboard></ProtectedRoute>}></Route>
      <Route exact  path="/admin/products" element={<ProtectedRoute forAdmin={true}><AdminProductsList></AdminProductsList></ProtectedRoute>}></Route>
      <Route exact  path="/admin/update/product/:id" element={<ProtectedRoute forAdmin={true}><AdminUpdateProduct></AdminUpdateProduct></ProtectedRoute>}></Route>
      <Route exact  path="/admin/create/product" element={<ProtectedRoute forAdmin={true}><NewProduct></NewProduct></ProtectedRoute>}></Route>
      <Route exact  path="/admin/orders" element={<ProtectedRoute forAdmin={true}><AdminOrderList></AdminOrderList></ProtectedRoute>}></Route>
      <Route exact  path="/admin/order/:id" element={<ProtectedRoute forAdmin={true}><ProcessOrder></ProcessOrder></ProtectedRoute>}></Route>
      <Route exact  path="/admin/users" element={<ProtectedRoute forAdmin={true}><Users></Users></ProtectedRoute>}></Route>
      <Route exact  path="/admin/user/:id" element={<ProtectedRoute forAdmin={true}><UserDetails></UserDetails></ProtectedRoute>}></Route>
      <Route exact  path="/admin/reviews" element={<ProtectedRoute forAdmin={true}><Reviews></Reviews></ProtectedRoute>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer/>
     </Router>
  );
}

export default App;
