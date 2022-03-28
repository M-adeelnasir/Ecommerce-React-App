import React from 'react'

const CheckOutPage = () => {

    const handleCheckOut = () => {

    }


    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                textArea
                <button className='btn btn-primary mt-2' onClick={handleCheckOut}>Save</button>
                <hr />
                <h4>Got Coupon?</h4>
                <br />
                coupon input and apply button

            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products</p>
                <hr />
                <p>List of Products</p>
                <hr />
                <p>Cart Total :$</p>
                <div className="row">
                    <div className="col-md-6">
                        <button className='btn btn-primary '>Place Order</button>
                    </div>
                    <div className="col-md-6">
                        <button className='btn btn-primary '>Place Order</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage