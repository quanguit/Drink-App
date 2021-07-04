import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import Header from "../component/bar/header";

const HomeScreen = () => {
  const image = { uri: require("../../assets/images/bg1.jpg") };

  const newDrink = { uri: require("../../assets/images/bg3.jpg") };

  const [item, setItem] = useState([
    {
      id: 1,
      image: { uri: require("../../assets/images/image1.jpg") },
      title: "Milk Coffe",
    },
    {
      id: 2,
      image: { uri: require("../../assets/images/image2.jpg") },
      title: "Cafuchino",
    },
    {
      id: 3,
      image: { uri: require("../../assets/images/image3.jpg") },
      title: "Blueberry juice",
    },
    {
      id: 4,
      image: { uri: require("../../assets/images/image4.jpg") },
      title: "Orange milk tea",
    },
    {
      id: 5,
      image: { uri: require("../../assets/images/image5.jpg") },
      title: "Black sugar bubble",
    },
  ]);
  return (
    <View style={{ flexGrow: 1, height: "100%" }}>
      <Header />
      <View>
        <ImageBackground
          source={image}
          style={{ width: "100%", height: 270 }}
          imageStyle={{ borderBottomRightRadius: 65 }}
        >
          <View style={styles.DarkOverPlay}></View>
          <View style={styles.searchContainer}>
            <Text style={styles.userGreet}>Hi You !</Text>
            <Text style={styles.userText}>What would you like to drink ?</Text>
          </View>
        </ImageBackground>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Top Trending</Text>
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={item}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 20, paddingLeft: 16 }}>
                  <TouchableOpacity>
                    <Image
                      source={item.image}
                      style={{
                        width: 150,
                        marginRight: 8,
                        height: 250,
                        borderRadius: 10,
                      }}
                    />
                    <View style={styles.ImageOverPlay}></View>
                    <Feather
                      name="droplet"
                      size={16}
                      color="white"
                      style={styles.imageDrinkIcon}
                    />
                    <Text style={styles.imageText}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          ></FlatList>
        </View>
        <View style={{ marginBottom: 60 }}>
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>New Drink</Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#ff6220" }}
            >
              View All
            </Text>
          </View>
          <Image
            source={newDrink}
            style={{
              width: "92%",
              height: 250,
              borderRadius: 10,
              alignSelf: "center",
            }}
          />
          <View style={{ position: "absolute", bottom: 0, padding: 16 }}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="droplet"
                color="white"
                size={20}
                style={{ marginLeft: 10, position: "relative", top: 4 }}
              />
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontWeight: "normal",
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}
              >
                Caramel milk tea
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "normal",
                marginBottom: 4,
                opacity: 0.9,
                marginLeft: 16,
              }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatibus ab et ducimus quos est doloremque perferendis.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  DarkOverPlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 270,
    backgroundColor: "#000",
    opacity: 0.2,
    borderBottomRightRadius: 65,
  },
  searchContainer: {
    paddingTop: 100,
    paddingLeft: 16,
  },
  userGreet: {
    fontSize: 38,
    fontWeight: "bold",
    color: "white",
  },
  userText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "white",
  },
  searchBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingLeft: 24,
    paddingRight: 50,
    padding: 12,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: "90%",
  },
  ImageOverPlay: {
    width: 150,
    height: 250,
    marginRight: 8,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#000",
    opacity: 0.2,
  },
  imageDrinkIcon: {
    position: "absolute",
    marginTop: 4,
    left: 10,
    bottom: 10,
  },
  imageText: {
    position: "absolute",
    color: "white",
    marginTop: 4,
    fontSize: 14,
    left: 30,
    bottom: 10,
  },
});
