import axios from "axios";

export const createOrder = async (authToken, stripeResponse) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/user/order`,
        { stripeResponse },
        {
            headers: {
                authToken
            }
        }
    )
}


export const getOrders = async (authToken) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/user/orders`,
        {
            headers: {
                authToken
            }
        }
    )
}


//get all orders on admin dashboard
export const getAllOrders = async (authToken) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/admin/orders`,
        {
            headers: {
                authToken
            }
        }
    )
}

//update the order status
export const UpdateOrderStatus = async (authToken, orderId, orderStatus) => {
    return await axios.put(`${process.env.REACT_APP_API_REQUEST}/admin/order-status`,
        { orderId, orderStatus },
        {
            headers: {
                authToken
            }
        }
    )
}

//cash on delivery
export const createCODorder = async (authToken, COD) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/order/cash-on-delivery`,
        { COD },
        {
            headers: {
                authToken
            }
        }
    )
}
