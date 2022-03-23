const textReducer = (state = { text: "" }, action) => {
    switch (action.type) {
        case "SEARCH_QUERY":
            return { ...state, ...action.payload }  // if we have more then state then we spread out the state and ation paload e.g if (state={text:"", submites:"" ,filter :" "} )
        default:
            return state
    }
}

export default textReducer;