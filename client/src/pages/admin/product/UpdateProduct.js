import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminNav from '../../../components/nav/AdminNav'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getSingleProduct } from '../../../functions/getAllProducts';
import { getCategories, getSubCat } from '../../../functions/category'
import { Select } from 'antd';
const { Option } = Select;

const UpdateProduct = () => {

    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        subs: [],
        shipping: "",
        quantity: "",
        images: [],
        colors: ["Black", "White", "Silver", "Grey", "Blue"],
        brands: ["Apple", "Samsung", "Hp", "Lenovo", "Asus"],
        color: "",
        brand: ""
    })
    const [categories, setCategories] = useState([])
    const [subOptions, setSubOptions] = useState([])
    const [arryOfSubs, setArryOfSubs] = useState([])
    const [selectCategory, setSelectCategory] = useState("")
    //lets destructure
    const { title, description, price, category, subs, shipping, quantity, images, colors, brands, brand, color } = values

    const { slug } = useParams()

    const loadProduct = () => {
        getSingleProduct(slug)
            .then((res) => {
                // console.log(res.data.data);
                //load product
                setValues({ ...values, ...res.data.data })

                getSubCat(res.data.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data.data)

                    })
                let arr = []
                res.data.data.subs.map((s) => {
                    arr.push(s._id)
                })
                console.log(arr);
                setArryOfSubs(prev => arr)

            }).catch(err => {
                console.log(err);
            })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

    }
    const handleChange = (e) => {
        // this is how to hanlde more field forms
        //for each value we will spread out the value
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories()
            .then(res => {
                console.log(res.data.data);
                setCategories(res.data.data)
            })

    }

    const handleCategoryChange = async (e) => {
        e.preventDefault();
        setValues({ ...values, subs: [] })
        setSelectCategory(e.target.value)
        getSubCat(e.target.value)
            .then(res => {
                // console.log(res.data.data);
                setSubOptions(res.data.data)
            })

        //if user change category and came backe to prev cat
        //show him his prev cat and sub cat
        if (values.category._id === e.target.value) {
            loadProduct()
        }

        //reset sub categories on change
        setArryOfSubs([])

    }

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col-md-10 mt-2">
                        <h1>Product Update</h1>
                        {/* {JSON.stringify(values)} */}
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
                                <select value={shipping === "Yes" ? "Yes" : "No"} name="shipping" className='form-control' onChange={handleChange}>
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
                                <select value={color} name="color" className='form-control' onChange={handleChange}>
                                    {colors.map((color) => <option key={color} value={color}>{color}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Brands</label>
                                <select value={brand} name="brand" className='form-control' onChange={handleChange}>
                                    {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" className='form-control' onChange={handleCategoryChange} value={selectCategory ? selectCategory : category._id}>
                                    {categories.length > 0 && categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                                </select>
                            </div>
                            <div>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={(value) => setArryOfSubs(value)}
                                    value={arryOfSubs}
                                >
                                    {subOptions.map((sub) => <Option key={sub._id} value={sub._id}>{sub.name}</Option>)}
                                </Select>
                            </div>
                            <button className="btn btn-outline-info mb-3">Save</button>
                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}

export default UpdateProduct