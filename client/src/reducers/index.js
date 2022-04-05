import { combineReducers } from "redux";
import userReducer from './userReducer.js'
import textReducer from "./textReducer.js";
import cartReducer from "./cartReducer.js";
import drawerReducer from "./drawerReducer.js";
import couponReducer from "./couponReducer.js";
import CODReducer from "./CODReducer.js";
const rootReducer = combineReducers({
    user: userReducer,
    search: textReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    couponSate: couponReducer,
    CODstate: CODReducer

})
export default rootReducer