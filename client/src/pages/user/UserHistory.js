import React, { useState, useEffect } from 'react'
import UserNav from '../../components/nav/UserNav'
import { getOrders } from '../../functions/order'
import { useSelector, useDispatch } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ShowPaymentInfo from '../../components/products/ShowPaymentInfo'


const UserHistory = () => {
    const [orders, setOrders] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    const loadOrders = () => {
        getOrders(user.token)
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


    const showOrderInTable = (order) => <table className='table table-bordered'>
        <thead className='thead-light'>
            <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Price</th>
                <th scope='col'>Brand</th>
                <th scope='col'>Color</th>
                <th scope='col'>Count</th>
                <th scope='col'>Shipping</th>
            </tr>
        </thead>
        <tbody>
            {order.products.map((p, i) => (
                <tr key={i}>
                    <td><b>{p.product.title}</b></td>
                    <td><b>{p.product.price}</b></td>
                    <td><b>{p.product.brand}</b></td>
                    <td><b>{p.product.color}</b></td>
                    <td><b>{p.count}</b></td>
                    <td><b>{p.product.shipping === "Yes" ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}</b></td>
                </tr>
            ))}
        </tbody>
    </table>

    const showEachOrder = () => orders.map((order, i) => {
        return (
            <div key={i} className='m-5 p-3 card'>
                <p> <ShowPaymentInfo order={order} /></p>
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">
                        <p>Download PDF</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="continer-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col text-center">
                        <h4>
                            {orders.length > 0 ? "User Purchase Orders" : <p> No purchase yet  <Link to='/shop'>Shop Now</Link></p>}
                        </h4>

                        {showEachOrder()}
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserHistory