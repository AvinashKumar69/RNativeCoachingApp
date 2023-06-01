import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import About from '../screens/MainStack/About';
import Contact from '../screens/MainStack/Contact';
import Home from '../screens/MainStack/Home';
import Notes from '../screens/MainStack/Notes';

const MainStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#273a94',
          height: 50,
          // borderTopLeftRadius: 10,
          // borderTopRightRadius: 10,
          paddingBottom: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'About')
            iconName = focused ? 'account' : 'account-outline';
          else if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Contact')
            iconName = focused ? 'email-send' : 'email-send-outline';
          else if (route.name === 'Notes')
            iconName = focused ? 'notebook' : 'notebook-outline';

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#fafafa',
        tabBarInactiveTintColor: '#808080',
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      })}
      detachInactiveScreens={true}
      initialRouteName="Home"
      backBehavior="history">
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contact" component={Contact} />
      <Tab.Screen name="Notes" component={Notes} />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
