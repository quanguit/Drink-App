export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product_id === cartItemToAdd.product_id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.product_id === cartItemToAdd.product_id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product_id === cartItemToRemove.product_id
  );

  if (existingCartItem.quantity === 1) {
    // hàm filter dùng để xóa sp
    return cartItems.filter(
      (cartItem) => cartItem.product_id !== cartItemToRemove.product_id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.product_id === cartItemToRemove.product_id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems, item) => {
  return cartItems.filter(
    (cartItem) => cartItem.product_id !== item.product_id
  );
};

export const addItemToCartFavorite = (likesList, item) => {
  const existingCartItem = likesList.find(
    (cartItem) => cartItem.product_id === item.product_id
  );
  if (existingCartItem) {
    likesList = likesList.filter(
      (cartItem) => cartItem.product_id !== item.product_id
    );
  } else {
    likesList.push(item);
  }
  return likesList;
};

export const removeCartFavorite = (likesList, item) => {
  return likesList.filter(
    (cartItem) => cartItem.product_id !== item.product_id
  );
};
