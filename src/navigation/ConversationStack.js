import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Chat from '../screens/MainStack/ConversationStack/Chat';
import ChatList from '../screens/MainStack/ConversationStack/ChatList';

const ConversationStack = () => {
  const CStack = createNativeStackNavigator();

  return (
    <CStack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fafafa',
        },
        headerTitleAlign: 'center',
      }}>
      <CStack.Screen
        name="ChatList"
        component={ChatList}
        options={{headerShown: true, title: 'Chat List'}}
      />
      <CStack.Screen
        name="Chat"
        component={Chat}
        options={({route}) => ({title: route.params.name})}
      />
    </CStack.Navigator>
  );
};

export default ConversationStack;
