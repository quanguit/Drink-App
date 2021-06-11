import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../containts/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { firestore } from "../../firebase/firebase";
import { removeCartFavorite } from "../../redux/cart/cart.utils";

const FavoriteItem = ({ cartItem, currentUser }) => {
  const { name, imageUrl } = cartItem;

  const removeFavorite = async (item) => {
    const userRef = firestore.doc(`user/${currentUser.id}`);
    let likesList = (await userRef.get()).data().Likes;
    try {
      await userRef.update({
        Likes: removeCartFavorite(likesList, item),
      });
    } catch (error) {
      console.log("Error remove item", error);
    }
  };

  return (
    <View style={styles.cartCard}>
      <Image source={imageUrl} style={{ height: 80, width: 80 }} />
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <TouchableOpacity>
        <AntDesign
          name="heart"
          size={20}
          color="#ff4d4d"
          style={{ marginRight: 10 }}
          onPress={() => removeFavorite(cartItem)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteItem;

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
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    height: 100,
    marginLeft: 10,
    paddingVertical: 35,
    flex: 1,
  },
});
