import React from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../containts/theme";
import AntDesign from "react-native-vector-icons/AntDesign";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

const CollectionItem = ({ collections }) => {
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

  const renderItem = ({ item }) => {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={item.imageUrl} resizeMode="cover" style={styles.image} />
        <View style={styles.view}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text1}>{item.price}</Text>
        </View>
        <TouchableOpacity>
          <AntDesign
            name="pluscircleo"
            size={20}
            color="#09e609"
            style={{ paddingLeft: 5 }}
            onPress={() => console.log("haha")}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <FlatList
      data={formatData(collections, numColumns)}
      keyExtractor={(item, index) => `${item.product_id}`}
      renderItem={renderItem}
      numColumns={numColumns}
      vertical
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
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
});
export default CollectionItem;
