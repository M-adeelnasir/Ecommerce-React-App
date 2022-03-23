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
                // console.log(JSON.stringify(res.data, null, 4));
                setCategory(res.data.data);
                setProducts(res.data.products)

                setLoading(false)
            })
    }, [])


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {loading ?
                            <h4 className='text-center pt-3 pb-3 h3 mt-3 mb-5 bg-light'>Loading...</h4>
                            :
                            <h4 className='text-center pt-3 pb-3 h3 mt-3 mb-5 bg-light'>

                                {products.length} Products in "{category.name}" category
                            </h4>}
                    </div>
                </div>
                <div className="row">
                    {products.map((product) =>
                        <div className='col-md-4' key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default CategoryHome