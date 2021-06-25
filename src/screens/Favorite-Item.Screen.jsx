import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import FavoriteUserScreen from "./FavoriteUser.Screen";
import FavoriteNoUserScreen from "./FavoriteNoUser.Screen";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const FavoriteItemScreen = () => {
  const { currentUser } = useSelector(mapState);
  return (
    <NavigationContainer independent={true}>
      {currentUser ? <FavoriteUserScreen /> : <FavoriteNoUserScreen />}
    </NavigationContainer>
  );
};

export default FavoriteItemScreen;
