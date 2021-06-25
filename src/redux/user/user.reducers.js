import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signInFailure: false,
  signUpSuccess: false,
  signUpFailure: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case userTypes.SIGN_IN_SUCCESS: {
      return {
        ...state,
        signInSuccess: action.payload,
      };
    }
    case userTypes.SIGN_IN_FAILURE: {
      return {
        ...state,
        signInFailure: action.payload,
      };
    }
    case userTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    }
    case userTypes.SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpFailure: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
