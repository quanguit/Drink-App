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
import axios from "axios";
import SearchBar from "../component/bar/search-bar";
import { COLORS, FONTS, SIZES } from "../containts/theme.js";
import CollectionItem from "../component/collection-item/collection-item";
import { createStructuredSelector } from "reselect";
import { selectCategory } from "../redux/category/category.selectors";
import { selectCollection } from "../redux/collection/collection.selector.js";
import { connect } from "react-redux";

const CategoryScreen = ({ categories, collections }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    let unMounted = false;
    axios
      .get("https://backend-app-lamquanghy.herokuapp.com/category")
      .then((res) => {
        if (!unMounted) {
          setCategory(res.data);
        }
      });
    return () => {
      unMounted = true;
    };
  }, []);

  useEffect(() => {
    let unMounted = false;
    axios
      .get("https://backend-app-lamquanghy.herokuapp.com/collection")
      .then((res) => {
        if (!unMounted) {
          setCollection(res.data);
        }
      });
    return () => {
      unMounted = true;
    };
  }, []);

  // listed category
  const onSelectCagory = (item) => {
    const fetchCollection = async () => {
      await axios
        .get(
          `https://backend-app-lamquanghy.herokuapp.com/collection/${item._id}`
        )
        .then((res) => {
          setCollection(res.data);
        });
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <SearchBar handleChange={searchFilter} />
        <View style={{ padding: SIZES.padding * 2 }}>
          <Text style={styles.text1}>Main</Text>
          <Text style={styles.text1}>Categories</Text>
        </View>
        <FlatList
          data={category}
          keyExtractor={(item, index) => `${item._id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <CollectionItem collection={filteredCollection} />
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategory,
  collections: selectCollection,
});

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

export default connect(mapStateToProps)(CategoryScreen);
