import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { auth } from "../firebase/firebase";
import Header from "../component/bar/header";
import { useSelector } from "react-redux";
import { COLORS } from "../containts/theme";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useSelector(mapState);
  const { displayName, email, phone, address } = currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("../../assets/images/avatar.png")}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {displayName}
            </Title>
            <Caption style={styles.caption}>@{displayName}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <View style={styles.menuItem}>
            <AntDesign name="edit" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="email" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>{email}</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="phone" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>{phone}</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="map-marker-radius" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>{address}</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>

      <TouchableRipple
        style={styles.commandButton}
        onPress={() => auth.signOut()}
      >
        <Text style={styles.buttonTitle}>Sign Out</Text>
      </TouchableRipple>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    flex: 1,
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    color: "green",
    marginTop: 20,
  },
  shareButton: {
    marginTop: 25,
    height: 50,
    marginHorizontal: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "green",
  },
  shareButtonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: COLORS.white,
  },
});
