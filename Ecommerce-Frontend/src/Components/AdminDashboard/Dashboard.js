import React, { useEffect } from 'react'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../Store/ProductActions'
import { getAllUsers } from '../../Store/UserActions'
import { getOrdersList } from '../../Store/MyOrderAction'
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables)

const Dashboard = () => {

  let outOfStock = 0;
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { orders, totalAmount } = useSelector((state) => state.ordersList);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllProducts("hello"));
    dispatch(getOrdersList("hello"));
    dispatch(getAllUsers("hello"));
  }, [dispatch]);


  products && products.forEach(element => {
    if (element.stock === 0) {
      outOfStock++;
    }
  });

  //for line State Graph
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, totalAmount],
      },
    ],
  };

  //for Doughnut graph
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor:["4B5000", "#35014F"],
        hoverBackgroundColor:  ["4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock]
      }
    ]
  }


  return (
    <div className='flex'>
      <SideBar></SideBar>
      <div className='flex flex-col h-[40rem] overflow-y-scroll w-[86%] scrollbar-hide'>
        <div className='w-[95%] text-center text-3xl font-bold  m-4 p-3'>
          DashBoard
        </div>
        <div className='w-[95%] text-center text-2xl p-5 bg-blue-400 m-4  h-24 text-white font-semibold font-sans'>
          Total Amount <br />₹ {totalAmount}
        </div>
        <div className='flex w-[95%] text-center text-white h-52 justify-center items-center m-4 text-2xl font-semibold'>
          <Link to='/admin/products' className='h-52'>
            <div className='mx-8 h-[80%] rounded-full bg-red-400  border-2 border-black w-40 py-8'>
              Product <br /> {products.length}
            </div>
          </Link>
          <Link to='/admin/orders' className='h-full'>
            <div className='mx-8 h-[80%] rounded-full  bg-yellow-300  border-2 border-black w-40 py-8'>
              Orders <br /> {orders && orders.length}
            </div>
          </Link>
          <Link to='/admin/users' className='h-full'>
            <div className='mx-8 h-[80%] rounded-full bg-black border-2 border-black w-40 py-8'>
              Users <br /> {users&&users.length}
            </div>
          </Link>
        </div>

        <div className='w-[70%] m-auto my-6' >
          <Line datasetIdKey='id' data={lineState}>

          </Line>
        </div>
        <div className='w-[40%] m-auto my-6' >
          <Doughnut data={doughnutState}>
          </Doughnut>
        </div>
      </div>

    </div>
  )
}

export default Dashboard