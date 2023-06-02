import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {createContext, useEffect, useState} from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  GoogleSignin.configure({
    webClientId:
      '978978301889-7h8oca0terlmk3iupt5f087ljf68iqjt.apps.googleusercontent.com',
  });

  const [initializing, setInitializing] = useState(true);
  const [authUser, setAuthUser] = useState(); // auth user
  console.log('auth user==>', authUser);

  // Handle user state changes
  const onAuthStateChanged = user => {
    setAuthUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <AuthenticationContext.Provider
      value={{
        authUser,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
