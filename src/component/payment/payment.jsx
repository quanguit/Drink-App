import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import NumberFormat from "react-number-format";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../containts/theme";

const Payment = ({ totalPrice, checkUser }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity>
        <View style={styles.paymentMethod}>
          <MaterialIcons name="payment" size={24} color={COLORS.primary} />
          <Text style={styles.textTitle}>Payment method</Text>
          <View style={styles.elementRight}>
            <Text style={styles.text}>COD</Text>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.priceView}>
        <View style={styles.elements}>
          <Text style={styles.text}>Name</Text>
          <View style={styles.elementRight}>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#666666"
              style={styles.textInput}
              onChangeText={(text) => checkUser(text, "name")}
            />
          </View>
        </View>
        <View style={styles.elements}>
          <Text style={styles.text}>Phone</Text>
          <View style={styles.elementRight}>
            <TextInput
              placeholder="Your Phone"
              placeholderTextColor="#666666"
              style={styles.textInput}
              onChangeText={(text) => checkUser(text, "phone")}
            />
          </View>
        </View>
        <View style={styles.elements}>
          <Text style={styles.text}>Address</Text>
          <View style={styles.elementRight}>
            <TextInput
              placeholder="Your Address"
              placeholderTextColor="#666666"
              style={styles.textInput}
              onChangeText={(text) => checkUser(text, "address")}
            />
          </View>
        </View>
        <View style={styles.elements}>
          <Text style={styles.text}>Ordered product total</Text>
          <View style={styles.elementRight}>
            <NumberFormat
              value={totalPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" vnd"}
              // prefix={"$"}
              renderText={(formattedValue) => (
                <Text style={styles.numberText}>{formattedValue}</Text>
              )}
            />
          </View>
        </View>
        <View>
          <View style={styles.elements}>
            <Text style={styles.text}>Transport fee</Text>
            <View style={styles.elementRight}>
              <NumberFormat
                value={15000}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" vnd"}
                // prefix={"$"}
                renderText={(formattedValue) => (
                  <Text style={styles.numberText}>{formattedValue}</Text>
                )}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.elements}>
            <Text style={[styles.text, { fontSize: 25 }]}>Price total</Text>
            <View style={styles.elementRight}>
              <NumberFormat
                value={totalPrice + 15000}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" vnd"}
                // prefix={"$"}
                renderText={(formattedValue) => (
                  <Text
                    style={[
                      styles.numberText,
                      { fontSize: 25, color: COLORS.primary },
                    ]}
                  >
                    {formattedValue}
                  </Text>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  root: {
    borderTopWidth: 2,
    borderTopColor: COLORS.darkray,
    flex: 1,
  },
  paymentMethod: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  elementRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textTitle: {
    marginLeft: 5,
    fontFamily: "Roboto-Black",
    fontSize: 25,
  },
  text: {
    fontFamily: "gilroy-light",
    fontSize: 20,
    fontWeight: "200",
  },
  numberText: {
    fontFamily: "Roboto-Black",
    fontSize: 20,
  },
  elements: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  priceView: {
    marginVertical: 10,
  },
  textInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    color: "black",
  },
});
