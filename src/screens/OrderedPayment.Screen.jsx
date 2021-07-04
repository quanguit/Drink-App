import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { COLORS } from "../containts/theme";
import { firestore } from "../firebase/firebase";
import moment from "moment";
import Header from "../component/bar/header";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const OrderedPaymentScreen = ({ navigation }) => {
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, [orders]);

  const getOrders = async () => {
    try {
      const userRef = firestore.doc(`user/${currentUser.id}`);
      let ordersList = (await userRef.get()).data().Orders;
      setOrders(ordersList);
    } catch (error) {
      console.log(error);
    }
  };

  const AllOrders = ({ order }) => {
    const { name, phone, address, createdAt, status, totalCost, items } = order;
    const date = moment(createdAt.toDate()).format("MMMM Do YYYY");

    const EveryItem = ({ item }) => {
      return (
        <View style={styles.cart}>
          <Text style={[styles.text1, { width: "45%", textAlign: "left" }]}>
            {item.name} ({item.size})
          </Text>
          <Text
            style={[
              styles.text1,
              { width: "10%", textAlign: "center", marginLeft: 18 },
            ]}
          >
            {item.quantity}
          </Text>
          <View style={styles.elementRight}>
            <Text style={[styles.text1, { width: "85%", textAlign: "right" }]}>
              {item.price / 1000}.000 VNĐ
            </Text>
          </View>
        </View>
      );
    };

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: status === 1 ? "#4AA96C" : "#CD113B" },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cart}>
            <Text style={styles.text}>Date</Text>
            <View style={styles.elementRight}>
              <Text style={styles.textInfo}>{date}</Text>
            </View>
          </View>
          <View style={styles.cart}>
            <Text style={styles.text}>Name</Text>
            <View style={styles.elementRight}>
              <Text style={styles.textInfo}>{name}</Text>
            </View>
          </View>
          <View style={styles.cart}>
            <Text style={styles.text}>Phone</Text>
            <View style={styles.elementRight}>
              <Text style={styles.textInfo}>{phone}</Text>
            </View>
          </View>
          <View style={styles.cart}>
            <Text style={styles.text}>Address</Text>
            <View style={styles.elementRight}>
              <Text style={styles.textInfo}>{address}</Text>
            </View>
          </View>
          <View style={styles.cart}>
            <Text style={styles.text}>Status</Text>
            <View style={styles.elementRight}>
              <Text style={styles.textInfo}>
                {status === 0 ? "Being delivered" : "Delivered"}
              </Text>
            </View>
          </View>
          <View style={styles.cart}>
            <Text style={styles.text}>Total cost</Text>
            <View style={styles.elementRight}>
              <Text style={styles.text}>{totalCost / 1000}.000 VNĐ</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.cart}>
            <Text style={styles.text}>Item name</Text>
            <Text style={[styles.text, { marginLeft: 65 }]}>Qty</Text>
            <View style={styles.elementRight}>
              <Text style={styles.text}>Cost</Text>
            </View>
          </View>
          <FlatList
            data={items}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => <EveryItem item={item} />}
          />
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.order_ID}
          renderItem={({ item }) => <AllOrders order={item} />}
        />
        {orders.length === 0 ? (
          <View style={{ marginVertical: 20, flex: 1 }}>
            <View>
              <Text style={[styles.text, { textAlign: "center" }]}>
                You don't have any orders yet
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBack}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default OrderedPaymentScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 20,
    flex: 1,
  },
  cart: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  elementRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  commandButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginTop: 10,
  },
  goBack: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  text: {
    fontSize: 20,
    fontFamily: "Roboto-Black",
  },
  textInfo: {
    fontSize: 20,
    fontFamily: "Roboto-MediumItalic",
  },
  text1: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "stretch",
  },
});
