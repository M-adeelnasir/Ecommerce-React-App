import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategories } from '../../../functions/category'
import { getSubs, createSub, deleteSub } from '../../../functions/sub'
import CategoryForm from '../../../components/form/CategoryForm'
import CategorySearch from '../../../components/form/CategorySearch'


const SubCreate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState('')
    const [subs, setSubs] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    const loadCategories = () => {
        getCategories()
            .then((category) => {
                setCategories(category.data.data)
                // console.log(category.data.data);
            })
    }

    const loadsSub = () => {
        getSubs()
            .then((sub) => {
                setSubs(sub.data.data)
                console.log(sub.data.data);
            })
    }

    useEffect(() => {
        loadCategories();
        loadsSub()
    }, [])

    const handleCreateSubmite = async (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                // console.log(res);
                setLoading(false)
                setName('')
                toast.success(`${res.data.data.name} is just created`)
                loadsSub()
            }).catch(err => {
                setLoading(false)
                console.log(err);
                if (err.response.status === 400) toast.error(err.message)
            })

    }


    const deleteThisCategory = async (slug, name) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            deleteSub(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.success(`"${name}" category Deleted`)
                    loadsSub()
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
                    {loading ? <h4 className='text-danger'>Laoding...</h4> : <h4>Create Sub Category</h4>}

                    <div className="form-group">
                        <label>Parent category</label>
                        <select name="category" className='form-control' onChange={e => setCategory(e.target.value)}>
                            <option disabled>Select any category</option>
                            {categories.length > 0 && categories.map((cat) => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                        </select>

                    </div>
                    {/* {JSON.stringify(category)} */}

                    {/* Form */}
                    <CategoryForm handleCreateSubmite={handleCreateSubmite} name={name} setName={setName} />
                    <hr />



                    {/* Search input */}
                    <CategorySearch keyword={keyword} setKeyword={setKeyword} />
                    <br />
                    {/* {categories.length} */}
                    {/* {JSON.stringify(categories)} */}

                    {/* step 3 final */}

                    {subs.filter(search(keyword)).map((sub) => (
                        <div className='alert alert-secondary' key={sub._id}> {sub.name}
                            <span onClick={() => deleteThisCategory(sub.slug)} className=' btn btn-sm float-right mx-auto m-0'>
                                <i className="fa fa-trash align-center text-center text-danger">
                                </i>
                            </span>
                            <Link to={`/admin/sub/${sub.slug}`}>
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

export default SubCreate