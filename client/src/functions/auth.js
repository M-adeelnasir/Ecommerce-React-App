import axios from 'axios';

//LETS MAKE HTTP POST REQUEST TO OUR BACKEND SETTING HEADERS
export const createOrUpdate = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/create-or-update-user`, {}, {
        headers: {
            authToken
        }
    })
}

//request the current user
export const currenUser = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/current-user`, {}, {
        headers: {
            authToken
        }
    })
}

//request the current user
export const currentAdmin = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/current-admin`, {}, {
        headers: {
            authToken
        }
    })
}



//add to wishlist
export const addToWishlist = async (authToken, productId) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/user/wishlist`,
        { productId },
        {
            headers: {
                authToken
            }
        }
    )
}

//get wishlist
export const getWishlist = async (authToken) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/user/wishlist`,
        {
            headers: {
                authToken
            }
        }
    )
}

//remove from wishlist
export const removeFromWishlist = async (authToken, productId) => {
    return await axios.put(`${process.env.REACT_APP_API_REQUEST}/user/wishlist/${productId}`,
        {},
        {
            headers: {
                authToken
            }
        }
    )
}