import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { usersActions } from '../../Store/UserReducer'
import { getUserDetail, updateUser } from '../../Store/UserActions'
import { Spellcheck, EmailOutlined, ArrowDropDown } from '@material-ui/icons'
import SideBar from './SideBar'
import { useParams } from 'react-router-dom'

const Role = ["admin", "user"];

const UserDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    //state
    const { users, isUpdated, error } = useSelector((state) => state.users);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState('');


    useEffect(() => {
        if (Object.entries(users).length > 0) {
            setName(users.name);
            setEmail(users.email);
            setRole(users.role);
        }
    }, [users]);


    useEffect(() => {
        if (error) { //if error come
            alert.error(error);
            dispatch(usersActions.clearError());// for clearing the error
        };
        if (isUpdated) {
            alert.success('User Role Updated Successfully');
            dispatch(usersActions.clearSuccess());
        };
        dispatch(getUserDetail(id));

    }, [error, alert, dispatch, id, isUpdated]);


    //for submitting the product form
    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);
        dispatch(updateUser({ id: id, form: formData }));
    };

    return (<div>
        <div className='flex'>
            <SideBar></SideBar>
            <div className='w-[90%] h-[40rem] flex justify-center items-center'>
                <div className='w-[40%] h-[32rem] shadow-xl text-center font-sans flex flex-col rounded-xl'>
                    <div className='font-bold w-full text-2xl my-2'> Edit User Profile </div>
                    <form className='flex flex-col w-full h-full items-center justify-center' onSubmit={submitHandler}>
                        <div className='flex w-[80%] justify-center border-[2px] m-4'>
                            <Spellcheck fontSize='large' className='m-2'></Spellcheck>
                            <input type="text" required placeholder='Name' onChange={(e) => { setName(e.target.value) }} className='w-[60%] h-10 text-center  text-xl outline-none my-2' value={name} />
                        </div>
                        <div className='flex w-[80%] justify-center border-[2px] m-4'>
                            <EmailOutlined fontSize='large' className='m-2'></EmailOutlined>
                            <input type="text" required placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} className='w-[60%] h-10 text-center  text-xl outline-none my-2' value={email} />
                        </div>

                        <div className='flex w-[80%] justify-center border-[2px] m-4'>
                            <ArrowDropDown fontSize='large' className='m-2'></ArrowDropDown>
                            <select className='w-[60%] h-10 text-center  text-xl outline-none my-2 ' required onChange={(e) => { setRole(e.target.value) }} value={role} >
                                <option value="">Category</option>
                                {
                                    Role.map((ele, index) => {
                                        return <option key={index} value={ele}>{ele}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className='flex w-full justify-end  p-2'>
                            <button type='submit' className='h-10 rounded-xl bg-blue-300 text-white hover:bg-blue-500 font-semibold w-[30%] mt-4'>Update</button>
                        </div>


                    </form>

                </div>

            </div>
        </div>
    </div>

    )
}

export default UserDetails