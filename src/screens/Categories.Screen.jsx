import React, { useState, useEffect } from "react";
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
import SearchBar from "../component/bar/search-bar";
import { COLORS, FONTS, SIZES } from "../containts/theme.js";
import CollectionItem from "../component/collection-item/collection-item";
import Header from "../component/bar/header";
import { firestore } from "../firebase/firebase";
import { FadeLoader } from "react-spinners";

const CategoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const fetchCategory = await firestore.collection("category").get();
    const fetchCollection = await firestore.collection("collection").get();
    const cat = fetchCategory.docs.map((a) => a.data());
    const col = fetchCollection.docs.map((a) => a.data());
    await Promise.all([cat, col]);
    setCategory(cat);
    setCollection(col);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setIsLoading(true);
    }, 500);
  }, []);

  // listed category
  const onSelectCagory = (item) => {
    const fetchCollection = async () => {
      const fetchCollection = await firestore
        .collection("collection")
        .where("id", "==", item.id)
        .get();
      const col = fetchCollection.docs.map((a) => a.data());
      setCollection(col);
    };
    fetchCollection();
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

  const filteredCollection = collection.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <Header />
          <SearchBar handleChange={searchFilter} />
          <FlatList
            data={category}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingTop: SIZES.padding * 2 }}
          />
          <CollectionItem collection={filteredCollection} />
        </SafeAreaView>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.loading}>
          <FadeLoader size={24} color={COLORS.primary} loading />
        </View>
      </View>
    );
  }
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
  loading: {
    justifyContent: "center",
    marginTop: 300,
    marginLeft: 160,
  },
});

export default CategoryScreen;
