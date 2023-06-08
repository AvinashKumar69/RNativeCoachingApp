import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Card, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

const ChatList = () => {
  const navigation = useNavigation();
  const chatData = useSelector(state => state?.allChatDetail?.chatDetail);
  console.log('chatData-->', Object.keys(chatData));

  const chatListCardClickHandler = chat => {
    navigation.navigate('Chat', {
      name: chat?.docId,
      otherId: chat?.otherId,
      ourId: chat?.ourId,
      docId: chat?.docId,
    });
  };

  return (
    <ScrollView style={styles.chatListContainer}>
      {Object.values(chatData)
        ?.sort((a, b) => b?.lastSent - a?.lastSent)
        ?.map((chat, i) => {
          return (
            <TouchableOpacity
              key={String(i)}
              activeOpacity={0.8}
              onPress={() => chatListCardClickHandler(chat)}>
              <Card.Title
                title={chat?.otherId}
                subtitle={chat?.lastMessage}
                style={styles.cardStyle}
                left={props => <Avatar.Icon {...props} icon="account-tie" />}
              />
              <Divider />
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  chatListContainer: {
    backgroundColor: '#fafafa',
    minHeight: '100%',
  },
  cardStyle: {
    // margin: 5,
    // borderWidth: 1,
    // borderRadius: 10,
  },
});
