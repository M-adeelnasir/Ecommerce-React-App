import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {

    const { user, cart } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()


    const showTotal = () => {
        return cart.reduce((previousValue, nextValue) => {
            return previousValue + nextValue.count * nextValue.price
        }, 0)
    }

    return (
        <>
            <div className="container-fluid pt-2">
                <div className="row p-1">
                    <h4>Cart / {cart.length}</h4>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {!cart.length ?
                            <p>No products in Cart. <Link to='/shop'>Shop Now</Link></p>
                            :
                            "Show Cart Item"
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
                        {user ? <button className='btn btn-sm btn-primary mt-2'>Checkout</button>
                            :
                            <button className='btn btn-sm btn-primary mt-2'>Login to Checkout </button>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default Cart