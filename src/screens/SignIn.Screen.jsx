import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { COLORS } from "../containts/theme";
import { auth, signInWithGoogle } from "../firebase/firebase";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

  const checkValid = async (val, type) => {
    if (type === "email") {
      setData({
        ...data,
        email: val,
      });
    } else if (type === "password") {
      setData({
        ...data,
        password: val,
      });
    }
  };

  const resetForm = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const { email, password } = data;

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (error) {
      // alert("Your email or password was wrong!");
      alert(`${error.message}`);
    }
  };

  const sendResetEmail = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        alert("Error resetting password");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#Fc6d3f" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Fontisto name="email" size={20} />
          <View style={{ width: "90%", marginLeft: 10 }}>
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={styles.textInput}
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
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => checkValid(val, "password")}
              secureTextEntry={true}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => sendResetEmail()}>
          <Text style={styles.textPrivate}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => handleSignIn()}
          >
            <Text style={styles.buttonTitle}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signIn, { marginTop: 10 }]}
            onPress={signInWithGoogle}
          >
            <Text style={styles.buttonTitle}>Sign In With Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signIn, { marginTop: 10 }]}
            onPress={() =>
              navigation.push("SignUpScreen", { name: "SignUpScreen" })
            }
          >
            <Text style={styles.buttonTitle}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

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
  signIn: {
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
    color: "grey",
    textDecorationLine: "underline",
  },
});
