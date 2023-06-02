import React, {useContext} from 'react';

import {AuthenticationContext} from '../services/AuthContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export const RootNavigation = () => {
  const {authUser} = useContext(AuthenticationContext);

  return authUser ? <MainStack /> : <AuthStack />;
};
