import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Login from '../screens/AuthStack/Login';

const AuthStack = () => {
  const AStack = createNativeStackNavigator();

  return (
    <AStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <AStack.Screen name="Login" component={Login} />
    </AStack.Navigator>
  );
};

export default AuthStack;
