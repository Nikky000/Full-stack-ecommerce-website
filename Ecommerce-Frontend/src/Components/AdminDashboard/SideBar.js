import React from 'react'
import { Dashboard, Group, RateReview, ListAlt, ExpandMore, ChevronRight } from '@material-ui/icons'
import { useNavigate, Link } from 'react-router-dom'
import { TreeView, TreeItem } from '@material-ui/lab'

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className='w-[250px] pb-10 h-[40rem] border-gray-300 border-r-[2px] flex flex-col item-center'>
      <div className='text-3xl font-bold text-center my-10'>Ecommerce</div>
      <ul className='text-xl w-full mt-6'>
        <li className='w-[80%] my-12 mx-3 h-7 hover:text-red-400 font-semibold flex flex-row' onClick={() => { navigate('/admin/dashboard') }}>
          <Dashboard></Dashboard>
          <div className='ml-4'>Dashboard</div>
        </li>
        <li className='w-[80%]  my-12 mx-3 h-7 font-semibold flex flex-row'>

          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to='/admin/products'>
                <TreeItem nodeId="2" label="All" />
              </Link>
              <Link to='/admin/create/product'>
                <TreeItem nodeId="2" label="Create" />
              </Link>
            </TreeItem>
          </TreeView>
        </li>
        <li className='w-[80%]  my-12 mx-3 h-7 hover:text-red-400 font-semibold flex flex-row' onClick={() => { navigate('/admin/orders') }}>
          <ListAlt></ListAlt>
          <div className='ml-4'>Orders</div>
        </li>
        <li className='w-[80%] my-12 mx-3 h-7 hover:text-red-400 font-semibold flex flex-row' onClick={() => { navigate('/admin/users') }}>
          <Group></Group>
          <div className='ml-4'>Users</div>
        </li>
        <li className='w-[80%]  my-12 mx-3 h-7 hover:text-red-400 font-semibold flex flex-row' onClick={() => { navigate('/admin/reviews') }}>
          <RateReview></RateReview>
          <div className='ml-4'>Reviews</div>
        </li>

      </ul>
    </div>
  )
}

export default SideBar
