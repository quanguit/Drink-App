import React from "react";
import { Text } from "react-native";
import { View, ActivityIndicator } from "react-native";
//import BottomBar from "./src/component/bar/bottom-bar";
import RootStackScreen from '../screens/RootStackScreen';
import { NavigationContainer} from '@react-navigation/native';
import { AuthContext } from '../contexts/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OthersScreen = () =>{
    const initialLoginState = {
        isLoading: false,
        userName: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
    switch( action.type ) {
        case 'RETRIEVE_TOKEN': 
        return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
        };
        case 'LOGIN': 
        return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
        };
        case 'LOGOUT': 
        return {
            ...prevState,
            userName: null,
            userToken: null,
            isLoading: false,
        };
        case 'REGISTER': 
        return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
        };
    }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
      signIn: async(foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch(e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }
    }), []);

    if( loginState.isLoading ) {
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        );
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer independent={true}>
                { 
                    loginState.userToken !== null ? ( <Text>Others</Text> ) :<RootStackScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
        //<BottomBar />
    );
} //<Text>Others</Text>;

export default OthersScreen;
