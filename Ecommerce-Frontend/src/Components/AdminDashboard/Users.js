import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getAllUsers, deleteUser } from '../../Store/UserActions'
import { usersActions } from '../../Store/UserReducer'
import { Edit, Delete } from '@material-ui/icons'
import SideBar from './SideBar'
import Loading from '../Layout/Loading'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

const Users = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { users, error, loading, isDeleted } = useSelector((state) => state.users);


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(usersActions.clearError());
        }
        if (isDeleted) {
            alert.error("User Deleted Successfully");
            dispatch(usersActions.clearSuccess());
        }
        dispatch(getAllUsers("hello"));
    }, [error, dispatch, alert, isDeleted]);



    //for deleting
    const deletefunc = (id) => {
        dispatch(deleteUser(id));
    }


    const column = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 200,
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 100,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? 'text-green-500' : 'text-red-500'
            }

        },
        {
            field: 'action',
            headerName: 'Actions',
            minWidth: 100,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
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
    users && users.forEach(element => {
        row.unshift({
            id: element._id,
            email: element.email,
            name: element.Name,
            role: element.role
        });

    });



    return (<>
        {loading ? <Loading></Loading> : <div className='flex'>
            <SideBar />
            <div className='w-[80%] m-auto'>
                <div className='text-2xl font-semibold h-14 p-2 text-center'>All Users</div>
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

export default Users