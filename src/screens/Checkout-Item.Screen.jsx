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
import {
  selectCartItems,
  selectCartTotal,
} from "../redux/cart/cart.selectors.js";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Header from "../component/bar/header";

const CheckoutScreen = ({ cartItems, total }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item, index) => `${item.product_id}`}
          renderItem={({ item }) => <CheckoutItem cartItem={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 25, marginTop: 20 }}
          ListFooterComponent={() => {
            if (total === 0) {
              return (
                <View>
                  <Text style={styles.textError}>
                    Your cart is empty. Let's order something !
                  </Text>
                </View>
              );
            } else {
              return (
                <View>
                  <View style={styles.cart}>
                    <Text style={styles.textSuccess}>Total</Text>
                    <Text style={styles.textSuccess}>{total}đ</Text>
                  </View>
                </View>
              );
            }
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
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
  cart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  textSuccess: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textError: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default connect(mapStateToProps)(CheckoutScreen);
