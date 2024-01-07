import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getAllReviews, deleteReview } from '../../Store/ProductActions'
import { reviewsAction } from '../../Store/ProductReducer'
import { Spellcheck, Delete } from '@material-ui/icons'
import SideBar from './SideBar'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'



const Reviews = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    //state
    const { reviews, error, isDeleted } = useSelector((state) => state.reviews);
    const [id, setId] = useState('');


    useEffect(() => {
        dispatch(reviewsAction.clearReviews());
    }, [dispatch]);


    useEffect(() => {
        if (error) { //if error come
            alert.error(error);
            dispatch(reviewsAction.clearError());// for clearing the error
        };
        if (isDeleted) {
            alert.success('Deleted Successfully');
            dispatch(reviewsAction.clearSuccess());
            var product_Id = id.trim();
            dispatch(getAllReviews(product_Id));
        };
    }, [error, alert, dispatch, id, isDeleted]);


    //delete
    const deletefunc = (review_Id) => {
        var product_Id = id.trim();
        dispatch(deleteReview({ product_Id, review_Id }));
    }


    const column = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 200,
            flex: 1
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "email",
            headerName: "email",
            minWidth: 100,
            flex: 0.5,

        },
        {
            field: 'action',
            headerName: 'Actions',
            minWidth: 100,
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Button onClick={() => { deletefunc(`${params.getValue(params.id, "id")}`) }} >
                        <Delete></Delete>
                    </Button>
                </>
                );
            }
        },
    ];

    const row = [];
    reviews && reviews.forEach(element => {
        row.unshift({
            id: element._id,
            email: element.email,
            name: element.name,
            comment: element.comment
        });

    });


    //for submitting form
    const submitHandler = (e) => {
        e.preventDefault();
        var product_Id = id.trim();
        dispatch(getAllReviews(product_Id));
    };

    return (<div className='flex'>

        <SideBar></SideBar>
        <div className='w-[90%] h-[40rem] flex flex-col justify-center items-center'>
            <div className='w-[40%] h-[16rem] shadow-xl text-center font-sans flex flex-col rounded-xl mt-3'>
                <div className='font-bold w-full text-2xl my-2'> Product Reviews </div>
                <form className='flex flex-col w-full h-full items-center justify-center' onSubmit={submitHandler}>
                    <div className='flex w-[80%] justify-center border-[2px] m-4'>
                        <Spellcheck fontSize='large' className='m-2'></Spellcheck>
                        <input type="text" required placeholder='Enter Product ID' onChange={(e) => { setId(e.target.value) }} className='w-[60%] h-8 text-center  text-xl outline-none my-2' value={id} />
                    </div>
                    <div className='flex w-full justify-end  p-2'>
                        <button type='submit' className='h-10 rounded-xl bg-blue-300 text-white hover:bg-blue-500 font-semibold w-[30%] mt-4'>Review</button>
                    </div>
                </form>

            </div>
            {reviews.length > 0 &&
                <div className='w-[90%] m-auto'>
                    <div className='text-2xl font-semibold h-20 p-2 text-center'>All Reviews</div>
                    <DataGrid
                        rows={row}
                        columns={column}
                        pageSize={4}
                        autoHeight
                        disableSelectionOnClick
                        className='w-[100%]'
                    >
                    </DataGrid>
                </div>
            }
        </div>
    </div>

    )
}

export default Reviews