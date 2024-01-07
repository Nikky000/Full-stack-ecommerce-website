import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getAllProducts, deleteProduct } from '../../Store/ProductActions'
import { productAction, deleteProductAction } from '../../Store/ProductReducer'
import { Edit, Delete } from '@material-ui/icons'
import SideBar from './SideBar'
import Loading from '../Layout/Loading'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

const AdminProductsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { products, error, loading } = useSelector((state) => state.product);
    const { deleteError, deleteSuccess } = useSelector((state) => state.deleteProduct);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(productAction.clearError());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(deleteProductAction.clearSuccess());
        }
        if (deleteSuccess) {
            alert.success("Product delete Succesfully");
            dispatch(deleteProductAction.clearSuccess());
        }
        dispatch(getAllProducts("hello"));
    }, [error, dispatch, alert, deleteError, deleteSuccess]);

    //for deleting 
    const deletefunc = (id) => {
        dispatch(deleteProduct(id));
    }

    const column = [
        {
            field: 'id',
            headerName: 'Product ID',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 350,
            flex: 1
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: "number",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'price',
            headerName: 'Price',
            type: "number",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'action',
            headerName: 'Actions',
            minWidth: 200,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to={`/admin/update/product/${params.getValue(params.id, "id")}`}>
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
    products && products.forEach(element => {
        row.unshift({
            id: element._id,
            name: element.name,
            stock: element.stock,
            price: element.price
        });

    });



    return (<>
        {loading ? <Loading></Loading> : <div className='flex'>
            <SideBar />
            <div className='w-[90%]'>
                <div className='text-2xl font-semibold h-14 p-2 text-center'>All Products</div>
                <DataGrid
                    rows={row}
                    columns={column}
                    pageSize={10}
                    autoHeight
                    disableSelectionOnClick
                    className='w-[100%]'
                >
                </DataGrid>
            </div>
        </div>
        }
    </>
    )
}

export default AdminProductsList