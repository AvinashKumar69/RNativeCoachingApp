import React, {useContext} from 'react';

import {AuthenticationContext} from '../services/AuthContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export const RootNavigation = () => {
  const {user} = useContext(AuthenticationContext);

  return user ? <MainStack /> : <AuthStack />;
};
