import React, { useContext, useState } from "react";

import CollectionsContext from "../../contexts/collections.contexts/collections.context.js";
import Categories from "../../contexts/category.contexts/category.context.js";
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import SearchBar from "../bar/search-bar";
import { COLORS, FONTS, SIZES } from "../../containts/theme";

import CollectionItem from "../collection-item/collection-item";

const Directory = () => {
  const collection = useContext(CollectionsContext);
  const category = useContext(Categories);

  const [collections, setCollections] = useState(collection);
  const [directories, setDirectories] = useState(category);
  const [searchQuery, setSearchQuery] = useState("");

  // listed category
  const onSelectCagory = (item) => {
    let newList = collection.filter((a) => a.id === item.id);
    setCollections(newList);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginLeft: index === 0 ? SIZES.padding : 0,
          marginRight: SIZES.radius,
        }}
        onPress={() => onSelectCagory(item)}
      >
        <Image source={item.imageUrl} resizeMode="cover" style={styles.image} />
        <View style={styles.box2}>
          <Text style={styles.text}>{item.title.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // search item
  const searchFilter = (text) => {
    setSearchQuery(text);
  };

  const filteredCollections = collections.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <SearchBar handleChange={searchFilter} />
        <View style={{ padding: SIZES.padding * 2 }}>
          <Text style={styles.text1}>Main</Text>
          <Text style={styles.text1}>Categories</Text>
        </View>
        <FlatList
          data={directories}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <CollectionItem collections={filteredCollections} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box1: {
    marginTop: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 20,
  },
  text: {
    marginLeft: 5,
    ...FONTS.body3,
    color: COLORS.lightGray,
  },
  text1: {
    ...FONTS.h1,
    fontSize: 40,
    paddingTop: 20,
  },
});

export default Directory;
