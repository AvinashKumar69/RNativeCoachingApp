import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Card, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

const ChatList = () => {
  const navigation = useNavigation();
  const chatData = useSelector(state => state?.allChatDetail?.chatDetail);
  const otherUsersData = useSelector(
    state => state?.allChatDetail?.chatListOtherUsersDetail,
  );
  // console.log('otherUsersData==>', otherUsersData);

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
                title={
                  otherUsersData[chat?.otherId]?.displayName ??
                  'User Name Not Available'
                }
                subtitle={chat?.lastMessage}
                style={styles.cardStyle}
                left={props =>
                  otherUsersData[chat?.otherId]?.picture?.length !== 0 ? (
                    <Image
                      source={{
                        uri: otherUsersData[chat?.otherId]?.picture,
                      }}
                      style={styles.cardImage}
                    />
                  ) : (
                    <Avatar.Icon {...props} icon="account-tie" />
                  )
                }
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
  cardImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    resizeMode: 'contain',
  },
});
