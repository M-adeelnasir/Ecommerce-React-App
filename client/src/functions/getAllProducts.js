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

export const updateProduct = async (slug, product, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API_REQUEST}/product/update/${slug}`, product,
        {
            headers: {
                authToken
            }
        }
    )
}