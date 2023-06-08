import {firebase} from '@react-native-firebase/firestore';

export const chatListener = (ourId, handler, isUserChat) => {
  return firebase
    .firestore()
    .collection('allChats')
    .where('parties', 'array-contains', ourId)
    .onSnapshot(querySnap => {
      if (!!querySnap) handler(ourId, querySnap.docChanges(), isUserChat);
    });
};

export const getNewMessagesForChat = (chatId, minLastSent) => {
  if (minLastSent === null) {
    return firebase
      .firestore()
      .collection('allChats')
      .doc(chatId)
      .collection('message')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get();
  }
  return firebase
    .firestore()
    .collection('allChats')
    .doc(chatId)
    .collection('message')
    .where('createdAt', '>=', new Date(minLastSent))
    .get();
};
