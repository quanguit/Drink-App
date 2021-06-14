import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducers";
import userReducer from "./user/user.reducers";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
