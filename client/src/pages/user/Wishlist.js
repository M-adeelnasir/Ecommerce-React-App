import React, { useState, useEffect } from 'react'
import UserNav from '../../components/nav/UserNav'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWishlist, removeFromWishlist } from '../../functions/auth'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    const loadWhishlist = () => {
        getWishlist(user.token)
            .then((res) => {
                console.log(res.data.data.wishlist);
                // console.log(JSON.stringify(res, null, 4));
                // console.log(res.data.data.wishlist);
                setWishlist(res.data.data.wishlist)

            }).catch(err => console.log())
    }

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(user.token, productId)
            .then((res) => {
                console.log(res.data);
                loadWhishlist()
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        loadWhishlist()
    }, [])

    return (
        <>
            <div className="continer-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col  mt-3">
                        <h4>Wishlist</h4>
                        {wishlist.map((product) => (
                            <div key={product._id} className='alert alert-secondary'>
                                <Link to={`/product/${product.slug}`}>{product.title}</Link>
                                <span onClick={() => handleRemoveFromWishlist(product._id)} className='btn btn-sm float-right m-0'>

                                    <i className="fa fa-trash-o text-danger"></i>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist