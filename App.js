import React, { useEffect, useState } from "react";
import BottomBar from "./src/component/bar/bottom-bar";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/root-reducer";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { auth, generateUserDocument } from "./src/firebase/firebase.jsx";

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      setCurrentUser(user);
    });
  }, []);

  console.log(currentUser);
  return <BottomBar currentUser={currentUser} />;
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
