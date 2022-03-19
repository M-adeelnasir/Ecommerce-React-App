import React, { useState, useEffect } from 'react'
import { getAllProducts } from '../functions/getAllProducts'
import ProductCard from '../components/products/ProductCard'
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

            <div className="jumbotron">
                {loading ? <h4>Loading...</h4> : <h4>All Products</h4>}
            </div>
            <div className="container">
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className='col-md-4'>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Home