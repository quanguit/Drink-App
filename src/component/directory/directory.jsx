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
  Dimensions,
} from "react-native";

import SearchBar from "../bar/search-bar";

const numColumns = 2;

const WIDTH = Dimensions.get("window").width;

const formatData = (dataList, numColumns) => {
  const totalRows = Math.floor(dataList.length / numColumns);
  let totalLastRows = dataList.length - totalRows * numColumns;
  while (totalLastRows !== 0 && totalLastRows !== numColumns) {
    dataList.push({
      title: "",
      imageUrl: "blank",
      size: "blank",
      id: "blank",
      linkUrl: "blank",
      empty: true,
    });
    totalLastRows++;
  }
  return dataList;
};

const Directory = () => {
  const sections = useContext(DirectoryContext);
  // console.log(sections);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={formatData(sections, numColumns)}
        numColumns={numColumns}
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
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
  },
  box1: {
    flex: 1,
    height: 150,
    padding: 10,
    length: WIDTH / numColumns,
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
