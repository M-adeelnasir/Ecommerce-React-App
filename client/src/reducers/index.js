import { combineReducers } from "redux";
import userReducer from './userReducer.js'
import textReducer from "./textReducer.js";
import cartReducer from "./cartReducer.js";
import drawerReducer from "./drawerReducer.js";
const rootReducer = combineReducers({
    user: userReducer,
    search: textReducer,
    cart: cartReducer,
    drawer: drawerReducer

})
export default rootReducer