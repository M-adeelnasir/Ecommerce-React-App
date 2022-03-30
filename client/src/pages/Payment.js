import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

//load strip outside components render to avoid recreating strip object on every render
const stripePromise = loadStripe(process.env.STRIP_PUBLISHABLE_KEY);

const Payment = () => {
    return (
        <div className='container p-5 text-center'>
            <h4>Complete Your Purchase</h4>
            <Elements stripe={stripePromise}>
                <div className="col-md-8 offset-md-2">
                    <p>Strip checkout component</p>
                </div>
            </Elements>
        </div>
    )
}

export default Payment