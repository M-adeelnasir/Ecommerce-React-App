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

//without Pagination
// export const getSortedProducts = async (sort, order, limit) => {
//     return await axios.post(`${process.env.REACT_APP_API_REQUEST}/products`,
//         {
//             sort,
//             order,
//             limit
//         }
//     )
// }


//with pagination
export const getSortedProducts = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/products`,
        {
            sort,
            order,
            page,
        }
    )
}

export const getProductCount = async () => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/products/total`)
}



//star rating route
export const productStar = async (productId, star, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API_REQUEST}/product/star/${productId}`,
        { star },
        {
            headers: {
                authToken
            }
        }
    )
}


//realted products
export const getRelatedProducts = async (productId) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/product/related/${productId}`)
}


//text search
export const getProductOnSearch = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/products/search/filters`, arg)
}