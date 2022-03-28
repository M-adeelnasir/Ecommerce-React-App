import axios from "axios"


export const userCart = async (cart, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/user/cart`
        , { cart },
        {
            headers: {
                authToken
            }
        }
    )
}
