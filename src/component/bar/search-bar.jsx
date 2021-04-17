import React from "react";
import { View, StyleSheet, TextInput, SafeAreaView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS, SIZES } from "../../containts/theme";

const SearchBar = ({ handleChange }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.viewContainer}>
      <View style={styles.view}>
        <AntDesign name="search1" style={{ fontSize: 24 }} />
        <TextInput
          placeholder="Search"
          style={{ fontSize: 24, marginLeft: 15 }}
          onChangeText={handleChange}
        />
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  viewContainer: {
    height: 80,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  view: {
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
