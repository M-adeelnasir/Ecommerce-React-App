import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { getAllProducts, deleteProduct } from '../../../functions/getAllProducts'
import AdminProducts from '../../../components/products/AdminProducts'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    //redux
    const { user } = useSelector((state) => ({ ...state }))

    const LoadAllProducts = () => {
        setLoading(true)
        getAllProducts(100)
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
        LoadAllProducts();
    }, [])

    const handleRemoveProduct = async (slug) => {
        if (window.confirm('delete')) {
            setLoading(true)
            console.log('requested', slug, user.token);

            deleteProduct(slug, user.token)
                .then((res) => {
                    LoadAllProducts()
                    setLoading(false)
                    console.log(res);
                    toast.success("Product Deleted")

                }).catch(err => {
                    console.log(err);
                    toast.error(err.message)
                })
        }
    }

    return (
        <div className="continer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? <h4 className='text-danger'>Loading Products ...</h4> : <h4>Products</h4>}
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4">
                                <AdminProducts product={product} handleRemoveProduct={handleRemoveProduct} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className='col'>{JSON.stringify(products)}</div> */}
            </div>
        </div>
    )
}

export default AllProducts