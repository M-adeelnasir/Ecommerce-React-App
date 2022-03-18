import axios from "axios";

export const getAllProducts = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/products/${count}`)
}


export const deleteProduct = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API_REQUEST}/product/delete/${slug}`,
        {
            headers: {
                authToken
            }
        }
    )
}

export const getSingleProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/product/${slug}`)
}