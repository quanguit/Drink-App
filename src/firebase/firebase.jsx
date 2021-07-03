import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyCWRDwvz67U9tR1oAIR93MENibClXBIu4U",
  authDomain: "reactnativefirebase-4c8bb.firebaseapp.com",
  projectId: "reactnativefirebase-4c8bb",
  storageBucket: "reactnativefirebase-4c8bb.appspot.com",
  messagingSenderId: "178322648596",
  appId: "1:178322648596:web:67fca70b4e674a130dc101",
  measurementId: "G-864W0KH7ML",
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`user/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName } = user;
    const createAt = new Date();
    const Likes = [];
    const phone = "";
    const address = "";

    try {
      await userRef.set({
        displayName,
        email,
        Likes,
        createAt,
        address,
        phone,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`user/${uid}`).get();
    return {
      id: uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google sign in
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
