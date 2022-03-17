import axios from "axios";

export const getAllProducts = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API_REQUEST}/products/${count}`)
}

