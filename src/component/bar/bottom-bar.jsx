import React from "react";
import { Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/Home.Screen";
import Categories from "../../screens/Categories.Screen";
import ItemOrdered from "../../screens/Item-Ordered.Screen";
import FavoriteItem from "../../screens/Favorite-Item.Screen";
import Others from "../../screens/Others.Screen";

import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

// const HomeStackScreen = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={Home} />
//     <Stack.Screen name="List-Item" component={ListItem} />
//     <Stack.Screen name="Item-Ordered" component={ItemOrdered} />
//     <Stack.Screen name="Favorite-Item" component={FavoriteItem} />
//     <Stack.Screen name="Others" component={Others} />
//   </Stack.Navigator>
// );

const BottomBar = () => (
  <NavigationContainer>
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "#000000",
        inactiveTintColor: "#ffffff",
        showLabel: true,
        showIcon: true,
        labelStyle: { fontSize: 15 },
        style: {
          height: 65,
          width: Dimensions.get("window").width,
          backgroundColor: "#cc6600",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={30}
              color={focused ? "#000000" : "#ffffff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="collections"
              size={28}
              color={focused ? "#000000" : "#ffffff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Ordered"
        component={ItemOrdered}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="shopping-cart"
              size={28}
              color={focused ? "#000000" : "#ffffff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorite"
        component={FavoriteItem}
        options={{
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name="heart"
              size={25}
              color={focused ? "#000000" : "#ffffff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Others"
        component={Others}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="bars"
              size={30}
              color={focused ? "#000000" : "#ffffff"}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  </NavigationContainer>
);

export default BottomBar;
