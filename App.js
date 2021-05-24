import React, { useEffect, useState } from "react";
import BottomBar from "./src/component/bar/bottom-bar";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/root-reducer";
import logger from "redux-logger";
import { auth, createUserProfileDocument } from "./src/firebase/firebase.jsx";

const middlewares = [logger];
const enhancers = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancers);

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }, []);
  const init = store.getState();
  console.log(init);
  return <BottomBar currentUser={currentUser} />;
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
