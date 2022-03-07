import axios from 'axios';

//LETS MAKE HTTP POST REQUEST TO OUR BACKEND SETTING HEADERS
export const createOrUpdate = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST}/create-or-update-user`, {}, {
        headers: {
            authToken
        }
    })
}