import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import FavoriteItem from "../component/favorite-item/favorite-item";
import { COLORS, FONTS } from "../containts/theme";
import {
  selectCartItemsFavorite,
  selectCartItemsCount,
} from "../redux/cart/cart.selectors.js";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Header from "../component/bar/header";

const FavoriteItemScreen = ({ cartItemsFavorite, cartItemsCount }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <FlatList
          data={cartItemsFavorite}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item, index) => `${item.product_id}`}
          renderItem={({ item }) => <FavoriteItem cartItem={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 25, marginTop: 20 }}
          ListFooterComponent={() => {
            if (cartItemsCount === 0) {
              return (
                <View>
                  <Text style={styles.textError}>
                    You haven't logged into your account yet !
                  </Text>
                </View>
              );
            } else {
              return null;
            }
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItemsFavorite: selectCartItemsFavorite,
  cartItemsCount: selectCartItemsCount,
});

export default connect(mapStateToProps)(FavoriteItemScreen);

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
