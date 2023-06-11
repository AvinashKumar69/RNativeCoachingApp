import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

const ChatListCard = props => {
  const {chat, chatListCardClickHandler} = props;

  const otherUsersData = useSelector(
    state => state?.allChatDetail?.chatListOtherUsersDetail,
  );

  const OTHER_USER_NAME =
    otherUsersData[chat?.otherId]?.displayName ?? 'Unknown User';
  const LAST_MESSAGE = chat?.lastMessage;

  const LeftContent = props => (
    <Image
      source={
        otherUsersData[chat?.otherId]?.picture
          ? {
              uri: otherUsersData[chat?.otherId]?.picture,
            }
          : require('../assets/images/dummyUserPic1.png')
      }
      style={styles.cardImage}
    />
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => chatListCardClickHandler(chat, OTHER_USER_NAME)}>
      <Card.Title
        title={OTHER_USER_NAME}
        subtitle={LAST_MESSAGE}
        //
        titleNumberOfLines={1}
        subtitleNumberOfLines={1}
        //
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
        //
        left={LeftContent}
      />
      <Divider />
    </TouchableOpacity>
  );
};

export default ChatListCard;

const styles = StyleSheet.create({
  cardImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderWidth: 1,
    resizeMode: 'contain',
  },
  cardTitle: {
    color: '#000',
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#000',
    fontWeight: '500',
  },
});
