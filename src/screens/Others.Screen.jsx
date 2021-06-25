import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ProfileAndEditScreen from "./ProfileAndEdit.Screen";
import SignInAndSignUpScreen from "./SignInAndSignUp.Screen";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const OthersScreen = () => {
  const { currentUser } = useSelector(mapState);
  return (
    <NavigationContainer independent={true}>
      {currentUser ? <ProfileAndEditScreen /> : <SignInAndSignUpScreen />}
    </NavigationContainer>
  );
};

export default OthersScreen;
