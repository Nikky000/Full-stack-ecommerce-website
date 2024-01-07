import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../Layout/Loading'
import { Navigate } from 'react-router-dom'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const PaymentProtectedRouter = ({children,stripeKey }) => {
    const {isAuthenticated, loading} = useSelector((state)=>state.user);
   
  return (<>
    {loading?<Loading></Loading>:isAuthenticated && stripeKey ?<Elements stripe={loadStripe(stripeKey)}>{children}</Elements>:<Navigate replace to='/LogIn'></Navigate>}
  </>
  )
}

export default PaymentProtectedRouter