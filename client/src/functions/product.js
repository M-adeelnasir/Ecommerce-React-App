import axios from "axios";


//create request to backend,
const createProduct = async (product, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API_REQUEST
        }/product`,
        product,
        {
            headers: {
                authToken
            }
        }
    )
}

export default createProduct