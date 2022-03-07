const userReducer = (state = null, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return action.payload
        case "LOGGED_OUT_USER":
            return action.payload
        default:
            return state
    }

}

export default userReducer