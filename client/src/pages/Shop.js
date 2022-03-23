import React, { useState, useEffect } from 'react'
import ProductCard from '../components/products/ProductCard'
import { getAllProducts } from '../functions/getAllProducts'
import { useSelector, useDispatch } from 'react-redux'


const Shop = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])


    const loadProduct = () => {
        getAllProducts(6)
            .then((res) => {
                // console.log(res.data.data);
                setProducts(res.data.data)
            })
    }

    useEffect(() => {
        loadProduct()
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h5> Search by filtering</h5>
                    </div>
                    <div className="col-md-9">
                        {loading ? (
                            <h4 className='text-danger'>Loading...</h4>
                        )
                            :
                            (<h4 className='text-danger'>Products</h4>)
                        }

                        {products.length < 1 ? <p> No product Available to shop</p> :

                            <div className="row">
                                {products.map((product) => <div key={product._id} className='col-md-4'>

                                    <ProductCard product={product} />

                                </div>)}
                            </div>
                        }

                    </div>
                </div>
            </div>


        </>
    )
}

export default Shop