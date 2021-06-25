import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Header from "../component/bar/header";

const FavoriteNoUserScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Text style={styles.textError}>
        You haven't logged into your account yet !
      </Text>
    </SafeAreaView>
  );
};

export default FavoriteNoUserScreen;

const styles = StyleSheet.create({
  textError: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
