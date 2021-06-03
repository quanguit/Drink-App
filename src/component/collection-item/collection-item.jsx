import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../containts/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { addItem, addItemToFavorite } from "../../redux/cart/cart.actions.js";

const numColumns = 2;

const CollectionItem = ({ collection, addItem, addItemToFavorite }) => {
  const formatData = (datalist, numColumns) => {
    const totalRows = Math.floor(datalist.length / numColumns);
    let totalLastRow = datalist.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      datalist.push({
        id: "blank",
        title: "blank",
        imageUrl: "blank",
        empty: true,
      });
      totalLastRow++;
    }
    return datalist;
  };

  const Collection = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.container, styles.vi]} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Image source={item.imageUrl} resizeMode="cover" style={styles.image} />
        <View style={styles.view}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text1}>{item.price}đ</Text>
        </View>
        <View style={styles.view}>
          <TouchableOpacity>
            <AntDesign
              name="pluscircleo"
              size={20}
              color="#09e609"
              style={{ marginLeft: 5 }}
              onPress={() => addItem(item)}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name={item.like ? "heart" : "hearto"}
              size={20}
              color="#ff4d4d"
              style={{ marginRight: 10 }}
              onPress={() => addItemToFavorite(item)}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <FlatList
      data={formatData(collection, numColumns)}
      keyExtractor={(item, index) => `${item.product_id}`}
      renderItem={({ item }) => <Collection item={item} />}
      numColumns={numColumns}
      vertical
      showsVerticalScrollIndicator={false}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  addItemToFavorite: (item) => dispatch(addItemToFavorite(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 8,
    marginBottom: SIZES.radius,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 170,
    height: 250,
    borderRadius: 20,
  },
  text: {
    marginLeft: 5,
    ...FONTS.body3,
    color: COLORS.darkgray,
  },
  text1: {
    marginRight: 10,
    ...FONTS.body3,
    color: COLORS.darkgray,
  },
  vi: {
    backgroundColor: "transparent",
  },
});
