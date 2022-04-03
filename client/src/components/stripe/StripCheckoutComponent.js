import React, { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createStripIntent } from '../../functions/stripe';
import { Link } from 'react-router-dom'
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { createOrder } from '../../functions/order';
import { removeCart } from '../../functions/cart';


const StripCheckoutComponent = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)

    const [cartTotal, setCartTotal] = useState(0);
    const [payable, setPayable] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)

    const { user, couponSate } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // console.log(user.token);
        createStripIntent(user.token, couponSate)
            .then((res) => {
                console.log("payment intent==>", res);
                console.log(res.data);
                setClientSecret(res.data.clientSecret)

                setCartTotal(res.data.cartTotal);
                setPayable(res.data.payable);
                setTotalAfterDiscount(res.data.cartTotalAfterDiscount)
                console.log(res.data.cartTotal);
            }).catch((err) => {
                console.log(err);
            })
    }, [])


    //submite the payment
    const handleSubmite = async (e) => {
        e.preventDefault()
        setProcessing(true)

        // console.log(clientSecret);



        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }

            }
        })
        //check the payment if its success or got any error 
        if (payload.error) {
            // console.log(payload.error);
            setProcessing(false)
            setError(`Pyament Faild ${payload.error.message}`)
        } else {      //if customer success in payment
            //here get the result successfull result
            //create ordre and save in database for admin to process
            // empty the cart from local storage and redux state

            console.log(JSON.stringify(payload, null, 4));

            //create new order save in database
            createOrder(user.token, payload)
                .then((res) => {
                    if (res.data.success) {
                        //empty the cart from local storage
                        if (typeof window !== "undefined") {
                            localStorage.removeItem('cart')
                        }

                        //empty the cart from redux
                        dispatch({
                            type: 'ADD_TO_CART',
                            payload: []
                        })

                        //reset coupon to false
                        dispatch({
                            type: 'COUPON_STATE',
                            payload: false
                        })

                        //empty the cart from database
                        removeCart(user.token)
                            .then((res) => {
                                console.log(res);
                                console.log("Cart Removed");
                            }).catch((err) => {
                                console.log(err);
                            })





                    }
                }).catch((err) => {
                    console.log(err);
                    console.log(err.response);
                })
            setProcessing(false)
            setError(null);
            setSucceeded(true)

        }


    }


    const handleChange = (e) => {

        //listen for changing in elementCard
        setDisabled(e.empty) //disable pay button if error
        //and display the error if the customer give invalid card
        setError(e.error ? e.error.message : "") //show the error message

    }



    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            <p className={succeeded ? "result-message" : "result-message hidden"}>Payment Successful.<Link to='/user/history'>See in your purchase history</Link></p>

            {!succeeded &&
                <div>
                    {couponSate && totalAfterDiscount !== undefined ?
                        (<div className='alert alert-success'>{`Total Price After Discount: ${totalAfterDiscount}`} </div>)
                        :
                        (<div className='alert alert-danger'> No Coupon Applied...</div>)}
                </div>
            }

            <form id='payment-form' className='stripe-form' onSubmit={handleSubmite}>
                <div className="text-center pb-5">
                    <Card
                        cover={
                            <img
                                src='https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGF5bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                                alt="laptop"
                                style={{
                                    height: '200px',
                                    objectFit: 'cover',
                                    marginBottom: '-50px',
                                }}
                            />
                        }
                        actions={[
                            <>
                                <DollarOutlined className='text-info' />
                                <br /> Total: $
                                {cartTotal}
                            </>,
                            <>
                                <CheckOutlined className='text-info' />
                                <br /> Total after Discount: $
                                {(payable / 100).toFixed(2)}
                            </>

                        ]}
                    >

                    </Card>
                </div>
                <CardElement
                    id='card-element'
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button className='stripe-button'
                    disabled={processing || disabled || succeeded}
                >
                    <span id='button-text'>
                        {processing ? <div className='spinner' id='spinner'></div> : "Pay"}
                    </span>
                </button>
                {error && <div className='card-error pt-2'> {error}</div>}
            </form>

        </>
    )
}

export default StripCheckoutComponent