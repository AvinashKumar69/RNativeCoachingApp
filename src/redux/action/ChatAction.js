import firestore, {firebase} from '@react-native-firebase/firestore';
import {getNewMessagesForChat} from '../../queries/chatQuery';

export const CHATRESET = 'CHATRESET';
export const CHAT = 'CHAT';
export const ALLCONSUMERCHATMESSAGES = 'ALLCONSUMERCHATMESSAGES';
export const ALLCONSUMERCHATMESSAGESBULK = 'ALLCONSUMERCHATMESSAGESBULK';
export const CONSUMERCHATSEENUPDATED = 'CONSUMERCHATSEENUPDATED';
export const CONSUMERUPDATEDMESSAGE = 'CONSUMERUPDATEDMESSAGE';

export const allConsumerChatMessages = payload => {
  return {
    type: ALLCONSUMERCHATMESSAGES,
    payload,
  };
};
export const allConsumerChatMessagesBulk = payload => {
  return {
    type: ALLCONSUMERCHATMESSAGESBULK,
    payload,
  };
};

export const chatListAdder = payload => {
  return {
    type: CHAT,
    payload,
  };
};

export const consumerChatSeenUpdated = payload => {
  return {
    type: CONSUMERCHATSEENUPDATED,
    payload,
  };
};

export const chatReset = payload => {
  return {
    type: CHATRESET,
    payload,
  };
};

export const consumerUpdatedMessage = payload => {
  return {
    type: CONSUMERUPDATEDMESSAGE,
    payload,
  };
};

export const singleChatMessages = payload => dispatch => {
  const [chatId, isUserChat, newLastSent, lastSent, ourId] = payload;

  let minLastSent = null;
  if (!!lastSent) {
    if (lastSent?.seconds * 1000 >= newLastSent?.seconds * 1000) {
      minLastSent = newLastSent?.seconds * 1000;
    } else {
      minLastSent = lastSent?.seconds * 1000;
    }
  }

  getNewMessagesForChat(chatId, minLastSent)
    .then(messages => {
      if (!messages.empty) {
        if (minLastSent !== null && messages.docs[0].data().sentBy !== ourId) {
          const messageId = messages.docs[0].id;
          firebase
            .firestore()
            .collection('allChats')
            .doc(chatId)
            .collection('message')
            .doc(messageId)
            .update({
              ...messages.docs[0].data(),
              deliveredTo: firestore.FieldValue.arrayUnion(ourId),
            })
            .catch(error => {
              console.error(`update ${error}`);
            });
        }
        dispatch(allConsumerChatMessagesBulk([chatId, messages.docs]));
      }
    })
    .catch(err => {
      console.error('Error in getting messages', err);
    });
};

export const consumerSendMessage = payload => dispatch => {
  dispatch(allConsumerChatMessages(payload));
};
