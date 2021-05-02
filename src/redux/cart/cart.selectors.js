import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartItemsFavorite = createSelector(
  [selectCart],
  (cart) => cart.cartItemsFavorite
);

export const selectCartItemsCount = createSelector(
  [selectCartItemsFavorite],
  (cartItemsFavorite) =>
    cartItemsFavorite.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
