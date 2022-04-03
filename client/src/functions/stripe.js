import axios from "axios";

export const createStripIntent = async (authToken, couponSate) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/create-strip-intent`,
        { couponApplied: couponSate },
        {
            headers: {
                authToken
            }
        }
    )
}