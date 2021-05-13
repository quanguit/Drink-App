export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    // hàm filter dùng để xóa sp
    return cartItems.filter(
      (cartItem) => cartItem._id !== cartItemToRemove._id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems, item) => {
  return cartItems.filter((cartItem) => cartItem._id !== item._id);
};

export const addItemToCartFavorite = (cartItems, item) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === item._id
  );

  if (existingCartItem) {
    return cartItems.filter((cartItem) => cartItem._id !== item._id);
  }

  return [...cartItems, { ...item, like: true, quantity: 1 }];
};
