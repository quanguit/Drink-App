import React from "react";
import BottomBar from "./src/component/bar/bottom-bar";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/root-reducer";
import logger from "redux-logger";
import { auth, createUserProfileDocument } from "./src/firebase/firebase.jsx";

const middlewares = [logger];
const enhancers = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancers);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnMount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return <BottomBar currentUser={this.state.currentUser} />;
  }
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
