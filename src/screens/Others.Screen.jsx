import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "./Profile.Screen";
import SignInAndSignUpScreen from "./SignInAndSignUp.Screen";

const OthersScreen = ({ currentUser }) => {
  return (
    <NavigationContainer independent={true}>
      {currentUser ? (
        <ProfileScreen currentUser={currentUser} />
      ) : (
        <SignInAndSignUpScreen />
      )}
    </NavigationContainer>
  );
};

export default OthersScreen;
