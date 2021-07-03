import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../containts/theme";

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerName}>Giangnam Coffee</Text>
      </View>
    </View>
  );
};

export default Header;

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
  headerName1: {
    fontWeight: "bold",
    color: COLORS.white,
    position: "absolute",
    top: 30,
    right: 10,
  },
});
