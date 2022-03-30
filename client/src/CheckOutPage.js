import React, { useState, useEffect } from 'react'
import { getCart } from './functions/cart'
import { useSelector, useDispatch } from 'react-redux'
import { removeCart, userAddress } from './functions/cart'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const CheckOutPage = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')

    //just to confirm
    const [addressSaved, setAddressSaved] = useState(false)

    const [coupon, setCoupon] = useState('')

    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()


    useEffect(() => {
        getCart(user.token)
            .then((res) => {
                // console.log(res.data.data);

                setProducts(res.data.data.products)
                setTotal(res.data.data.cartTotal)

            }).catch(err => console.log(err))
    }, [])

    const handleRemoveCart = () => {


        //remove from local storage
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart")
        }

        //remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: []
        })

        //remove from database
        removeCart(user.token)
            .then((res) => {
                console.log(res);
                setProducts([])
                setTotal(0)
                toast.success("Cart is Empty, Countinue Shopping")
            }).catch(err => console.log(err))


    }



    const handleAddress = () => {
        // console.log("address =>", address);
        userAddress(user.token, address)
            .then((res) => {
                console.log(res);
                console.log(res.data.data);
                //just to make confirm that addres is saved in db
                if (res.data.success) {
                    setAddressSaved(true);
                    toast.success("Address Saved")
                }

            }).catch(err => console.log(err))
    }


    //apply coupon 
    const handleApplyCoupon = () => {
        console.log("Coupon send to server==>", coupon);
    }


    return (
        <div className="row">
            <div className="col-md-6" >
                <div className='m-3'>
                    <h4>Delivery Address</h4>
                    <br />
                    <ReactQuill theme='snow' value={address} onChange={setAddress} />
                    <button className='btn btn-primary mt-2' onClick={handleAddress}>Save</button>
                    <hr />
                    <h4>Got Coupon?</h4>
                    <br />

                    <input type="text"
                        className='form-control border-top-0 border-left-0 border-right-0 shadow-none rounded-0 col-md-8'
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Apply Coupon"
                    />
                    <button className='btn btn-info m-2' onClick={handleApplyCoupon}>Apply</button>
                </div>


            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {products.map((p, i) => (
                    <div key={i}>
                        <p>{p.product.title} ({p.color}) X {p.count} = ${p.product.price}</p>
                    </div>

                ))}
                <hr />
                <p>Cart Total :${total}</p>
                <div className="row">
                    <div className="col-md-6">
                        <button disabled={!addressSaved || !products.length} className='btn btn-primary '>Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button disabled={!products.length} onClick={handleRemoveCart} className='btn btn-primary '>Remove Cart</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage