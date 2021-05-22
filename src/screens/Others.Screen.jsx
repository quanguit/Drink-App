import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../component/bar/header";
import ProfileScreen from "./Profile.Screen";
import SignInAndSignUpScreen from "./SignInAndSignUp.Screen";

const OthersScreen = ({ currentUser }) => {
  return (
    <NavigationContainer independent={true}>
      {currentUser ? (
        <View>
          <Header />
          <ProfileScreen currentUser={currentUser} />
        </View>
      ) : (
        <SignInAndSignUpScreen />
      )}
    </NavigationContainer>
  );
};

export default OthersScreen;
