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

const numColumns = 2;

const CollectionItem = ({ collection, navigation }) => {
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

  const Collection = ({ item, navigation }) => {
    if (item.empty) {
      return <View style={[styles.container, styles.vi]} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailsScreen", { item })}
        >
          <Image
            source={item.imageUrl}
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.view}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text1}>{item.price / 1000}.000</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <FlatList
      data={formatData(collection, numColumns)}
      keyExtractor={(item, index) => `${item.product_id}`}
      renderItem={({ item }) => (
        <Collection item={item} navigation={navigation} />
      )}
      numColumns={numColumns}
      vertical
      showsVerticalScrollIndicator={false}
    />
  );
};
export default CollectionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 8,
    marginBottom: SIZES.radius,
  },
  view: {
    flexDirection: "column",
  },
  image: {
    width: 170,
    height: 250,
    borderRadius: 20,
  },
  text: {
    paddingLeft: 5,
    ...FONTS.body3,
    color: COLORS.darkgray,
  },
  text1: {
    paddingLeft: 5,
    ...FONTS.body3,
    fontFamily: "Roboto-Regular",
    color: COLORS.black,
  },
  vi: {
    backgroundColor: "transparent",
  },
});
