import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import FavoriteUserScreen from "./FavoriteUser.Screen";
import FavoriteNoUserScreen from "./FavoriateNoUser.Screen";

const FavoriteItemScreen = ({ currentUser }) => {
  return (
    <NavigationContainer independent={true}>
      {currentUser ? (
        <FavoriteUserScreen currentUser={currentUser} />
      ) : (
        <FavoriteNoUserScreen />
      )}
    </NavigationContainer>
  );
};

export default FavoriteItemScreen;
