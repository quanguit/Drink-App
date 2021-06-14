import React from "react";
import { Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../screens/Home.Screen";
import CategoryScreen from "../../screens/Categories.Screen";
import CheckoutScreen from "../../screens/Checkout-Item.Screen";
import FavoriteItemScreen from "../../screens/Favorite-Item.Screen";
import OthersScreen from "../../screens/Others.Screen";
import DetailsScreen from "../../screens/Details.Screen.jsx";

import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { COLORS } from "../../containts/theme";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

// navigate dụa vào NAME
const toggleCategoryAndDetails = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Categories" component={CategoryScreen} />
    <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
  </Stack.Navigator>
);

const BottomBar = () => {
  return (
    <NavigationContainer independent={true}>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: COLORS.primary,
          inactiveTintColor: COLORS.secondary,
          showLabel: true,
          showIcon: true,
          labelStyle: { fontSize: 15 },

          style: {
            height: 65,
            width: Dimensions.get("window").width,
            backgroundColor: COLORS.transparent,
            elevation: 0,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={30}
                color={focused ? COLORS.primary : COLORS.secondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Categories"
          component={toggleCategoryAndDetails}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="collections"
                size={28}
                color={focused ? COLORS.primary : COLORS.secondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="shopping-cart"
                size={28}
                color={focused ? COLORS.primary : COLORS.secondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Favorite"
          component={FavoriteItemScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Fontisto
                name="heart"
                size={25}
                color={focused ? COLORS.primary : COLORS.secondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Others"
          component={OthersScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="bars"
                size={30}
                color={focused ? COLORS.primary : COLORS.secondary}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default BottomBar;
