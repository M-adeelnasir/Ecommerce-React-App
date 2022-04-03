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