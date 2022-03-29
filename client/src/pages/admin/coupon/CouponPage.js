import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CouponPage = () => {
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col-md-10">
                        Coupon page
                    </div>
                </div>
            </div>
        </>
    )
}

export default CouponPage