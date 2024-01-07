import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../Layout/Loading'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({children ,forAdmin}) => {
    const {isAuthenticated, loading, user} = useSelector((state)=>state.user);
   
   
  return (<>
    {loading?<Loading></Loading>:isAuthenticated===false? <Navigate replace to='/LogIn'></Navigate>:forAdmin === true? user.role==="admin"? children:<Navigate replace to='/LogIn'></Navigate>:children}
  </>
  )
}

export default ProtectedRouter
