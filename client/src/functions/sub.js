import axios from "axios";

//get all subs
export const getSubs = async () => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST
        }/subs`)
}


//create sub
export const createSub = async (sub, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST
        }/sub`,
        sub,
        {
            headers: {
                authToken
            }
        }
    )
}

//update sub
export const updateSub = async (slug, sub, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API_REQUEST
        }/sub/${slug}`,
        sub,
        {
            headers: {
                authToken
            }
        }
    )
}


//get a single category
export const getSingleSub = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/sub/${slug}`)
}


// delete sub
export const deleteSub = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API_REQUEST}/sub/${slug}`, {
        headers: {
            authToken
        }
    })
}