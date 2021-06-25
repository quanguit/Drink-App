import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CheckoutItem from "../component/checkout-item/checkout-item";
import { COLORS, FONTS } from "../containts/theme";
import {
  selectCartItems,
  selectCartTotal,
} from "../redux/cart/cart.selectors.js";
import { createStructuredSelector } from "reselect";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../component/bar/header";
import Payment from "../component/payment/payment";
import BottomSheet from "reanimated-bottom-sheet";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { clearCart } from "../redux/cart/cart.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const CheckoutScreen = ({ cartItems, total }) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const sheetRef = useRef(null);

  useEffect(() => {
    if (flag === true) {
      sheetRef.current.snapTo(0);
    } else {
      sheetRef.current.snapTo(1);
    }
  }, [flag]);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <View style={styles.icon}>
        <FontAwesome5 name="check-circle" size={50} color="green" />
        <Text style={styles.text}>Your order has been paid</Text>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            setFlag(!flag);
            dispatch(clearCart());
          }}
        >
          <Text style={styles.shareButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const checkUser = (text, type) => {
    if (type == "name") {
      setUser({ ...user, name: text });
    } else if (type == "phone") {
      setUser({ ...user, phone: text });
    } else if (type == "address") {
      setUser({ ...user, address: text });
    }
  };

  const resetForm = () => {
    setUser({
      name: "",
      phone: "",
      address: "",
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => <CheckoutItem cartItem={item} />}
        />
        {total === 0 ? (
          <View style={styles.viewPayment}>
            <Text style={styles.textError}>
              Your cart is empty. Let's order something !
            </Text>
          </View>
        ) : (
          <View style={styles.viewPayment}>
            {currentUser ? (
              <Payment totalPrice={total} checkUser={checkUser} />
            ) : (
              <Text style={styles.textError}>
                You must be logged into your account to pay!
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => {
              if (currentUser && cartItems.length > 0) {
                if (
                  user.name !== "" &&
                  user.phone !== "" &&
                  user.address !== ""
                ) {
                  sheetRef.current.snapTo(0);
                  setFlag(!flag);
                  resetForm();
                } else {
                  alert("You must fill in your information!!");
                }
              } else {
                if (currentUser === null && cartItems.length > 0) {
                  alert("You have logged in to pay!");
                } else if (currentUser !== null && cartItems.length === 0) {
                  alert("You haven't ordered anything yet");
                }
              }
            }}
          >
            <Text style={styles.shareButtonText}>Payment</Text>
          </TouchableOpacity>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={["40%", "-20%", 0]}
          borderRadius={20}
          renderContent={renderContent}
          initialSnap={1}
        />
      </>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    height: 80,
  },
  headerName: {
    ...FONTS.h1,
    marginLeft: 10,
    fontWeight: "bold",
    color: COLORS.white,
  },
  cart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  textSuccess: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textError: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "green",
    marginHorizontal: 40,
  },
  shareButtonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: COLORS.white,
  },
  addToCarContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    fontFamily: "Roboto-Bold",
    flex: 1,
  },
  icon: {
    flex: 1,
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    color: "green",
    marginTop: 20,
    fontFamily: "Roboto-Bold",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    width: 315,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  loading: {
    justifyContent: "center",
    marginTop: 300,
    marginLeft: 160,
  },
  viewPayment: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
});
