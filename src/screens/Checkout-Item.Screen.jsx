import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import CheckoutItem from "../component/checkout-item/checkout-item";
import { COLORS, FONTS } from "../containts/theme";
import { selectCartItems } from "../redux/cart/cart.selectors.js";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const CheckoutScreen = ({ cartItems }) => {
  console.log(cartItems);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Ordered</Text>
        </View>
        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.product_id}`}
          renderItem={({ item }) => <CheckoutItem cartItem={item} />}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    height: 80,
  },

  headerName: {
    ...FONTS.h1,
    marginLeft: 10,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

export default connect(mapStateToProps)(CheckoutScreen);
