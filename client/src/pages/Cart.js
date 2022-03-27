import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TableItemsCard from '../components/products/TableItemsCard'

const Cart = () => {

    const { user, cart } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()


    const showTotal = () => {
        return cart.reduce((previousValue, nextValue) => {
            return previousValue + nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {

    }

    //product Table

    const productTable = () =>
        <>
            <table className='table table-bordered'>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>

                {cart.map((p) => (
                    <TableItemsCard key={p._id} p={p} />
                ))}
            </table>
        </>



    return (
        <>
            <div className="container-fluid pt-2">
                <div className="row p-1">
                    <h4 className='pr-2 h2'>Cart / {cart.length}</h4>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {!cart.length ?
                            (<p>No products in Cart. <Link to='/shop'>Shop Now</Link></p>)
                            :
                            (productTable())
                        }
                    </div>
                    <div className="col-md-4">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Products</p>
                        {cart.map((c, i) => (
                            <div key={i}>
                                <p>{c.title} X {c.count} =${c.price * c.count}</p>
                            </div>
                        ))}
                        <hr />
                        Total  : <b>${showTotal()}</b>
                        <hr />
                        {user ? <button
                            onClick={saveOrderToDb}
                            // disabled={!cart.length}
                            className='btn btn-sm btn-primary mt-2'
                        >
                            Proceed To Checkout
                        </button>
                            :

                            <Link className='btn btn-sm btn-primary mt-2' to={{
                                pathname: '/login',
                                state: { from: 'cart' }
                            }}>
                                Login to Checkout
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default Cart