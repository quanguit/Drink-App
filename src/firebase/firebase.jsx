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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google sign in
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
