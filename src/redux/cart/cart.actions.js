import CartActionTypes from "./cart.types";

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const addItemToFavorite = (item) => ({
  type: CartActionTypes.ADD_ITEM_TO_FAVORITE,
  payload: item,
});

export const removeItemFromFavorite = (item) => ({
  type: CartActionTypes.REMOVE_ITEM_FROM_FAVORITE,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});
