import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartUnliked = createSelector(
  [selectCart],
  (cart) => cart.unLiked
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);
