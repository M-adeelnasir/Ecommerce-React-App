import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import { getCategories } from '../../../functions/category'
import { getSingleSub, updateSub } from '../../../functions/sub'
import CategoryForm from '../../../components/form/CategoryForm'


const UpdateSub = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState('')

    const { user } = useSelector((state) => ({ ...state }))
    const { slug } = useParams()
    const history = useHistory()

    const loadCategories = () => {
        getCategories()
            .then((category) => {
                setCategories(category.data.data)
                // console.log(category.data.data);
            })
    }

    const loadSub = () => {
        getSingleSub(slug)
            .then((sub) => {
                // console.log(sub);
                setName(sub.data.data.name)
                setParent(sub.data.data.parent)
            })
    }

    useEffect(() => {
        loadCategories();
        loadSub()
    }, [])

    const handleUpdateSubmite = async (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(slug, { name, parent: parent }, user.token)
            .then((res) => {
                // console.log(res);
                setLoading(false)
                setName('')
                toast.success(`${res.data.data.name} Updated`)
                history.push('/admin/sub')
            }).catch(err => {
                setLoading(false)
                console.log(err);
                if (err.response.status === 400) toast.error(err.message)
            })

    }



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
                        <select name="sub" className='form-control' onChange={e => setParent(e.target.value)}>
                            {categories.length > 0 && categories.map((cat) => (<option key={cat._id} value={cat._id} selected={cat._id === parent}>{cat.name}</option>))}
                        </select>

                    </div>
                    {/* {JSON.stringify(category)} */}

                    {/* Form */}
                    <CategoryForm handleCreateSubmite={handleUpdateSubmite} name={name} setName={setName} />
                    <hr />




                </div>
            </div>
        </div>
    )
}

export default UpdateSub