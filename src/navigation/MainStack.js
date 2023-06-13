import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import About from '../screens/MainStack/About';
import ConversationStack from './ConversationStack';
import HomeStack from './HomeStack';

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
          else if (route.name === 'HomeStack')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'ConversationStack')
            iconName = focused ? 'chat-processing-outline' : 'chat-outline';

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#fafafa',
        tabBarInactiveTintColor: '#808080',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
      detachInactiveScreens={true}
      initialRouteName="ConversationStack"
      backBehavior="history">
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="ConversationStack" component={ConversationStack} />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
