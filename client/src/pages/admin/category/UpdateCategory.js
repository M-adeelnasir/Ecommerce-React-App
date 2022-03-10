import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import { updateSingleCategory, getSingleCategory } from '../../../functions/category'
import { useParams, useHistory } from 'react-router-dom'



const UpdateCategory = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))
    const { slug } = useParams()
    const history = useHistory()

    const loadCategory = () => {
        getSingleCategory(slug)
            .then((category) => {
                // console.log(category.data.data.name);
                setName(category.data.data.name)
            })
    }
    useEffect(() => {
        // console.log(slug);
        loadCategory()

    }, [])

    const handleCreateSubmite = async (e) => {
        e.preventDefault();
        setLoading(true);
        updateSingleCategory(slug, { name }, user.token)
            .then((res) => {
                // console.log(res);
                setLoading(false)
                setName('')
                toast.success(`${res.data.data.name} is just updated`)
                history.push('/admin/category')
            }).catch(err => {
                setLoading(false)
                console.log(err);
                if (err.response.status === 400) toast.error(err.message)
            })

    }


    const createCategoryForm = () => <form onSubmit={handleCreateSubmite}>

        <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 shadow-none rounded-0" autoFocus required />
            <button type='submite' className='btn btn-outline-primary mt-2'>Update</button>
        </div>

    </form>

    return (
        <div className="continer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-9 mt-2">
                    {loading ? <h4 className='text-danger'>Laoding...</h4> : <h4>Update Category</h4>}
                    {createCategoryForm()}

                </div>
            </div>
        </div>
    )
}

export default UpdateCategory
