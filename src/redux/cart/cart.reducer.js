import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  filterItemFromCart,
  removeItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
  unLiked: true,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_UNLIKED:
      return {
        ...state,
        unLiked: !state.unLiked,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: filterItemFromCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;