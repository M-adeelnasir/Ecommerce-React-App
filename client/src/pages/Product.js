import React, { useState, useEffect } from 'react'
import { getSingleProduct } from '../functions/getAllProducts'
import SingleProduct from '../components/products/SingleProduct'
import { getRelatedProducts } from '../functions/getAllProducts'
import ProductCard from '../components/products/ProductCard'



const Product = ({ match }) => {

    const [product, setProduct] = useState({})
    const [realtedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(false)


    const { slug } = match.params

    useEffect(() => {
        loadProduct()
    }, [slug])



    const loadProduct = () => {
        setLoading(true)
        getSingleProduct(slug)
            .then((res) => {
                setLoading(false)
                setProduct(res.data.data)

                //get related products
                getRelatedProducts(res.data.data._id)
                    .then((res) => {
                        // console.log(res.data.data);
                        setRelatedProducts(res.data.data)
                    })


            }).catch(err => {
                console.log(err);
            })
    }





    return (
        <>
            <div className="container-fluid">
                <div className="row pt-4">
                    <SingleProduct product={product} loadProduct={loadProduct} />
                </div>

                <div className="row p-5">
                    <div className="col text-center pt-5 pb-5">
                        <hr />
                        <h4> Related Products</h4>
                        {/* {JSON.stringify(realtedProducts)} */}
                        <hr />
                    </div>
                </div>
                <div className="container">
                    <div className="row pb-5">
                        {realtedProducts.length ? realtedProducts.map((product) =>
                            <div key={product._id} className="col-md-4">

                                <ProductCard product={product} />

                            </div>
                        ) : <div className='col text-center'>Not Related Product Found</div>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Product