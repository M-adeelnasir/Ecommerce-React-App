import React, { useState, useEffect } from 'react'
import ProductCard from '../products/ProductCard'
import SkeletonCard from '../products/SkeletonCard'
import { getSortedProducts, getProductCount } from '../../functions/getAllProducts'
import { Pagination } from 'antd'


const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [productCounts, setProductCounts] = useState(0)


    useEffect(() => {
        loadProducts()
    }, [page])

    useEffect(() => {
        getProductCount()
            .then((res) => setProductCounts(res.data))
    }, [])

    const loadProducts = () => {
        setLoading(true)
        //Products on base of sold
        getSortedProducts("sold", "desc", page)
            .then((res) => {
                setLoading(false)
                // console.log(res.data.data);
                setProducts(res.data.data)
            }).catch(err => {
                setLoading(false)
                console.log(err);
            })
    }





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
            <div className="row">
                <div className="col-md-4 offset-md-4 text-center pt-2 p-2 mt-5">
                    <Pagination current={page} total={(productCounts / 3) * 10} onChange={(value) => setPage(value)} />

                </div>
            </div>
        </>
    )
}

export default BestSellers