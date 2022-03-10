import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import { createCategory, getCategories, deleteCategory } from '../../../functions/category'
import CategoryForm from '../../../components/form/CategoryForm'
import CategorySearch from '../../../components/form/CategorySearch'


const CategoryCreate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState("")

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



    // step2
    //seach category name base on each letter in search keyword we are entering
    const search = (keyword) => (letter) => letter.name.toLowerCase().includes(keyword)


    return (
        <div className="continer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-9 mt-2">
                    {loading ? <h4 className='text-danger'>Laoding...</h4> : <h4>Create Category</h4>}

                    <CategoryForm handleCreateSubmite={handleCreateSubmite} name={name} setName={setName} />
                    <hr />

                    {/* Search input */}
                    <CategorySearch keyword={keyword} setKeyword={setKeyword} />
                    <br />
                    {categories.length}
                    {/* {JSON.stringify(categories)} */}

                    {/* step 3 final */}
                    {categories.filter(search(keyword)).map((cat) => (
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