import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getAllOrders } from '../../Store/MyOrderAction'
import { allOrderAction } from '../../Store/MyOrderReducer'
import Loading from '../Layout/Loading'
import { DataGrid } from '@material-ui/data-grid'
import {Link} from 'react-router-dom'
import {Launch} from '@material-ui/icons'


const MyOrders = () => {

  const alert=useAlert();
  const dispatch=useDispatch();

  //state
  const {orders,error,loading}=useSelector((state)=>state.myOrders);


  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(allOrderAction.clearError());
    };
    dispatch(getAllOrders("hello"));
  },[dispatch,error,alert]);
  
//Data grid column
  const column=[
    {
      field:"id",
      headerName:"ID",
      minWidth:250,
      flex:1
    },{
      field:"status",
      headerName:"Status",
      minWidth:150,
      flex:0.5,
      cellClassName:(params)=>{
        return params.getValue(params.id,"status")==="Delivered"?'text-green-500':'text-red-500'
      }

    },{
      field:"itemQuantity",
      headerName:"ItemQuantity",
      type:"number",
      minWidth:150,
      flex:0.3
    },{
      field:"amount",
      headerName:"Amount",
      type:"number",
      minWidth:150,
      flex:0.5
    },
    {
      field:"action",
      headerName:"Action",
      type:"number",
      minWidth:150,
      flex:0.5,
      sortable:false,
      renderCell:(params)=>{
        return (<Link to={`/myOrder/${params.getValue(params.id,"id")}`}>
          <Launch></Launch>
        </Link>
        );
      }
    }
  ];

  //Data Grid Row
  const row=[];
  orders&&orders.forEach(element => {
    row.unshift({
      id:element._id,
      status:element.orderStatus,
      itemQuantity:element.orderItems.length,
      amount:element.totalPrice
    });
    
  });

  return (
    <>
      {loading?<Loading></Loading>:<div className='min-h-[30rem] mt-16'>
        <DataGrid
           rows={row}
           columns={column}
           pageSize={10}
           autoHeight
           disableSelectionOnClick
           className='w-[90%] m-auto mt-3'
         >
        </DataGrid>
      </div>
      }
</>
  )
    }

export default MyOrders