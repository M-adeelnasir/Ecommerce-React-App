import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import '../stripe.css'
import StripCheckoutComponent from '../components/stripe/StripCheckoutComponent';

//load strip outside components render to avoid recreating strip object on every render
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIP_PUBLISHABLE_KEY}`);

const Payment = () => {
    console.log(stripePromise);
    return (
        <div className='container p-5 text-center'>
            <h4>Complete Your Purchase</h4>
            <Elements stripe={stripePromise}>
                <div className="col-md-8 offset-md-2">
                    <StripCheckoutComponent />
                </div>
            </Elements>
        </div>
    )
}

export default Payment