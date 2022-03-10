import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import { createCategory, getCategories, getSingleCategory, deleteCategory } from '../../../functions/category'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'


const CategoryCreate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    const loadCategories = () => {
        getCategories()
            .then((category) => {
                setCategories(category.data.data)
                // console.log(category.data.data);
            })
    }
    useEffect(() => {
        loadCategories();
    }, [])

    const handleCreateSubmite = async (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                // console.log(res);
                setLoading(false)
                setName('')
                toast.success(`${res.data.data.name} is just created`)
                loadCategories()
            }).catch(err => {
                setLoading(false)
                console.log(err);
                if (err.response.status === 400) toast.error(err.message)
            })

    }

    const deleteThisCategory = async (slug, name) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            deleteCategory(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.success(`"${name}" category Deleted`)
                    loadCategories()
                }).catch(err => {
                    setLoading(false)
                    console.log(err);
                    if (err.response.status === 400) {
                        toast.error(err.message)

                    }
                })
        }

    }
    const createCategoryForm = () => <form onSubmit={handleCreateSubmite}>

        <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 shadow-none rounded-0" autoFocus required />
            <button type='submite' className='btn btn-outline-primary mt-2'>Save</button>
        </div>

    </form>

    return (
        <div className="continer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-9 mt-2">
                    {loading ? <h4 className='text-danger'>Laoding...</h4> : <h4>Create Category</h4>}
                    {createCategoryForm()}
                    <hr />
                    {categories.length}
                    {/* {JSON.stringify(categories)} */}
                    {categories.map((cat) => (
                        <div className='alert alert-secondary' key={cat._id}> {cat.name}
                            <span onClick={() => deleteThisCategory(cat.slug, cat.name)} className=' btn btn-sm float-right mx-auto m-0'>
                                <i className="fa fa-trash align-center text-center text-danger">
                                </i>
                            </span>

                            <Link to={`/admin/category/${cat.slug}`}>
                                <span className=' btn btn-sm float-right mx-auto m-0'>
                                    <i className="fa fa-pencil"></i>
                                </span>
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate