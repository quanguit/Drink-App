import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const Coupon = ({ icon, title, desc }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.left_circle} />
        <View style={styles.content}>
          <Image
            source={icon}
            style={{ width: 140, height: 140, marginBottom: 26 }}
          />
          <View style={{ marginTop: 4 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{desc}</Text>
          </View>
        </View>
        <View style={styles.right_circle} />
      </View>
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    backgroundColor: "#000000",
    borderRadius: 6,
    justifyContent: "center",
  },
  wrapper: {
    marginLeft: -30,
    marginRight: -30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },

  left_circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#F5F5F7",
  },
  right_circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#F5F5F7",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  description: {
    color: "#FFFFFF",
    fontSize: 10,
  },
});
