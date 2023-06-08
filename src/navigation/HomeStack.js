import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Home from '../screens/MainStack/HomeStack/Home';
import Notes from '../screens/MainStack/HomeStack/Notes';

const HomeStack = () => {
  const HStack = createNativeStackNavigator();

  return (
    <HStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fafafa',
        },
        headerTitleAlign: 'center',
        headerShown: true,
      }}>
      <HStack.Screen
        name="Home"
        component={Home}
        options={{title: 'Home Screen'}}
      />
      <HStack.Screen
        name="Notes"
        component={Notes}
        options={{title: 'Notes Screen'}}
      />
    </HStack.Navigator>
  );
};

export default HomeStack;
