import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./Profile.Screen";
import EditProfileScreen from "./EditProfile.Screen";
import OrderedPaymentScreen from "./OrderedPayment.Screen";

const ProfileAndEdit = createStackNavigator();

const ProfileAndEditScreen = () => (
  <ProfileAndEdit.Navigator headerMode="none">
    <ProfileAndEdit.Screen name="ProfileScreen" component={ProfileScreen} />
    <ProfileAndEdit.Screen
      name="EditProfileScreen"
      component={EditProfileScreen}
    />
    <ProfileAndEdit.Screen
      name="OrderedPaymentScreen"
      component={OrderedPaymentScreen}
    />
  </ProfileAndEdit.Navigator>
);

export default ProfileAndEditScreen;
