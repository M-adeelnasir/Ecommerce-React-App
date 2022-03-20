import React, { useState, useEffect } from 'react'
import ProductCard from '../products/ProductCard'
import Jumbotron from '../products/Jumbotron'
import SkeletonCard from '../products/SkeletonCard'
import { getSortedProducts } from '../../functions/getAllProducts'


const ProductsNewArrivals = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    const loadProducts = () => {
        setLoading(true)
        getSortedProducts("createdAt", "desc", 3)
            .then((res) => {
                setLoading(false)
                // console.log(res.data.data);
                setProducts(res.data.data)
            }).catch(err => {
                setLoading(false)
                console.log(err);
            })
    }

    useEffect(() => {
        loadProducts()
    }, [])




    return (
        <>
            {/* <div>{JSON.stringify(products)}</div>
            {products.length} */}
            <div className="container">
                {loading ?
                    (<SkeletonCard count={3} />)
                    : (
                        <div className="row">
                            {products.map((product) => (

                                <div key={product._id} className='col-md-4'>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
            </div>

        </>
    )
}

export default ProductsNewArrivals