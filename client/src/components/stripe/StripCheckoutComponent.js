import React, { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createStripIntent } from '../../functions/stripe';

const StripCheckoutComponent = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, serError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState("")

    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        console.log(user.token);
        createStripIntent(user.token)
            .then((res) => {
                console.log(res.data);
                setClientSecret(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])


    //submite the payment
    const handleSubmite = (e) => {
        e.preventDefault()
    }


    const handleChange = (e) => {

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
            <form id='payment-form' className='stripe-form' onSubmit={handleSubmite}>
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
            </form>
        </>
    )
}

export default StripCheckoutComponent