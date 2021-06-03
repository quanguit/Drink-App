import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { COLORS } from "../../containts/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;

  return (
    <View style={styles.cartCard}>
      <Image source={imageUrl} style={{ height: 80, width: 80 }} />
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}đ</Text>
      </View>
      <View style={{ marginRight: "auto", alignItems: "center" }}>
        <Text style={styles.number}>{quantity}</Text>
        <View style={styles.actionBtn}>
          <AntDesign
            name="plus"
            size={20}
            color={COLORS.white}
            onPress={() => addItem(cartItem)}
          />
          <Text style={styles.divider}>|</Text>
          <AntDesign
            name="minus"
            size={20}
            color={COLORS.white}
            onPress={() => removeItem(cartItem)}
          />
        </View>
        <AntDesign
          name="delete"
          size={20}
          color={COLORS.black}
          onPress={() => clearItem(cartItem)}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

const styles = StyleSheet.create({
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray3,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
    color: COLORS.lightGray,
  },
  number: {
    fontWeight: "bold",
    fontSize: 18,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    height: 100,
    marginLeft: 10,
    paddingVertical: 20,
    flex: 1,
  },
  divider: {
    paddingHorizontal: 7,
    color: COLORS.white,
  },
});
