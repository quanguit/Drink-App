import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import FavoriteItem from "../component/favorite-item/favorite-item";
import Header from "../component/bar/header";
import { firestore } from "../firebase/firebase";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const FavoriteUserScreen = () => {
  const [cartLiked, setCartLiked] = useState([]);
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    getCartLiked();
  }, [cartLiked]);

  const getCartLiked = async () => {
    try {
      const userRef = firestore.doc(`user/${currentUser.id}`);
      let likeList = (await userRef.get()).data().Likes;
      setCartLiked(likeList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={cartLiked}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item, index) => `${item.product_id}`}
          renderItem={({ item }) => <FavoriteItem cartItem={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 25, marginTop: 20 }}
          ListFooterComponent={() => {
            if (cartLiked.length === 0) {
              return (
                <View>
                  <Text style={styles.textError}>
                    You haven't liked anything yet. Let's like something !
                  </Text>
                </View>
              );
            } else {
              return null;
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteUserScreen;

const styles = StyleSheet.create({
  textError: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
