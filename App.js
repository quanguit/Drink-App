import React from 'react';
import BottomBar from './src/component/bar/bottom-bar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/redux/root-reducer';
import logger from 'redux-logger';

const middlewares = [logger];
const enhancers = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancers);

function App() {
	return <BottomBar />;
}

export default () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};
