import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import ChatListCard from '../../../components/ChatListCard';

const ChatList = () => {
  const navigation = useNavigation();
  const chatData = useSelector(state => state?.allChatDetail?.chatDetail);

  const CHAT_DATA = Object.values(chatData)?.sort(
    (a, b) => b?.lastSent - a?.lastSent,
  );

  const chatListCardClickHandler = chat => {
    navigation.navigate('Chat', {
      name: chat?.docId,
      otherId: chat?.otherId,
      ourId: chat?.ourId,
      docId: chat?.docId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CHAT_DATA}
        renderItem={({item}) => (
          <ChatListCard
            chat={item}
            chatListCardClickHandler={chatListCardClickHandler}
          />
        )}
        keyExtractor={item => String(item.docId)}
      />
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    // marginHorizontal: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fafafa',
  },
});
