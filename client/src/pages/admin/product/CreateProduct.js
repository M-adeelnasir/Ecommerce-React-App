import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { useSelector } from 'react-redux'
import createProduct from '../../../functions/product'
import { toast } from 'react-toastify'
import { getCategories } from '../../../functions/category'

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
                console.log(res.data.data);
                setValues({ ...values, categories: res.data.data })
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
                        <h4>Create Product</h4>
                        <hr />
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
                                <select name="category" className='form-control' onChange={handleChange}>
                                    <option disabled>Select any category</option>
                                    {categories.length > 0 && categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                                </select>

                            </div>
                            <button className="btn btn-outline-info ">Save</button>
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateProduct