import React, { useEffect, useState } from 'react'
import Resizer from "react-image-file-resizer";
import { Avatar, Badge } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import axios from 'axios';
import AdminNav from '../../../components/nav/AdminNav'
import { useSelector } from 'react-redux'
import createProduct from '../../../functions/product'
import { toast } from 'react-toastify'
import { getCategories, getSubCat } from '../../../functions/category'
import { Select } from 'antd';
const { Option } = Select;


const CreateProduct = () => {

    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        categories: [],
        subs: [],
        shipping: "",
        quantity: "",
        images: [],
        colors: ["Black", "White", "Silver", "Grey", "Blue"],
        brands: ["Apple", "Samsung", "Hp", "Lenovo", "Asus"],
        color: "",
        brand: ""
    })


    //lets destructure
    const { title, description, price, category, categories, subs, shipping, quantity, images, colors, brands, brand, color } = values

    const [subOptions, setSubOptions] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)



    const { user } = useSelector((state) => ({ ...state }));
    //handleChange  
    const handleChange = (e) => {
        // this is how to hanlde more field forms
        //for each value we will spread out the value
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    //hanldeSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                //Show alert to admin product is created
                window.alert(`"${res.data.data.title}" is created`)
                window.location.reload()


            }).catch((err) => {
                console.log(err);
                //error Getting from backend
                toast.error(err.response.data.data)
            })

    }
    const loadCategories = () => {
        getCategories()
            .then(res => {
                // console.log(res.data.data);
                setValues({ ...values, categories: res.data.data })
            })
    }

    const handleCategoryChange = async (e) => {
        e.preventDefault();
        setValues({ ...values, subs: [], category: e.target.value })
        getSubCat(e.target.value)
            .then(res => {
                // console.log(res.data.data);
                setSubOptions(res.data.data)
            })
        setShow(true)

    }


    const handleFileResizeAndUpload = async (e) => {
        let files = e.target.files  // multiple img upload ||e.target.files[0]  for single pic upload
        let allFiles = values.images;
        // console.log(allFiles);
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 300, 300, "JPEG", 100, 0, (uri) => {
                    console.log(uri);
                    axios.post(`${process.env.REACT_APP_API_REQUEST}/uploadimages`, { image: uri },
                        {
                            headers: {
                                authtoken: user ? user.token : ""
                            }
                        })
                        .then(res => {
                            setLoading(false)
                            console.log("IMAGES UPLOAD :   ", res);
                            console.log(res.data);
                            allFiles.push(res.data)
                            setValues({ ...values, images: allFiles })

                        }).catch(err => {
                            setLoading(false)
                            console.log(err);
                        })
                }, "base64")
            }
        }

    }
    const handleBadgeClick = (public_id) => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API_REQUEST}/removeimages`, { public_id },
            {
                headers: {
                    authtoken: user ? user.token : ""
                }
            }
        ).then((res) => {
            setLoading(false)
            const currentImages = values.images.filter((img) => {
                return img.public_id !== public_id
            })

            setValues({ ...values, images: currentImages })

        }).catch((err) => {
            setLoading(false)
            console.log(err);
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>

                    <div className="col-md-10 mt-2">
                        {loading ? <LoadingOutlined className='text-danger' style={{ fontSize: '40px' }} /> : <h4>Create Product</h4>}
                        <hr />
                        {/* {JSON.stringify(values.images)} */}
                        <div className="p-3">
                            <div className="row">
                                <label className='btn btn-raised btn-info'> Choose File
                                    <input type="file" multiple hidden accept='images/*' onChange={handleFileResizeAndUpload} />
                                </label>
                            </div>
                            <div className="row">
                                {values.images && values.images.map((img) => <Badge count="X" key={img.public_id} onClick={() => handleBadgeClick(img.public_id)} style={{ cursor: "pointer" }} className="mt-2">
                                    <Avatar src={img.url} size={100} className="m-2" />
                                </Badge>
                                )}
                            </div>

                        </div>
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            <div className="form-group">
                                <label >Title</label>
                                <input type="text" className='form-control' name='title' value={title} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label >Description</label>
                                <input type="text" className='form-control' name='description' value={description} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label >Price</label>
                                <input type="number" className='form-control' name='price' value={price} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label >Shipping</label>
                                <select name="shipping" className='form-control' onChange={handleChange}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label >Quantity</label>
                                <input type="number" className='form-control' name='quantity' value={quantity} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label >Colors</label>
                                <select name="color" className='form-control' onChange={handleChange}>
                                    <option >Please Select</option>
                                    {colors.map((color) => <option key={color} value={color}>{color}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Brands</label>
                                <select name="brand" className='form-control' onChange={handleChange}>
                                    <option >Please Select</option>
                                    {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>category</label>
                                <select name="category" className='form-control' onChange={handleCategoryChange}>
                                    <option disabled>Select any category</option>
                                    {categories.length > 0 && categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                                </select>
                            </div>

                            {/* {show ? subOptions.length : "number"} */}

                            {show && <div>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={(value) => setValues({ ...values, subs: value })}
                                    value={subs}
                                >
                                    {subOptions.map((sub) => <Option key={sub._id} value={sub._id}>{sub.name}</Option>)}
                                </Select>
                            </div>}

                            <button className="btn btn-outline-info mb-3">Save</button>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateProduct