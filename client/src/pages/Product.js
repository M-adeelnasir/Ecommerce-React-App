import React, { useState, useEffect } from 'react'
import { getSingleProduct } from '../functions/getAllProducts'
import SingleProduct from '../components/products/SingleProduct'
const Product = ({ match }) => {

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)

    const { slug } = match.params

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        setLoading(true)
        getSingleProduct(slug)
            .then((res) => {
                setLoading(false)
                setProduct(res.data.data)
            })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row pt-4">
                    <SingleProduct product={product} />
                </div>

                <div className="row p-5">
                    <div className="col text-center pt-5 pb-5">
                        <hr />
                        <h4> Related Products</h4>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Product