import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import { COLORS } from "../containts/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Header from "../component/bar/header";
import { firestore } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const EditProfileScreen = ({ navigation }) => {
  const { currentUser } = useSelector(mapState);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userRef = firestore.doc(`user/${currentUser.id}`);
    let snapshot = (await userRef.get()).data();
    setUserData(snapshot);
  };

  const handleUpdate = async () => {
    const userRef = firestore.doc(`user/${currentUser.id}`);
    try {
      await userRef.update({
        displayName: userData.displayName,
        phone: userData.phone,
        address: userData.address,
      });
      const snapshot = (await userRef.get()).data();
      dispatch(setCurrentUser({ ...snapshot, id: userRef.id }));
    } catch (error) {
      console.log(error);
      alert("Error when Updating!");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity>
          <ImageBackground
            source={{
              uri: require("../../assets/images/avatar.png"),
            }}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "#E1E5EA",
              marginTop: 10,
            }}
            imageStyle={{ borderRadius: 15 }}
          ></ImageBackground>
        </TouchableOpacity>
        <Text style={styles.nameText}>{currentUser.displayName}</Text>
      </View>

      <View style={styles.action}>
        <FontAwesome name="user-o" size={25} />
        <View style={{ width: "90%", marginLeft: 14 }}>
          <TextInput
            placeholder="User Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={userData ? userData.displayName : ""}
            onChangeText={(val) =>
              setUserData({ ...userData, displayName: val })
            }
          />
        </View>
      </View>
      <View style={styles.action}>
        <Feather name="phone" size={25} />
        <View style={{ width: "90%", marginLeft: 10 }}>
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={styles.textInput}
            value={userData ? userData.phone : ""}
            onChangeText={(val) => setUserData({ ...userData, phone: val })}
          />
        </View>
      </View>
      <View style={styles.action}>
        <Icon name="map-marker-outline" size={25} />
        <View style={{ width: "90%", marginLeft: 10 }}>
          <TextInput
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={userData ? userData.address : ""}
            onChangeText={(val) => setUserData({ ...userData, address: val })}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.commandButton, { backgroundColor: "#FF6347" }]}
        onPress={handleUpdate}
      >
        <Text style={styles.panelButtonTitle}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBack}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    color: "black",
  },
  nameText: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  goBack: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
