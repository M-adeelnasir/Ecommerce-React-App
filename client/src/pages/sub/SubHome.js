import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/products/ProductCard'
import { getSingleSub } from '../../functions/sub';


const SubHome = ({ match }) => {
    const [sub, setSub] = useState({});
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const { slug } = match.params

    useEffect(() => {
        setLoading(true)
        getSingleSub(slug)
            .then((res) => {
                // console.log(JSON.stringify(res.data, null, 4));
                setSub(res.data.data);
                setProducts(res.data.product)


                setLoading(false)
            })
    }, [])


    return (
        <>
            {/* <h1>helo</h1> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {loading ?
                            <h4 className='text-center pt-3 pb-3 h3 mt-3 mb-5 bg-light'>Loading...</h4>
                            :
                            <h4 className='text-center pt-3 pb-3 h3 mt-3 mb-5 bg-light'>

                                {products.length} Products in "{sub.name}" Sub category
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

export default SubHome