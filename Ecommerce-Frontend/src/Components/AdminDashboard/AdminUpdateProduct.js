import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { newProductAction } from '../../Store/ProductReducer'
import { updateProduct } from '../../Store/ProductActions'
import { getProductDetail } from '../../Store/ProductActions'
import { Spellcheck, AttachMoney, Description, ArrowDropDown, AddPhotoAlternate, FormatAlignJustify } from '@material-ui/icons'
import SideBar from './SideBar'
import { useParams } from 'react-router-dom'
import Loading from '../Layout/Loading'


const categories = [
    "Laptop",
    "Clothes",
    "Phones",
    "Shoes",
    "All"
];

const AdminUpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    const { loading, product } = useSelector((state) => state.productDetail);
    const { error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState();
    const [imagePreview, setImagePreview] = useState([]);

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetail(id));
        } else {
            setName(product.name);
            setStock(product.stock);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
        }
    }, [product, id, dispatch]);

    useEffect(() => {
        if (error) { //if error come
            alert.error(error);
            dispatch(newProductAction.clearError());// for clearing the error
        };
        if (success) {
            alert.success('Product Update Successfully');
            dispatch(newProductAction.clearSuccess());
        }

    }, [error, alert, dispatch, success]);

    //for handling the imageFile
    const fileHandler = (e) => {
        const files = Array.from(e.target.files);
        setImagePreview([]);
        setImages([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => { return [...old, reader.result] });
                    setImagePreview((old) => { return [...old, reader.result] });

                }
            }
            reader.readAsDataURL(file);
        })

    }
    //for submitting the product form
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("stock", stock);
        formData.set("category", category)

        images && images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updateProduct({ id: id, form: formData }));
    };


    return (<div>{loading ? <Loading></Loading> :
        <div className='flex'>
            <SideBar></SideBar>
            <div className='w-[90%] h-[40rem] flex justify-center items-center'>
                <div className='w-[40%] h-[39rem] shadow-xl text-center font-sans flex flex-col rounded-xl'>
                    <div className='font-bold w-full text-2xl my-2'> Create New Product </div>
                    <form className='flex flex-col w-full h-full ' onSubmit={submitHandler}>
                        <div className='flex w-[80%] justify-center border-[2px] m-auto'>
                            <Spellcheck fontSize='large' className='m-2'></Spellcheck>
                            <input type="text" required placeholder='Product Name' onChange={(e) => { setName(e.target.value) }} className='w-[60%] h-10 text-center  text-xl outline-none my-2' value={name} />
                        </div>
                        <div className='flex w-[80%] justify-center border-[2px] m-auto'>
                            <AttachMoney fontSize='large' className='m-2'></AttachMoney>
                            <input type="number" required placeholder='Product Price' onChange={(e) => { setPrice(e.target.value) }} className='w-[60%] h-10 text-center  text-xl outline-none my-2' value={price} />
                        </div>
                        <div className='flex w-[80%] justify-center border-[2px] m-auto'>
                            <FormatAlignJustify fontSize='large' className='m-2'></FormatAlignJustify>
                            <input type="number" required placeholder='Product Stock' onChange={(e) => { setStock(e.target.value) }} className='w-[60%] h-10 text-center text-xl outline-none my-2' value={stock} />
                        </div>
                        <div className='flex w-[80%] justify-center border-[2px] m-auto'>
                            <ArrowDropDown fontSize='large' className='m-2'></ArrowDropDown>
                            <select className='w-[60%] h-10 text-center  text-xl outline-none my-2 ' required onChange={(e) => { setCategory(e.target.value) }} value={category} >
                                {
                                    categories.map((ele, index) => {
                                        return <option key={index} value={ele}>{ele}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex w-[80%] justify-center  m-auto'>
                            <Description fontSize='large' className='m-2'></Description>
                            <textarea placeholder='Description' required className='  w-[60%] h-32' cols="30" rows="10" onChange={(e) => { setDescription(e.target.value) }} value={description}></textarea>
                        </div>
                        <div className='flex w-[80%] justify-center m-auto'>
                            <AddPhotoAlternate fontSize='large' className='m-2'></AddPhotoAlternate>
                            <input type="file" className='h-12 font-semibold w-[60%]' multiple accept='image/*' onChange={fileHandler} />
                        </div>

                        <div className='flex w-[80%] justify-center  m-auto'>
                            {
                                imagePreview.length > 0 ? imagePreview.map((ele, index) => {
                                    return <img key={index} src={ele} alt="new" className='h-10 w-10 mx-1 rounded-xl' />
                                }) : product.images.map((ele, index) => {
                                    return <img key={index} src={ele.url} alt="old" className='h-10 w-10 mx-1 rounded-xl' />
                                })
                            }
                        </div>
                        <div className='flex w-full justify-end  p-2'>
                            <button type='submit' className='h-10 rounded-xl bg-blue-300 text-white hover:bg-blue-500 font-semibold w-[30%]'>update Product</button>
                        </div>


                    </form>

                </div>

            </div>
        </div>}
    </div>

    )
}

export default AdminUpdateProduct