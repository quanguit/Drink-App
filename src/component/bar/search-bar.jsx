import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS, SIZES } from "../../containts/theme";

const SearchBar = () => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <View style={styles.box2}>
        <AntDesign name="search1" style={{ fontSize: 24 }} />
        <TextInput
          placeholder="Search"
          style={{ fontSize: 24, marginLeft: 15 }}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    height: 80,
    backgroundColor: COLORS.primary,
    // "#c45653"
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  box2: {
    width: "100%",
    height: "50%",
    backgroundColor: COLORS.lightGray4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.radius,
  },
});

export default SearchBar;
