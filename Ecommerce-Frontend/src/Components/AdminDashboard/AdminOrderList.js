import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getOrdersList, deleteOrder } from '../../Store/MyOrderAction'
import { ordersListAction } from '../../Store/MyOrderReducer'
import { Edit, Delete } from '@material-ui/icons'
import SideBar from './SideBar'
import Loading from '../Layout/Loading'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

const AdminOrderList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { orders, error, loading, deleteSuccess } = useSelector((state) => state.ordersList);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ordersListAction.clearError());
        }
        if (deleteSuccess) {
            alert.error("Order Deleted Successfully");
            dispatch(ordersListAction.clearSuccess());
        }
        dispatch(getOrdersList("hello"));
    }, [error, dispatch, alert, deleteSuccess]);



    //for deleting
    const deletefunc = (id) => {
        dispatch(deleteOrder(id));
    }


    const column = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 200,
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 200,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? 'text-green-500' : 'text-red-500'
            }

        },
        {
            field: "itemQuantity",
            headerName: "ItemQuantity",
            type: "number",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: 'action',
            headerName: 'Actions',
            minWidth: 100,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                        <Edit></Edit>
                    </Link>
                    <Button onClick={() => { deletefunc(`${params.getValue(params.id, "id")}`) }} >
                        <Delete></Delete>
                    </Button>
                </>
                );
            }
        },
    ];

    const row = [];
    orders && orders.forEach(element => {
        row.unshift({
            id: element._id,
            status: element.orderStatus,
            itemQuantity: element.orderItems.length,
            amount: element.totalPrice
        });

    });



    return (<>
        {loading ? <Loading></Loading> : <div className='flex'>
            <SideBar />
            <div className='w-[80%] m-auto'>
                <div className='text-2xl font-semibold h-14 p-2 text-center'>All Orders</div>
                <DataGrid
                    rows={row}
                    columns={column}
                    pageSize={10}
                    autoHeight
                    disableSelectionOnClick
                    className='w-[100%]'
                >
                </DataGrid>a
            </div>
        </div>
        }
    </>
    )
}

export default AdminOrderList