import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignIn.Screen";
import SignUpScreen from "./SignUp.Screen";

const SignInAndSignUp = createStackNavigator();

const SignInAndSignUpScreen = () => (
  <SignInAndSignUp.Navigator headerMode="none">
    <SignInAndSignUp.Screen name="SignInScreen" component={SignInScreen} />
    <SignInAndSignUp.Screen name="SignUpScreen" component={SignUpScreen} />
  </SignInAndSignUp.Navigator>
);

export default SignInAndSignUpScreen;
