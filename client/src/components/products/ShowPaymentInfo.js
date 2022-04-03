import React from 'react'

const ShowPaymentInfo = ({ order }) => {
    return (
        <div>
            <p>
                <span>Order Id: {order.paymentIntent.id}</span>{" / "}

                <span>Amount: {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
                    style: 'currency',
                    currency: 'USD'

                })}</span>{" / "}

                <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{" / "}
                <span>Method: {order.paymentIntent.payment_method_types[0]}</span>{" / "}
                <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{" / "}

                <span>Order on {" / "} {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>
                <br />
                <span className='badge bg-success text-white p-2'>Order Stauts: {order.orderStatus}</span>
            </p>
        </div>
    )
}

export default ShowPaymentInfo