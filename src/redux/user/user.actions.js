import userTypes from "./user.types";
import { auth, generateUserDocument } from "../../firebase/firebase.jsx";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: true });
    } catch (error) {
      alert(`${error.message}`);
      dispatch({ type: userTypes.SIGN_IN_FAILURE, payload: true });
    }
  };
};

export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword,
}) => {
  return async (dispatch) => {
    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
      dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: true });
    } catch (error) {
      alert(`${error.message}`);
      dispatch({ type: userTypes.SIGN_UP_FAILURE, payload: true });
    }
  };
};
