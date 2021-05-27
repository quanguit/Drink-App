import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  filterItemFromCart,
  removeItemFromCart,
  addItemToCartFavorite,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
  cartItemsFavorite: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case CartActionTypes.ADD_ITEM_TO_FAVORITE:
      return {
        ...state,
        cartItemsFavorite: addItemToCartFavorite(
          state.cartItemsFavorite,
          action.payload
        ),
      };
    case CartActionTypes.REMOVE_ITEM_FROM_FAVORITE:
      return {
        ...state,
        cartItemsFavorite: filterItemFromCart(
          state.cartItemsFavorite,
          action.payload
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
