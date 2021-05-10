import React from 'react';

export const AuthContext = React.createContext()
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
  }