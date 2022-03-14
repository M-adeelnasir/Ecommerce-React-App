import axios from "axios";

//get the list of all categories
export const getCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/categories`)
}

//create a single category
export const createCategory = async (category, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/category/`, category,
        {
            headers: {
                authToken
            }
        }
    )
}

//get a single category
export const getSingleCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/category/${slug}`)
}

export const updateSingleCategory = async (slug, category, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API_REQUEST}/category/${slug}`, category,
        {
            headers: {
                authToken
            }
        }
    )
}


export const deleteCategory = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API_REQUEST}/category/${slug}`,
        {
            headers: {
                authToken
            }
        }
    )
}


export const getSubCat = async (_id) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/category/subs/${_id}`)
}