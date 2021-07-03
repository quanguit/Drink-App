export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.product_id === cartItemToAdd.product_id &&
      cartItem.size === cartItemToAdd.size
  );
  // console.log(existingCartItem);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.product_id === cartItemToAdd.product_id &&
      cartItem.size === cartItemToAdd.size
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  if (cartItemToAdd.size === "L") {
    return [
      ...cartItems,
      { ...cartItemToAdd, quantity: 1, price: cartItemToAdd.price + 5000 },
    ];
  } else if (cartItemToAdd.size === "S") {
    return [
      ...cartItems,
      { ...cartItemToAdd, quantity: 1, price: cartItemToAdd.price - 5000 },
    ];
  } else {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.product_id === cartItemToRemove.product_id &&
      cartItem.size === cartItemToRemove.size
  );

  if (existingCartItem.quantity === 1) {
    // hàm filter dùng để xóa sp
    return cartItems.filter((cartItem) =>
      cartItem.product_id === cartItemToRemove.product_id &&
      cartItem.size === cartItemToRemove.size
        ? (cartItem.product_id === cartItemToRemove.product_id &&
            cartItem.size !== cartItemToRemove.size) ||
          cartItem.product_id !== cartItemToRemove.product_id
        : cartItem
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.product_id === cartItemToRemove.product_id &&
    cartItem.size === cartItemToRemove.size
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems, item) => {
  return cartItems.filter((cartItem) =>
    cartItem.product_id === item.product_id && cartItem.size === item.size
      ? (cartItem.product_id === item.product_id &&
          cartItem.size !== item.size) ||
        cartItem.product_id !== item.product_id
      : cartItem
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
    likesList.push({ ...item, colorful: true });
  }
  return likesList;
};

export const removeCartFavorite = (likesList, item) => {
  likesList = likesList.filter(
    (cartItem) => cartItem.product_id !== item.product_id
  );
  return likesList;
};
