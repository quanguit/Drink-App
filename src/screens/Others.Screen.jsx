import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "./Profile.Screen";
import SignInAndSignUpScreen from "./SignInAndSignUp.Screen";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const OthersScreen = () => {
  const { currentUser } = useSelector(mapState);
  return (
    <NavigationContainer independent={true}>
      {currentUser ? <ProfileScreen /> : <SignInAndSignUpScreen />}
    </NavigationContainer>
  );
};

export default OthersScreen;
