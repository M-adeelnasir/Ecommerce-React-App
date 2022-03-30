import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import { createCoupon, removeCoupon, listCoupon } from '../../../functions/coupon';
import { DeleteOutlined } from '@ant-design/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


const CouponPage = () => {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState(new Date())
    const [discount, setDiscount] = useState('')
    const [loading, setLoading] = useState(false)

    const [coupons, setCoupons] = useState([])

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
                loadCoupons()
                toast.success('Coupon is Created')
            }).catch((err) => {
                setLoading(false)
                // console.log(err.response.data.data);
                toast.error(`${err.response.data.data}`)
            })
    }


    //get All coupons
    const loadCoupons = () => {
        setLoading(true)
        listCoupon()
            .then((res) => {
                // console.log(res.data.data);
                setCoupons(res.data.data)
                setLoading(false)

            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }

    useEffect(() => {
        loadCoupons()
    }, [])


    //delete coupon
    const hanldeDeleteCoupon = (couponId) => {
        setLoading(true)
        if (window.confirm("Delete Coupon")) {
            removeCoupon(user.token, couponId)
                .then((res) => {
                    setLoading(false)
                    loadCoupons()
                    toast.success("Coupon Deleted")
                }).catch((err) => {
                    setLoading(false)
                    console.log(err);
                })
        }

    }


    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col-md-10">
                        {loading ? <h4 className='pt-2 mt-2 ext-danger'>Loading...</h4> : <h4 className='pt-2 mt-2'> Create Coupon</h4>}

                        <form className='form-group mb-3' onSubmit={handleSubmiteCoupon}>
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
                        <br />

                        <h4>{coupons.length} -Coupons</h4>
                        <table className='table table-bordered table-sm table-hover col-md-8'>
                            <thead className='thead-light'>
                                <tr>
                                    <th className='text-center' scope='col'>Name</th>
                                    <th className='text-center' scope='col'>Discount %</th>
                                    <th className='text-center' scope='col'>Expiry Date</th>
                                    <th className='text-center' scope='col'>Dalete Coupon</th>
                                </tr>
                            </thead>

                            <tbody>
                                {coupons.map((c) => <tr key={c._id}>
                                    <td className='text-center' >{c.name}</td>
                                    <td className='text-center' >{c.discount}%</td>
                                    <td className='text-center' >{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td className='text-center'><DeleteOutlined className='text-danger cursor' onClick={() => hanldeDeleteCoupon(c._id)} /></td>
                                </tr>)}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponPage