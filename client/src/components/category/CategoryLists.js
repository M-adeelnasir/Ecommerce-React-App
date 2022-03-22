import React, { useState, useEffect } from 'react'
import { getCategories } from '../../functions/category'
import { Link } from 'react-router-dom';

const CategoryLists = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        getCategories()
            .then((res) => {
                console.log(res.data.data);
                setCategories(res.data.data)
            }).catch(err => console.log(err))
    }, [])



    const showCategories = () =>
        categories.map((category) => <div className='m-2 col link-primary'>
            <Link to={`/category/${category.slug}`} style={{ textDecoration: "underline" }}>{category.name}</Link>
        </div>)

    return (
        <div className="container">
            <div className="row">
                {loading ? <h4>Loading...</h4> : showCategories()}
            </div>
        </div>
    )
}

export default CategoryLists