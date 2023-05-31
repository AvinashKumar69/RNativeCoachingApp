import React, {useContext} from 'react';

// import {AuthenticationContext} from '../services/AuthContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export const RootNavigation = () => {
  //   const {userAuthenticated, setUserAuthenticated} = useContext(
  //     AuthenticationContext,
  //   );

  let userAuthenticated = true;

  return userAuthenticated ? <MainStack /> : <AuthStack />;
};
