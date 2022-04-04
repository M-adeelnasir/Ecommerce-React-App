import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getAllOrders, UpdateOrderStatus } from '../../functions/order'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Orders from '../../components/order/Orders'

const Dashboard = () => {
    const [orders, setOrders] = useState([])
    const { user } = useSelector((state) => ({ ...state }))

    const loadOrders = () => {
        getAllOrders(user.token)
            .then((res) => {
                console.log(res.data.data);
                setOrders(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        loadOrders()
    }, [])

    const handleStatusChange = (orderId, orderStatus) => {
        UpdateOrderStatus(user.token, orderId, orderStatus)
            .then((res) => {
                console.log(res.data);
                toast.success("Status Updated")
                loadOrders()
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="continer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h1>Admin Dashboard</h1>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard