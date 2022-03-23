import React, { useEffect, useState } from 'react'
import { getSingleCategory } from '../../functions/category'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/products/ProductCard'
import CategoryLists from '../../components/category/CategoryLists'


const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const { slug } = match.params

    useEffect(() => {
        setLoading(true)
        getSingleCategory(slug)
            .then((res) => {
                setLoading(false)
                // console.log(JSON.stringify(res.data, null, 4));
                setCategory(res.data.data);
            })
    }, [])


    return (
        <div>{match.params.slug}</div>
    )
}

export default CategoryHome