import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import { createCoupon, removeCoupon, listCoupon } from '../../../functions/coupon';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


const CouponPage = () => {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState(new Date())
    const [discount, setDiscount] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    const handleSubmiteCoupon = (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(name, discount, expiry);

        createCoupon(user.token, { name, discount, expiry })
            .then((res) => {
                setLoading(false)
                // console.log(res.data.data);

                setName('')
                setExpiry('')
                setDiscount('')
                toast.success('Coupon is Created')
            }).catch((err) => {
                setLoading(false)
                // console.log(err.response.data.data);
                toast.error(`${err.response.data.data}`)
            })
    }


    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col-md-10">
                        <h4 className='pt-2 mt-2'>Coupon</h4>

                        <form className='form-group' onSubmit={handleSubmiteCoupon}>
                            <input type="text" className='form-control border-top-0 border-left-0 border-right-0 shadow-none rounded-0 col-md-8 mb-3 mb-3' placeholder='Coupon Name' autoFocus required value={name} onChange={(e) => setName(e.target.value)} />



                            <input type="number" className='form-control border-top-0 border-left-0 border-right-0 shadow-none rounded-0 col-md-8 mb-3 mb-3' placeholder='Discount %' value={discount} onChange={(e) => setDiscount(e.target.value)} />

                            {/* <label className='text-muted'>Expiry Date</label> */}


                            <div className="form-group">
                                <DatePicker
                                    selected={expiry}
                                    className="form-control border-top-0 border-left-0 border-right-0 shadow-none rounded-0 col-md-8 mb-3 mb-3"
                                    onChange={(date) => setExpiry(date)}
                                    required
                                    placeholderText='Expiry Date'
                                />
                            </div>

                            <button className='btn btn-outline-success' type='submit' onClick={handleSubmiteCoupon}>Save</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponPage