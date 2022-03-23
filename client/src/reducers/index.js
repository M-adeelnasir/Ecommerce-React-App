import { combineReducers } from "redux";
import userReducer from './userReducer.js'
import textReducer from "./textReducer.js";
const rootReducer = combineReducers({
    user: userReducer,
    search: textReducer

})
export default rootReducer