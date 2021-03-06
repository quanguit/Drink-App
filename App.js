import React, { useEffect } from 'react';
import BottomBar from './src/component/bar/bottom-bar';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/redux/root-reducer';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { auth, generateUserDocument } from './src/firebase/firebase.jsx';
import { setCurrentUser } from './src/redux/user/user.actions';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const loggerMiddleware = createLogger();
const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export const persistor = persistStore(store);

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const App = () => {
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(async (userAuth) => {
			const user = await generateUserDocument(userAuth);
			dispatch(setCurrentUser(user));
		});
	}, []);

	console.log(currentUser);
	return <BottomBar />;
};

export default () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
};
