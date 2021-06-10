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

const FavoriteUserScreen = ({ currentUser }) => {
  const [cartLiked, setCartLiked] = useState([]);

  useEffect(() => {
    const getCartLiked = async () => {
      try {
        const userRef = firestore.doc(`user/${currentUser.id}`);
        let likeList = (await userRef.get()).data().Likes;
        setCartLiked(likeList);
      } catch (error) {
        console.log(error);
      }
    };
    getCartLiked();
  }, [cartLiked]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <FlatList
          data={cartLiked}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item, index) => `${item.product_id}`}
          renderItem={({ item }) => (
            <FavoriteItem cartItem={item} currentUser={currentUser} />
          )}
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
      </SafeAreaView>
    </ScrollView>
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
