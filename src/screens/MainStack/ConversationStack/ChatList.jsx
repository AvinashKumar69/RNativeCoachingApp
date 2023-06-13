import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';

import ChatListCard from '../../../components/ChatListCard';

const ChatList = () => {
  const navigation = useNavigation();
  const chatData = useSelector(state => state?.allChatDetail?.chatDetail);

  const CHAT_DATA = Object.values(chatData)?.sort(
    (a, b) => b?.lastSent - a?.lastSent,
  );

  const chatListCardClickHandler = (chat, OTHER_USER_NAME) => {
    navigation.navigate('Chat', {
      name: OTHER_USER_NAME,
      otherId: chat?.otherId,
      ourId: chat?.ourId,
      docId: chat?.docId,
    });
  };

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyComponentContainer}>
        <Avatar.Icon size={50} icon="account-multiple" />
        <Text style={styles.emptyComponentText}>Your chat list is empty.</Text>
      </View>
    );
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
        ListEmptyComponent={<EmptyComponent />}
      />
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fafafa',
  },
  divider: {
    height: 2,
    backgroundColor: '#273a94',
  },
  emptyComponentContainer: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    marginVertical: '20%',
  },
  emptyComponentText: {
    color: '#000',
    fontSize: 18,
    paddingVertical: '5%',
  },
});
