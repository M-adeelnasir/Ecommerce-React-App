import axios from 'axios'


//create coupon
export const createCoupon = async (authToken, coupon) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/coupon`,
        { coupon },
        {
            headers: {
                authToken
            }
        }
    )
}

//delete coupon
export const removeCoupon = async (authToken, couponId) => {
    return await axios.delete(`${process.env.REACT_APP_API_REQUEST}/coupon`,
        {
            headers: {
                authToken
            }
        }
    )
}

// list Coupon
export const listCoupon = async () => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/coupons`)
}