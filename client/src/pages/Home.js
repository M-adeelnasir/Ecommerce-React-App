import React, { useState, useEffect } from 'react'
import { getAllProducts } from '../functions/getAllProducts'
import ProductCard from '../components/products/ProductCard'
import Jumbotron from '../components/products/Jumbotron'
import SkeletonCard from '../components/products/SkeletonCard'
const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    const loadProducts = () => {
        setLoading(true)
        getAllProducts(3)
            .then((res) => {
                setLoading(false)
                console.log(res.data.data);
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

            <div className="jumbotron bg-light text-danger h1 font-weight-bold text-center" >
                {/* Pass the array of Text */}
                <Jumbotron text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
            </div>
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

export default Home