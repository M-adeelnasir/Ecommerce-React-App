const couponReducer = (state = false, action) => {
    switch (action.type) {
        case "COUPON_STATE":
            return action.payload
        default:
            return state
    }
}

export default couponReducer