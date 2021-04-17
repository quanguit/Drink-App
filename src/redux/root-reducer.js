import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import categoryReducer from "./category/category.reducer";
import collectionReducer from "./collection/collection.reducer";

const rootReducer = combineReducers({
  category: categoryReducer,
  collection: collectionReducer,
  cart: cartReducer,
});

export default rootReducer;
