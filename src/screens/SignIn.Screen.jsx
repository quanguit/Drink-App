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
import { signInWithGoogle, auth } from "../firebase/firebase";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_Email: true,
    check_Password: true,
  });

  const checkValid = async (val, type) => {
    const patternMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (type === "email") {
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
    }
  };

  const { email, password } = data;
  const handleSignIn = async () => {
    if (data.check_Email === true && data.check_Password === true) {
      try {
        await auth.signInWithEmailAndPassword(email, password);

        // clear our form
        setData({
          email: "",
          password: "",
          check_Email: true,
          check_Password: true,
        });
      } catch (error) {
        alert("Your email or password was wrong!");
        console.log(error.message);
      }
    } else {
      if (data.check_Email === false) {
        alert("Invilid your email!");
      } else if (data.check_Password === false) {
        alert("Invilid your password!");
      }
    }
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
              placeholderTextColor="#666666"
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

        <TouchableOpacity>
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
            onPress={() => navigation.push("SignUpScreen")}
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
  },
  error: {
    borderColor: "red",
  },
});
