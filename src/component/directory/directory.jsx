import React, { useContext } from "react";

import MenuItem from "../menu-item/menu-item";
import DirectoryContext from "../../contexts/directory.context.js";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";

const Directory = () => {
  const sections = useContext(DirectoryContext);
  // console.log(sections);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sections}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.box1}>
            <ImageBackground
              source={{ uri: item.imageUrl }}
              style={styles.box2}
            >
              <Text style={styles.text}>{item.title.toUpperCase()}</Text>
            </ImageBackground>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  box1: {
    flex: 0.5,
    height: 200,
  },
  box2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
    color: "blue",
  },
});

export default Directory;
