import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import { COLORS } from "../containts/theme.js";
import { auth, createUserProfileDocument } from "../firebase/firebase";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    check_Email: true,
    check_Password: true,
    check_ConfirmPassword: true,
  });

  const checkValid = async (val, type) => {
    // const patternMail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    // const patternPassword = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]\w{5}$/;
    const alpha = /^[a-zA-Z]+$/;
    const patternMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (type === "username") {
      if (alpha.test(val)) {
        setData({
          ...data,
          displayName: val,
        });
      }
    } else if (type === "email") {
      if (patternMail.test(val)) {
        setData({
          ...data,
          email: val,
          check_Email: true,
        });
      } else {
        setData({
          ...data,
          check_Email: false,
        });
      }
    } else if (type === "password") {
      if (val.length > 5) {
        setData({
          ...data,
          password: val,
          check_Password: true,
        });
      } else {
        setData({
          ...data,
          check_Password: false,
        });
      }
    } else if (type === "confirmpassword") {
      if (val === data.password) {
        setData({
          ...data,
          confirmPassword: val,
          check_ConfirmPassword: true,
        });
      } else {
        setData({
          ...data,
          check_ConfirmPassword: false,
        });
      }
    }
  };

  const { displayName, email, password } = data;
  const handleSignUp = async () => {
    if (
      data.check_Email === true &&
      data.check_Password === true &&
      data.check_ConfirmPassword === true
    ) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await createUserProfileDocument(user, { displayName: displayName });

        // clear our form
        setData({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
          check_Email: true,
          check_Password: true,
          check_ConfirmPassword: true,
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      if (data.check_Email === false) {
        alert("Invilid your email!");
      } else if (data.check_Password === false) {
        alert("Invilid your password!");
      } else if (data.check_ConfirmPassword === false) {
        alert("Confirm password don't match!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#Fc6d3f" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <View style={{ width: "90%", marginLeft: 10 }}>
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => checkValid(val, "username")}
            />
          </View>
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 20,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <Fontisto name="email" size={20} />
          <View style={{ width: "90%", marginLeft: 10 }}>
            <TextInput
              placeholder="Your Email"
              style={[
                styles.textInput,
                !data.check_Email ? styles.error : null,
              ]}
              autoCapitalize="none"
              onChangeText={(val) => checkValid(val, "email")}
            />
          </View>
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 20,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} />
          <View style={{ width: "90%", marginLeft: 10 }}>
            <TextInput
              placeholder="Your Password"
              style={[
                styles.textInput,
                !data.check_Password ? styles.error : null,
              ]}
              autoCapitalize="none"
              onChangeText={(val) => checkValid(val, "password")}
              secureTextEntry={true}
            />
          </View>
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 20,
            },
          ]}
        >
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} />
          <View style={{ width: "90%", marginLeft: 10 }}>
            <TextInput
              placeholder="Confirm Your Password"
              style={[
                styles.textInput,
                !data.check_ConfirmPassword ? styles.error : null,
              ]}
              autoCapitalize="none"
              onChangeText={(val) => checkValid(val, "confirmpassword")}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By signing up you agree to our
          </Text>
          <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
            {" "}
            Terms of service
          </Text>
          <Text style={styles.color_textPrivate}> and</Text>
          <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
            Privacy policy
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.signUp, { marginTop: 10 }]}
            onPress={() => handleSignUp()}
          >
            <Text style={styles.buttonTitle}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signUp, { marginTop: 10 }]}
            onPress={() => navigation.push("SignInScreen")}
          >
            <Text style={styles.buttonTitle}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "black",
    fontSize: 25,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 5,
  },
  textInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    color: "black",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    fontSize: 20,
    color: "black",
  },
  color_textPrivate: {
    color: "grey",
  },
  error: {
    borderColor: "red",
  },
});