import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { connect, useSelector } from "react-redux";
import Header from "../component/bar/header";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "../containts/theme.js";
import { addItem } from "../redux/cart/cart.actions";
import { firestore } from "../firebase/firebase";
import { addItemToCartFavorite } from "../redux/cart/cart.utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const DetailsScreen = ({ route, navigation, addItem }) => {
  const { item } = route.params;
  const { currentUser } = useSelector(mapState);

  const [collection, setCollection] = useState([]);
  useEffect(() => {
    const getCollection = async () => {
      const fetchCollection = await firestore.collection("collection").get();
      const col = fetchCollection.docs.map((a) => a.data());
      setCollection(col);
    };
    getCollection();
  }, []);

  let temp = collection.filter(
    (collect) =>
      item.id === collect.id && item.product_id !== collect.product_id
  );
  let relate = temp.slice(0, 4);
  // console.log(relate);
  // let relate = temp.filter((item, index) => index < 4);

  const addFavorite = async (item) => {
    const userRef = firestore.doc(`user/${currentUser.id}`);
    let likesList = (await userRef.get()).data().Likes;
    // check exist
    try {
      await userRef.update({
        Likes: addItemToCartFavorite(likesList, item),
      });
    } catch (error) {
      console.log("Error add item", error);
    }
  };

  const SubCollection = ({ rel }) => {
    // console.log(rel);
    return (
      <View
        style={[
          styles.relateItemWrapper,
          {
            marginLeft: item.id === "1" ? 20 : 0,
          },
        ]}
      >
        <Image source={rel.item.imageUrl} style={styles.relateImage} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.productImg} source={item.imageUrl} />
        <TouchableOpacity
          style={styles.sign}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="closecircleo" size={25} color={COLORS.darkgray} />
        </TouchableOpacity>
        <View style={styles.headerWrapper}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}đ</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <AntDesign
                name="hearto"
                size={20}
                color="#ff4d4d"
                onPress={() => {
                  currentUser
                    ? addFavorite(item)
                    : alert("You haven't logged into your account yet !");
                }}
              />
            </TouchableOpacity>
            <Text style={styles.Text}>YÊU THÍCH</Text>
          </View>
        </View>
        <View style={styles.contentSize}>
          <Text style={styles.textSize}>Size:</Text>
          <TouchableOpacity style={styles.btnSize}>
            <Text>S</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>M</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSize}>
            <Text>L</Text>
          </TouchableOpacity>
          <Text style={styles.textNote}>
            (Note: default size M, size S: -5000đ, size L: +5000đ)
          </Text>
        </View>
        <View style={styles.relateWrapper}>
          <Text style={styles.relateTitle}>Relate Drink or Food</Text>
          <View style={styles.relateListWrapper}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(relate) => `${relate.product_id}`}
              data={relate}
              renderItem={(rel) => <SubCollection rel={rel} />}
            />
          </View>
        </View>
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => addItem(item)}
          >
            <Text style={styles.shareButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(DetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  sign: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  productImg: {
    width: 375,
    height: 350,
    alignItems: "center",
  },
  name: {
    marginTop: 10,
    fontSize: 28,
    color: COLORS.black,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Roboto-Bold",
    fontSize: 28,
  },
  price: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    color: COLORS.darkgray,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
  btnSize: {
    height: 35,
    width: 35,
    marginLeft: 10,
    borderRadius: 5,
    borderColor: "#778899",
    borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentSize: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 20,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  shareButtonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: COLORS.white,
    marginRight: 10,
    fontWeight: 700,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
  headerRight: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.secondary,
    textAlign: "center",
    marginRight: 10,
    marginTop: 10,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Text: {
    marginTop: 5,
    color: COLORS.darkgray,
  },
  relateWrapper: {
    marginTop: 40,
  },
  relateTitle: {
    marginLeft: 10,
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: COLORS.darkgray,
  },
  relateListWrapper: {
    paddingVertical: 20,
  },
  relateItemWrapper: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginRight: 15,
    borderRadius: 15,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  relateImage: {
    marginTop: 5,
    resizeMode: "contain",
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  textSize: {
    fontSize: 25,
    marginLeft: 10,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    color: COLORS.darkgray,
  },
  textNote: {
    fontSize: 16,
    marginLeft: 10,
    paddingTop: 45,
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    position: "absolute",
  },
});
