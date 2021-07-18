import { combineReducers } from 'redux';
import cartReducer from './cart/cart.reducers';
import userReducer from './user/user.reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const rootReducer = combineReducers({
	cart: cartReducer,
	user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
